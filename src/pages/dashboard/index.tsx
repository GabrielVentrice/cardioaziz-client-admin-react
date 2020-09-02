import React from 'react'
import { Heading, Flex } from '@chakra-ui/core'

import DashboardStructure from '../../components/dashboard-structure'
import PatientTable from '../../components/patient-table'
import Button from '../../components/button'
import Input from '../../components/input'
import Table from '../../components/table'

import api from '../../services/api'

const Dashboard: React.FC = () => {
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
          ></Input>
          <Button>Adicionar paciente</Button>
        </Flex>

        <Flex width="100%" height="100%">
          <PatientTable></PatientTable>
        </Flex>
      </Flex>
    </DashboardStructure>
  )
}

export default Dashboard
