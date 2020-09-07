import React from 'react'
import { useHistory } from 'react-router-dom'

import { Table as CustomTable, Tr, Th, Tbody, Thead, Td } from './styles'

const Table: React.FC = ({ data, columns, isLoading, redirectLink }) => {
  const history = useHistory()

  function redirectRow(id: string) {
    history.push(`${redirectLink}/${id}`)
  }

  return (
    <CustomTable isLoading={isLoading}>
      <Thead>
        <Tr>
          {columns.map(column => {
            return <Th>{column}</Th>
          })}
        </Tr>
      </Thead>

      <Tbody>
        {data.map(({ id, info }) => {
          return (
            <Tr onClick={() => redirectRow(id)}>
              {info.map(cell => {
                return <Td>{cell}</Td>
              })}
            </Tr>
          )
        })}
      </Tbody>
    </CustomTable>
  )
}

export default Table
