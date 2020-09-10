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

const SendEmail: React.FC = ({ setStepState }) => {
  const { register, handleSubmit, errors, formState } = useForm()

  const [btnLoading, setBtnLoading] = useState(false)

  const toast = useToast()

  function onSubmit(data) {
    setBtnLoading(true)

    const { email } = data

    request.auth
      .resetPass(email)
      .then(res => {
        toast({ description: `Email enviado para ${email}`, status: 'success' })
        setBtnLoading(false)
        setStepState(1)
      })
      .catch(err => {
        toast({ description: 'Email nao encontrado', status: 'error' })
        setBtnLoading(false)
      })
  }

  return (
    <>
      <Heading as="h4" size="md" marginBottom={8} color="gray.700">
        Esqueci minha senha
      </Heading>

      <Flex marginBottom={8}>
        <Text fontSize="md" color="gray.500">
          Insira seu usuario abaixo e clique em mudar senha. Um email será
          enviado para você com as intruções para completar o processo.
        </Text>
      </Flex>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.email} textAlign="left">
          <FormLabel color="gray.700">Email*</FormLabel>

          <Input
            name="email"
            size="lg"
            icon="email"
            placeholder="Inserir Email"
            type="email"
            inputRef={register({ required: 'Campo Necessario' })}
          ></Input>

          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>

        <Button marginTop={4} isLoading={btnLoading} type="submit" width="100%">
          Enviar email
        </Button>
      </form>
    </>
  )
}

export default SendEmail
