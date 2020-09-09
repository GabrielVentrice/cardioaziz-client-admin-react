import React, { useState } from 'react'
import {
  Flex,
  Avatar,
  Heading,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Button,
  Divider,
  useToast,
  PopoverFooter,
  ButtonGroup
} from '@chakra-ui/core'
import moment from 'moment'

import { NameShortener } from '../../../../utils/format'

import { Label, Text, Header } from './styles'

import PatientForm from '../../../../components/patient-form'

const Profile: React.FC = ({ patient }) => {
  const toast = useToast()
  const [editisOpen, setEditisOpen] = useState(false)

  function onClickRemove() {}

  return (
    <>
      <Flex flexDirection="column" width={['200px', '200px', '280px', '280px']}>
        <Header>Perfil</Header>

        <Flex flexDirection="column" alignItems="center" mb={4}>
          <Flex width="100%" justifyContent="flex-start">
            <Popover>
              <PopoverTrigger>
                <Flex cursor="pointer">
                  <Icon fontSize="xl" name="more" color="gray.700"></Icon>
                </Flex>
              </PopoverTrigger>

              <PopoverContent zIndex={4} width="120px">
                <PopoverArrow />

                <PopoverBody padding={0}>
                  <Flex flexDir="column">
                    <Button
                      background="none"
                      fontSize="sm"
                      fontWeight="400"
                      onClick={() => setEditisOpen(true)}
                    >
                      Editar
                    </Button>

                    <Divider></Divider>

                    <Popover placement="right">
                      <PopoverTrigger>
                        <Button
                          background="none"
                          fontSize="sm"
                          fontWeight="400"
                          _hover={{ background: '#d63031', color: 'white' }}
                        >
                          Remover
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent zIndex={4}>
                        <PopoverArrow />
                        <PopoverBody>Remover Paciente</PopoverBody>
                        <PopoverFooter d="flex" justifyContent="flex-end">
                          <ButtonGroup size="sm">
                            <Button
                              variantColor="red"
                              onClick={() => {
                                onClickRemove()
                              }}
                            >
                              confirmar
                            </Button>
                          </ButtonGroup>
                        </PopoverFooter>
                      </PopoverContent>
                    </Popover>
                  </Flex>
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Flex>

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
      {editisOpen && (
        <PatientForm
          toClose={() => setEditisOpen(false)}
          patient={patient}
        ></PatientForm>
      )}
    </>
  )
}

export default Profile
