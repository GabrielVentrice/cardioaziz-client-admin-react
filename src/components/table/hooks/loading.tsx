import React from 'react'
import { Skeleton } from '@chakra-ui/core'

import { Table as CustomTable, Tr, Th, Tbody, Thead, Td } from '../styles'

const LoadingTable: React.FC = () => {
  const columns = [1, 2, 3, 4]

  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

  return (
    <CustomTable>
      <Thead>
        <Tr>
          {columns.map(column => {
            return (
              <Th>
                <Skeleton height="20px" my="10px" width="96px" />
              </Th>
            )
          })}
        </Tr>
      </Thead>

      <Tbody>
        {data.map(() => {
          return (
            <Tr>
              {columns.map(cell => {
                return (
                  <Td>
                    <Skeleton height="20px" my="10px" width="128px" />
                  </Td>
                )
              })}
            </Tr>
          )
        })}
      </Tbody>
    </CustomTable>
  )
}
export default LoadingTable
