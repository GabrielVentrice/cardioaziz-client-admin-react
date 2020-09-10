import React, { useState } from 'react'
import {
  Heading,
  Flex,
  Text,
  FormControl,
  FormErrorMessage,
  FormLabel,
  useToast
} from '@chakra-ui/core'
import { useForm } from 'react-hook-form'

import Input from '../../../components/input'
import Button from '../../../components/button'

import * as request from '../../../services/requests'

const ValidateCode: React.FC = ({ setStepState, setValidationCode }) => {
  const { register, handleSubmit, errors, formState } = useForm()

  const [btnLoading, setBtnLoading] = useState(false)

  const toast = useToast()

  function onSubmit(data) {
    setBtnLoading(true)

    const { code } = data

    request.auth
      .validateCode(code)
      .then(res => {
        toast({ description: `Código válido`, status: 'success' })

        setValidationCode(code)

        setBtnLoading(false)

        setStepState(2)
      })
      .catch(err => {
        toast({ description: 'Código Inválido', status: 'error' })

        setBtnLoading(false)
      })
  }

  return (
    <>
      <Heading as="h4" size="md" marginBottom={8} color="gray.700">
        Validar código
      </Heading>

      <Flex marginBottom={8}>
        <Text fontSize="md" color="gray.500">
          Insira o codigo de validação enviado para seu email para atualizar sua
          senha
        </Text>
      </Flex>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.code} textAlign="left">
          <FormLabel color="gray.700">Código de validação*</FormLabel>

          <Input
            name="code"
            size="lg"
            icon="lock"
            placeholder="Inserir código"
            type="code"
            inputRef={register({ required: 'Campo Necessario' })}
          ></Input>

          <FormErrorMessage>
            {errors.code && errors.code.message}
          </FormErrorMessage>
        </FormControl>

        <Button marginTop={4} isLoading={btnLoading} type="submit" width="100%">
          Validar
        </Button>
      </form>
    </>
  )
}

export default ValidateCode
