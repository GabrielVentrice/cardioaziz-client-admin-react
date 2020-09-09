import React from 'react'
import { useForm } from 'react-hook-form'
import { useToast } from '@chakra-ui/core'
import moment from 'moment'

import { Flex, Button as ChakraButton } from '@chakra-ui/core'

import FormControl from '../form-control'
import Popup from '../popup'
import Input from '../input'
import Button from '../button'

import * as requests from '../../services/requests'

export interface IPatientInput {
  name: string
  email: string
  birthday: string
  cpf: string
  rg: string
  tel: string
}

const PatientForm: React.FC = ({ isOpen, onClose, toClose, patient }) => {
  const preValued = patient
    ? {
        defaultValues: {
          name: patient.nome,
          email: patient.email,
          birthday: moment(patient.nascimento).format('DD/MM/YYYY'),
          cpf: patient.cpf,
          rg: patient.rg,
          tel: patient.tel
        }
      }
    : {}

  const { register, handleSubmit, errors } = useForm<IPatientInput>(preValued)
  const toast = useToast()

  const onSubmit = React.useCallback(
    (formData: IPatientInput) => {
      requests.patient
        .post(formData)

        .then(response => {
          console.log('Resposta', response)

          toast({
            title: 'Sucesso',
            description: 'Paciente criado',
            status: 'success',
            duration: 3000,
            isClosable: true
          })
        })
        .catch(({ response }) => {
          let description: string = 'Algo deu errado'

          if (response.status === 409) {
            description = 'Email já cadastrado'
          }

          toast({
            title: 'Erro',
            description,
            status: 'error',
            duration: 3000,
            isClosable: true
          })
        })
    },
    [toast]
  )

  const onEditSubmit = React.useCallback(
    (formData: IPatientInput) => {
      requests.patient
        .put(formData, patient._id)
        .then(response => {
          console.log('Resposta', response)

          toast({
            title: 'Sucesso',
            description: 'Paciente atualizado',
            status: 'success',
            duration: 3000,
            isClosable: true
          })
        })
        .catch(({ response }) => {
          let description: string = 'Algo deu errado'
          console.log(response)
          if (response.status === 409) {
            description = 'Email já cadastrado'
          }

          toast({
            title: 'Erro',
            description,
            status: 'error',
            duration: 3000,
            isClosable: true
          })
        })
    },
    [toast]
  )

  return (
    <Popup title={patient ? 'Editar Paciente' : 'Criar paciente'}>
      <Flex>
        <form onSubmit={handleSubmit(patient ? onEditSubmit : onSubmit)}>
          <Flex flexDir="column">
            <Flex>
              <FormControl
                type="name"
                label="Nome*"
                mr={4}
                isInvalid={errors.name}
              >
                <Input
                  placeholder="Nome e sobrenome"
                  type="name"
                  name="name"
                  width={600}
                  id="name"
                  aria-describedby="name-helper-text"
                  inputRef={register({ required: 'Campo necessario' })}
                />
              </FormControl>

              <FormControl
                type="birthday"
                label="Nascimento*"
                isInvalid={errors.birthday}
              >
                <Input
                  placeholder="dd/mm/yyyy"
                  name="birthday"
                  type="birthday"
                  id="birthday"
                  width={200}
                  aria-describedby="birthday-helper-text"
                  inputRef={register({ required: 'Campo necessario' })}
                />
              </FormControl>
            </Flex>

            <Flex>
              <FormControl
                type="email"
                label="Email*"
                mr={4}
                isInvalid={errors.email}
              >
                <Input
                  placeholder="nome@email.com"
                  name="email"
                  type="email"
                  width={600}
                  id="email"
                  aria-describedby="email-helper-text"
                  inputRef={register({ required: 'Campo necessario' })}
                />
              </FormControl>

              <FormControl type="tel" label="Telefone" isInvalid={errors.tel}>
                <Input
                  name="tel"
                  placeholder="(xx) xxxxx-xxxx"
                  type="tel"
                  id="tel"
                  width={200}
                  aria-describedby="tel-helper-text"
                  inputRef={register}
                />
              </FormControl>
            </Flex>

            <Flex>
              <FormControl type="cpf" label="CPF" mr={4} isInvalid={errors.cpf}>
                <Input
                  placeholder="xxx.xxx.xxx-xx"
                  name="cpf"
                  type="cpf"
                  id="cpf"
                  aria-describedby="cpf-helper-text"
                  inputRef={register}
                />
              </FormControl>

              <FormControl type="rg" label="RG" isInvalid={errors.rg}>
                <Input
                  placeholder="xxx.xxx.xxx-x"
                  name="rg"
                  type="rg"
                  id="rg"
                  aria-describedby="rg-helper-text"
                  inputRef={register}
                />
              </FormControl>
            </Flex>
            <Flex justifyContent="space-between" mt={6}>
              <ChakraButton
                onClick={toClose}
                padding={0}
                background="none"
                color="gray.500"
                fontWeight={400}
              >
                Cancelar
              </ChakraButton>
              <Button type="submit">{patient ? 'Atualizar' : 'Salvar'}</Button>
            </Flex>
          </Flex>
        </form>
      </Flex>
    </Popup>
  )
}

export default PatientForm
