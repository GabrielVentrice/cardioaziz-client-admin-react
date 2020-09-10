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
import { useHistory } from 'react-router-dom'

import PasswordInput from '../../../components/password-input'
import Button from '../../../components/button'

import * as request from '../../../services/requests'

const UpdatePassword: React.FC = ({ validationCode }) => {
  const { register, handleSubmit, errors, watch } = useForm()

  const [btnLoading, setBtnLoading] = useState(false)

  const toast = useToast()
  const history = useHistory()

  function onSubmit(data) {
    setBtnLoading(true)

    const { password } = data

    request.auth
      .updatePass(password, validationCode)
      .then(res => {
        toast({ description: `Senha atualizada`, status: 'success' })

        setBtnLoading(false)

        history.push('/login')
      })
      .catch(err => {
        toast({ description: 'Erro ao atualizar senha', status: 'error' })

        setBtnLoading(false)
      })
  }

  return (
    <>
      <Heading as="h4" size="md" marginBottom={8} color="gray.700">
        Atualizar senha
      </Heading>

      <Flex marginBottom={8}>
        <Text fontSize="md" color="gray.500">
          Insira sua nova senha para acessar a plataforma de Exames
        </Text>
      </Flex>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.password} textAlign="left">
          <FormLabel color="gray.700">Senha*</FormLabel>

          <PasswordInput
            name="password"
            inputRef={register({
              required: true,
              minLength: {
                value: 6,
                message: 'Senha precisa ter no mínimo 6 caracteres'
              }
            })}
          ></PasswordInput>

          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={!!errors.passwordConfirm}
          textAlign="left"
          mt={6}
        >
          <FormLabel color="gray.700">Confirmar senha*</FormLabel>

          <PasswordInput
            name="passwordConfirm"
            inputRef={register({
              required: true,
              validate: value =>
                value === watch('password') || 'As senhas não coincidem '
            })}
          ></PasswordInput>

          <FormErrorMessage>
            {errors.passwordConfirm && errors.passwordConfirm.message}
          </FormErrorMessage>
        </FormControl>

        <Button marginTop={4} isLoading={btnLoading} type="submit" width="100%">
          Atualizar senha
        </Button>
      </form>
    </>
  )
}

export default UpdatePassword
