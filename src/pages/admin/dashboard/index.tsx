import React, { useState } from 'react'
import { Heading, Flex, Button, Icon } from '@chakra-ui/core'

import DashboardStructure from '../../../components/dashboard-structure'
import PatientTable from '../../../components/patient-table'
import Input from '../../../components/input'
import PatientForm from '../../../components/patient-form'

const Dashboard: React.FC = () => {
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
          <Heading size="lg">Pacientes</Heading>
        </Flex>

        <Flex
          gridArea="option"
          paddingY={4}
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Input
            size="md"
            icon="search"
            placeholder="Pesquisar paciente..."
            type="search"
            onChange={event => {
              const { value } = event.target

              setSearchText(value)
            }}
          ></Input>
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
            <Icon name="userPlus" color="gray.500" mr={2} size={5}></Icon>{' '}
            Adicionar paciente
          </Button>
        </Flex>

        <Flex width="100%" height="100%">
          <PatientTable searchText={searchText}></PatientTable>
        </Flex>
      </Flex>
      {createIsOpen && (
        <PatientForm toClose={() => setCreateIsOpen(false)}></PatientForm>
      )}
    </DashboardStructure>
  )
}

export default Dashboard
