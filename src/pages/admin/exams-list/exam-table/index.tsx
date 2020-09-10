import React, { useLayoutEffect, useState, useCallback } from 'react'
import Table from '../../../../components/table'
import moment from 'moment'
import { useHistory } from 'react-router-dom'

import { Flex } from './styles'

import * as requests from '../../../../services/requests'
import { Icon } from '@chakra-ui/core'

const ExamTable: React.FC = ({ searchText }) => {
  const [rows, setRows] = useState([])

  const history = useHistory()

  const [isLoading, setIsLoading] = useState(false)

  const columns = React.useMemo(() => ['Nome', 'Data de criação', 'Ativo'], [])

  function dataToColumns(docs) {
    let rows = []

    docs.forEach(exam => {
      rows = [
        ...rows,
        {
          id: exam._id,
          info: [
            exam.nome.toLowerCase(),
            moment(exam.data_cad).format('DD/MM/YYYY'),
            exam.ativado ? (
              <Icon name="check" color="green.400"></Icon>
            ) : (
              <Icon name="close" color="red.400"></Icon>
            )
          ]
        }
      ]
    })

    setRows(rows)
    setIsLoading(false)
  }

  const getExams = useCallback(() => {
    requests.exam
      .get()
      .then(response => {
        console.log('Exam ', response.data)

        dataToColumns(response.data)
      })
      .catch(err => {
        console.log('Exam ', err)
      })
  }, [])

  useLayoutEffect(() => {
    getExams()
  }, [getExams])

  return (
    <Flex flexDir="column" width="100%">
      <Table
        data={rows}
        columns={columns}
        redirectLink={'/exame'}
        isLoading={isLoading}
      ></Table>
    </Flex>
  )
}

export default ExamTable
