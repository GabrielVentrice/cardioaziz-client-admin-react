import React, { useLayoutEffect, useState } from 'react'
import Table from '../table'
import api from '../../services/api'
import moment from 'moment'
import { useHistory } from 'react-router-dom'

const PatientTable: React.FC = () => {
  const [rows, setRows] = useState([])

  const columns = React.useMemo(
    () => [
      {
        Header: 'Nome',
        accessor: 'col1'
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

    docs.forEach(patient => {
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

  const history = useHistory()

  function trClick() {
    history.push('/paciente')
  }

  return <Table trClick={() => trClick} data={rows} columns={columns}></Table>
}

export default PatientTable
