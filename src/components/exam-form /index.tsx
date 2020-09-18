import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useToast } from '@chakra-ui/core'
import { useHistory } from 'react-router'

import { Flex, Button as ChakraButton, Textarea } from '@chakra-ui/core'

import FormControl from '../form-control'
import Popup from '../popup'
import Input from '../input'
import Button from '../button'

import * as request from '../../services/requests'

export interface IExamInput {
  name: string
  preparation: string[]
  observation?: string
  active?: boolean
}

const ExamForm: React.FC = ({ isOpen, onClose, toClose }) => {
  const history = useHistory()

  const { register, handleSubmit, errors } = useForm<IExamInput>()
  const toast = useToast()

  const onSubmit = React.useCallback(
    ({ name, observation }: IExamInput) => {
      request.exam
        .post(name, [], observation)
        .then(response => {
          toast({
            title: 'Sucesso',
            description: 'Exame criado',
            status: 'success',
            duration: 3000,
            isClosable: true
          })

          history.push(`/exames/${response.data._id}`)
        })
        .catch(({ response }) => {
          let description: string = 'Algo deu errado'

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
    <Popup title={'Criar Exame'}>
      <Flex>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex flexDir="column">
            <FormControl
              type="name"
              label="Nome*"
              mr={4}
              isInvalid={errors.name}
            >
              <Input
                placeholder="Nome do exame"
                type="name"
                name="name"
                width={600}
                id="name"
                aria-describedby="name-helper-text"
                inputRef={register({ required: 'Campo necessario' })}
              />
            </FormControl>
            <FormControl
              label="Observação"
              mr={4}
              isInvalid={errors.name}
              width="100%"
            >
              <Textarea
                placeholder="Observações do exame"
                name="observation"
                id="observation"
                width="100%"
                ref={register}
                backgroundColor="gray.100"
                height="120px"
              />
            </FormControl>

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
              <Button type="submit">{'Salvar'}</Button>
            </Flex>
          </Flex>
        </form>
      </Flex>
    </Popup>
  )
}

export default ExamForm
