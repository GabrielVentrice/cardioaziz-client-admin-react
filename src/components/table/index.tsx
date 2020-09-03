import React from 'react'
import { useTable } from 'react-table'

import { Table as CustomTable, Tr, Th, Tbody, Thead, Td, Link } from './styles'

interface IColumn {
  Header: string
  accessor: string
}

const Table: React.FC = ({ data, columns, isLoading, trClick }) => {
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

      <Tbody {...getTableBodyProps()} className={`${isLoading && 'fade-out'}`}>
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
