import React, { useLayoutEffect, useState, useCallback } from 'react'

import { Header } from './styles'
import { Flex, Skeleton } from '@chakra-ui/core'

import * as requests from '../../../../services/requests'
import ExamCard from '../../../../components/exam-card'

import { UploadingExams } from './upload'

const Exam: React.FC = ({ patientId }) => {
  const [exams, setExams] = useState([])

  const getExams = useCallback(() => {
    requests.examResults
      .getId(patientId)
      .then(res => {
        console.log('Exames ==> ', res.data)
        setExams(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [patientId])

  useLayoutEffect(() => {
    getExams()
  }, [getExams])

  const reloadExams = useCallback(() => {
    getExams()
  }, [getExams])

  return (
    <Flex flexDir="column">
      <Header as="h2">Exames</Header>

      <Flex flexDir="column" width={['300px', '300px', '700px', '700px']}>
        <UploadingExams patientId={patientId}></UploadingExams>

        <Flex flexDir="column" mt={4}>
          {!!exams.length ? (
            exams.map(({ _id, exam_id }) => {
              const { nome_original, data_cad } = exam_id

              return (
                <ExamCard
                  name={nome_original}
                  date={data_cad}
                  id={exam_id._id}
                  reloadFunction={reloadExams}
                  relationId={_id}
                ></ExamCard>
              )
            })
          ) : (
            <>
              <Skeleton height="72px" mb={4}></Skeleton>
              <Skeleton height="72px" mb={4}></Skeleton>
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Exam
