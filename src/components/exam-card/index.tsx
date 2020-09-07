import React from 'react'
import moment from 'moment'

import { Flex, Text, Image, Box, useToast, Button } from '@chakra-ui/core'

import PDF from '../../assets/pdf.svg'

import { CustomFlex } from './styles'
import DeleteConfirmation from './hooks/delete-confirmation'

const ExamCard: React.FC = ({ name, date, id, relationId }) => {
  const toast = useToast()

  function openFile() {
    toast({
      description: 'Baixando Exame',
      status: 'info',
      duration: 3000,
      isClosable: true
    })
  }

  function deleteFile() {
    toast({
      description: 'Excluindo Exame',
      status: 'error',
      duration: 3000,
      isClosable: true
    })
  }

  return (
    <CustomFlex
      mb={4}
      background="white"
      p={3}
      borderRadius="md"
      boxShadow="1px 2px 3px rgba(113,128,150,0.16)"
      width={['300px', '300px', '700px', '700px']}
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
    </CustomFlex>
  )
}

export default ExamCard
