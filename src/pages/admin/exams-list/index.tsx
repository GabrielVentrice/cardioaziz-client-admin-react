import React, { useState } from 'react'
import { Heading, Flex, Button, Icon } from '@chakra-ui/core'

import DashboardStructure from '../../../components/dashboard-structure'
import ExamTable from './exam-table'
import ExamForm from '../../../components/exam-form '

const Exams: React.FC = () => {
  const [createIsOpen, setCreateIsOpen] = useState(false)
  const [searchText, setSearchText] = useState('')

  return (
    <DashboardStructure>
      <Flex
        direction="column"
        paddingX={['24px', '24px', '48px', '72px']}
        paddingY="24px"
        height="100%"
        width="100%"
      >
        <Flex gridArea="header">
          <Heading size="lg">Exames</Heading>
        </Flex>

        <Flex
          gridArea="option"
          paddingY={4}
          alignItems="center"
          justifyContent="flex-end"
          width="100%"
        >
          {/* <Input
            size="md"
            icon="search"
            placeholder="Pesquisar exame..."
            type="search"
            onChange={event => {
              const { value } = event.target

              setSearchText(value)
            }}
          ></Input> */}
          <Button
            onClick={() => setCreateIsOpen(true)}
            boxShadow="4px 4px 8px rgba(5,7,10,0.09), -4px -4px 8px rgba(255,255,255,0.5)"
            background="#E2E8F0"
            fontSize="md"
            color="gray.500"
            fontWeight={500}
            _hover={{
              color: 'gray.600'
            }}
            _active={{
              boxShadow:
                'inset 2px 2px 4px rgba(5,7,10,0.2), -2px -2px 4px rgba(255,255,255,0.4)',
              background: '#c8d3e3',
              color: 'white',
              border: 'none'
            }}
          >
            <Icon name="file-plus" color="gray.500" mr={2} size={5}></Icon>{' '}
            Adicionar Exame
          </Button>
        </Flex>

        <Flex width="100%" height="100%">
          <ExamTable></ExamTable>
        </Flex>
      </Flex>
      {createIsOpen && (
        <ExamForm toClose={() => setCreateIsOpen(false)}></ExamForm>
      )}
    </DashboardStructure>
  )
}

export default Exams
