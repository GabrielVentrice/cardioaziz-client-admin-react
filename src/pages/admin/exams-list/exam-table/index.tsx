import React, { useLayoutEffect, useState, useCallback } from 'react'
import Table from '../../../../components/table'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import ReactPaginate from 'react-paginate'

import * as requests from '../../../../services/requests'

import { Flex } from './styles'

import { Icon, Flex as ChakraFlex } from '@chakra-ui/core'

const ExamTable: React.FC = ({ searchText }) => {
  const [rows, setRows] = useState([])

  const [pagination, setPagination] = useState({
    total: 0,
    limit: 0,
    page: 0,
    pages: 0
  })

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

  const getExams = useCallback((page: number) => {
    requests.exam
      .getPaginate(page)
      .then(response => {
        const { total, limit, page, pages, docs } = response.data

        setPagination({ total, limit, page, pages })

        dataToColumns(docs)
      })
      .catch(({ response }) => {
        console.log('Exam ', response)
      })
  }, [])

  useLayoutEffect(() => {
    getExams(0)
  }, [getExams])

  const paginationClick = ({ selected }) => {
    setIsLoading(true)

    getExams(selected)

    setPagination({ ...pagination, page: selected })
  }

  return (
    <Flex flexDir="column" width="100%">
      <Table
        data={rows}
        columns={columns}
        redirectLink={'/exames'}
        isLoading={isLoading}
      ></Table>

      <ChakraFlex mt={4} justifyContent="flex-end">
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'.'}
          breakClassName={'break-me'}
          pageCount={pagination.pages}
          marginPagesDisplayed={0}
          pageRangeDisplayed={2}
          onPageChange={paginationClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </ChakraFlex>
    </Flex>
  )
}

export default ExamTable
