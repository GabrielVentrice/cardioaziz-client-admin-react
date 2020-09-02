import React, { useLayoutEffect, useState } from 'react'
import Table from '../table'
import api from '../../services/api'
import moment from 'moment'

const PatientTable: React.FC = () => {
  const [rows, setRows] = useState([])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Nome',
        accessor: 'col1' // accessor is the "key" in the data
      },
      {
        Header: 'Idade',
        accessor: 'col2'
      },
      {
        Header: 'Email',
        accessor: 'col3'
      },
      {
        Header: 'CPF',
        accessor: 'col4'
      },
      {
        Header: 'RG',
        accessor: 'col5'
      }
    ],
    []
  )

  function dataToColumns(docs) {
    let rows = []

    docs.map(patient => {
      rows = [
        ...rows,
        {
          col1: patient.nome.toLowerCase(),
          col2: moment().diff(patient.nascimento, 'years'),
          col3: patient.email,
          col4: patient.cpf,
          col5: patient.rg
        }
      ]
    })

    setRows(rows)
  }

  useLayoutEffect(() => {
    api.get('/pacientes').then(response => {
      console.log(response.data.docs)

      dataToColumns(response.data.docs)
    })
  }, [])

  return <Table data={rows} columns={columns}></Table>
}

export default PatientTable
