import React from 'react'
import { useTable, Column, ColumnInterface } from 'react-table'

import Card from '../card'

import { Table as CustomTable, Tr, Th, Tbody, Thead, Td } from './styles'

interface IColumn {
  Header: string
  accessor: string
}

const Table: React.FC = ({ data, columns }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data })

  return (
    <CustomTable {...getTableProps()}>
      <Thead>
        {headerGroups.map(headerGroup => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <Th {...column.getHeaderProps()}>{column.render('Header')}</Th>
            ))}
          </Tr>
        ))}
      </Thead>

      <Tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)

          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
              })}
            </Tr>
          )
        })}
      </Tbody>
    </CustomTable>
  )
}

export default Table
