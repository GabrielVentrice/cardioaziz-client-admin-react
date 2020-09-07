import React from 'react'
import { Flex, Avatar, Heading } from '@chakra-ui/core'
import moment from 'moment'

import { NameShortener } from '../../../../utils/format'

import { Label, Text, Header } from './styles'

const Profile: React.FC = ({ patient }) => {
  return (
    <Flex flexDirection="column" width={['200px', '200px', '280px', '280px']}>
      <Header>Perfil</Header>

      <Flex flexDirection="column" alignItems="center" mb={4}>
        <Avatar size="xl"></Avatar>

        <Heading size="sm" textTransform="capitalize" mt={5} color="gray.700">
          {NameShortener(patient.nome)}
        </Heading>
      </Flex>

      <Flex flexDirection="column">
        {patient.email && (
          <>
            <Label>Email</Label>
            <Text>{patient.email}</Text>
          </>
        )}
        {patient.nascimento && (
          <>
            <Label>Data de nascimento</Label>
            <Text>{moment(patient.nascimento).format('DD/MM/YYYY')}</Text>
          </>
        )}
        {patient.tel && (
          <>
            <Label>Telefone</Label>
            <Text>{patient.tel}</Text>
          </>
        )}
        {patient.rg && (
          <>
            <Label>RG</Label>
            <Text>{patient.rg}</Text>
          </>
        )}
        {patient.cpf && (
          <>
            <Label>CPF</Label>
            <Text>{patient.cpf}</Text>
          </>
        )}
      </Flex>
    </Flex>
  )
}

export default Profile
