import React, { useEffect, useLayoutEffect, useState, useRef } from 'react'
import { useToast, Flex } from '@chakra-ui/core'
import { useSortBy } from 'react-table'
import filesize from 'filesize'
import { uniqueId } from 'lodash'
import moment from 'moment'
import Upload from './dropzone'

import { Icon } from '@chakra-ui/core'

import api from '../../../../services/api'

import PDF from '../../../../assets/pdf.svg'

import {
  FileBox,
  FileInfo,
  FileContainer,
  Card,
  Container,
  Preview
} from './styles'

const FileUpload = ({ uploadFile, patientId, setUploadingFile }) => {
  const toast = useToast()

  useLayoutEffect(() => {
    if (uploadFile.progress === 0) {
      processUpload(uploadFile)
    }
  }, [uploadFile])

  const processUpload = file => {
    const data = new FormData()

    data.append('file', file.file, file.nome_original)

    api
      .post('/pacientes/upload-exame/' + patientId, data, {
        onUploadProgress: e => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total))

          setUploadingFile(file => ({ ...file, progress }))
        }
      })
      .then(response => {
        setUploadingFile(file => ({ ...file, uploaded: true }))

        toast({
          description: 'Upload realizado',
          status: 'success',
          duration: 3000,
          isClosable: true
        })
      })
      .catch(err => {
        setUploadingFile(file => ({ ...file, error: true }))

        toast({
          description: 'Erro em realizar upload',
          status: 'error',
          duration: 3000,
          isClosable: true
        })
      })
  }

  return (
    uploadFile && (
      <FileBox key={uploadFile.id} uploaded={uploadFile.uploaded}>
        <FileInfo>
          <Preview src={PDF} />
          <div>
            <strong>{uploadFile.nome_original}</strong>
            <span>{moment().format('DD/MM/YYYY')}</span>
          </div>
        </FileInfo>

        <div>
          <div className="percentage">
            {!uploadFile.uploaded && !uploadFile.error && (
              <p>{uploadFile.progress}%</p>
            )}
          </div>
          {uploadFile.uploaded && <Icon name="check" color="green.400" />}
          {uploadFile.error && <Icon name="close" color="red.400" />}
        </div>
      </FileBox>
    )
  )
}

export const UploadingExams = ({ hide = false, patientId }) => {
  const queueFiles = useRef([])

  const [uploadingFile, setUploadingFile] = useState(null)

  const [queueFilesState, setQueueFilesState] = useState([])

  const [uploadedFiles, setUploadedFiles] = useState([])

  function handleUpload(files) {
    const uploadedFiles = files.map(file => ({
      file,
      id: uniqueId(),
      nome_original: file.name,
      readableSize: filesize(file.size),
      progress: 0,
      uploaded: false,
      error: false
    }))

    queueFiles.current = [...queueFiles.current, ...uploadedFiles]

    setQueueFilesState(queueFiles.current)

    if (uploadingFile === null) setUploadingFile(queueFiles.current.shift())
  }

  useEffect(() => {
    setQueueFilesState(queueFiles.current)
  }, [queueFiles.current])

  useEffect(() => {
    if (
      uploadingFile &&
      uploadingFile.uploaded &&
      queueFiles.current.length > 0
    ) {
      setUploadedFiles(oldFiles => [...oldFiles, uploadingFile])

      setUploadingFile(queueFiles.current.shift())
    }
  }, [uploadingFile, queueFiles.current])

  return (
    <Card className={hide ? 'hide' : ''}>
      <ul className="list-group list-group-flush">
        <div className="text-center">
          <Flex mb={4}>
            <Upload onUpload={handleUpload} />
          </Flex>

          <div>
            <Container className="col-12 p-0">
              {uploadedFiles.map(item => {
                return (
                  <FileBox key={item.id} uploaded={item.uploaded}>
                    <FileInfo>
                      <Preview src={PDF} />

                      <div>
                        <strong>{item.nome_original}</strong>

                        <span>{moment().format('DD/MM/YYYY')}</span>
                      </div>
                    </FileInfo>
                    <div>
                      <div className="percentage"></div>
                      <Icon name="check" color="green.400" />
                    </div>
                  </FileBox>
                )
              })}

              {uploadingFile && (
                <FileUpload
                  uploadFile={uploadingFile}
                  patientId={patientId}
                  setUploadingFile={setUploadingFile}
                ></FileUpload>
              )}

              {queueFilesState.map(item => {
                return (
                  <FileBox key={item.id} uploaded={item.uploaded}>
                    <FileInfo>
                      <Preview src={PDF} />

                      <div>
                        <strong>{item.nome_original}</strong>

                        <span>{moment().format('DD/MM/YYYY')}</span>
                      </div>
                    </FileInfo>
                  </FileBox>
                )
              })}
            </Container>
          </div>
        </div>
      </ul>
    </Card>
  )
}
