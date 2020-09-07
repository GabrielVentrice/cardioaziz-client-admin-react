import React, { useLayoutEffect, useState, useCallback } from 'react'
import Table from '../table'
import moment from 'moment'
import { useHistory } from 'react-router-dom'
import ReactPaginate from 'react-paginate'

import { Flex } from './styles'

import { Flex as ChakraFlex } from '@chakra-ui/core'

import * as requests from '../../services/requests'

const PatientTable: React.FC = () => {
  const [rows, setRows] = useState([])

  const [pagination, setPagination] = useState({
    total: 0,
    limit: 0,
    page: 0,
    pages: 0
  })

  const [isLoading, setIsLoading] = useState(false)

  const columns = React.useMemo(
    () => ['Nome', 'Idade', 'Email', 'CPF', 'RG'],
    []
  )

  function dataToColumns(docs) {
    let rows = []

    docs.forEach(patient => {
      rows = [
        ...rows,
        {
          id: patient._id,
          info: [
            patient.nome.toLowerCase(),
            moment().diff(patient.nascimento, 'years'),
            patient.email,
            patient.cpf,
            patient.rg
          ]
        }
      ]
    })

    setRows(rows)
    setIsLoading(false)
  }

  const getPatients = useCallback((page: number) => {
    requests.patient
      .get(page)
      .then(response => {
        const { total, limit, page, pages, docs } = response.data

        setPagination({ total, limit, page, pages })

        dataToColumns(docs)
      })
      .catch(err => {})
  }, [])

  useLayoutEffect(() => {
    getPatients(0)
  }, [getPatients])

  const paginationClick = ({ selected }) => {
    setIsLoading(true)

    getPatients(selected)

    setPagination({ ...pagination, page: selected })
  }

  const history = useHistory()

  function trClick() {
    history.push('/paciente')
  }

  return (
    <Flex flexDir="column" width="100%">
      <Table
        trClick={trClick}
        data={rows}
        columns={columns}
        redirectLink={'/paciente'}
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

export default PatientTable
