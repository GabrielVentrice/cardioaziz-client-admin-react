import React, { useState } from 'react'
import moment from 'moment'

import {
  Flex,
  Text,
  Image,
  Box,
  useToast,
  Button,
  Spinner
} from '@chakra-ui/core'

import PDF from '../../assets/pdf.svg'

import { CustomFlex } from './styles'
import DeleteConfirmation from './hooks/delete-confirmation'

import * as requests from '../../services/requests'

const ExamCard: React.FC = ({ name, date, id, relationId, reloadFunction }) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  function openFile() {
    setLoading(true)

    toast({
      description: 'Baixando Exame',
      status: 'info',
      duration: 3000,
      isClosable: true
    })

    requests.examResults
      .download(id)
      .then(res => {
        console.log('Exame Resposta => ', res.data)

        const file = new Blob([res.data], { type: 'application/pdf' })

        const fileUrl = URL.createObjectURL(file)

        window.open(fileUrl)

        setLoading(false)
      })
      .catch(err => {
        toast({
          description: 'Erro ao realizar download do exame',
          status: 'error',
          duration: 3000,
          isClosable: true
        })

        setLoading(false)
      })
  }

  function deleteFile() {
    toast({
      description: 'Excluindo Exame',
      status: 'info',
      duration: 3000,
      isClosable: true
    })

    requests.examResults
      .deleteRelation(relationId)
      .then(res => {
        reloadFunction()
      })
      .catch(err => {
        console.log(err)
        toast({
          description: 'Erro ao excluir os exames',
          status: 'error',
          duration: 3000,
          isClosable: true
        })
      })
  }

  return (
    <CustomFlex
      mb={4}
      background="white"
      p={3}
      borderRadius="md"
      boxShadow="1px 2px 3px rgba(113,128,150,0.16)"
      width="100%"
      position="relative"
    >
      <Box pr={4}>
        <Image src={PDF} size="48px" alt="pdf-icon"></Image>
      </Box>

      <Flex width="100%" justifyContent="space-between">
        <Flex flexDir="column" background="red.500" overflowX="hidden">
          <Text color="gray.600" fontSize="md">
            {name}
          </Text>

          <Text color="gray.300" fontSize="sm">
            {moment(date).format('DD/MM/YYYY')}
          </Text>
        </Flex>

        <Flex alignItems="center">
          <Button
            id="crud-button"
            fontSize="sm"
            color="blue.400"
            fontWeight="400"
            variant="ghost"
            onClick={openFile}
            opacity={0}
          >
            ver exame
          </Button>
          <Box>
            <DeleteConfirmation delFunction={deleteFile}></DeleteConfirmation>
          </Box>
        </Flex>
      </Flex>

      {loading && (
        <Flex
          position="absolute"
          top="0"
          left="0"
          justifyContent="center"
          alignItems="center"
          height="100%"
          width="100%"
          background="rgba(255,255,255, 0.5)"
        >
          <Spinner
            color="red.800"
            size="lg"
            speed="0.7s"
            thickness="3px"
            emptyColor="gray.200"
          />
        </Flex>
      )}
    </CustomFlex>
  )
}

export default ExamCard
