import React from 'react'
import {
  Heading,
  Grid,
  Flex,
  Text,
  Image,
  FormControl,
  FormErrorMessage
} from '@chakra-ui/core'
import { useForm } from 'react-hook-form'

import { useAuth } from '../../../hooks/AuthContext'

import Input from '../../../components/input/'
import PasswordInput from '../../../components/password-input/'
import Button from '../../../components/button'

import Logo from '../../../assets/logo.png'

import { role } from '../../../utils/constants'

interface Inputs {
  email: string
  password: string
}

const AdminLogin: React.FC = () => {
  const { register, handleSubmit, errors, formState } = useForm<Inputs>()

  const [loading, setLoading] = React.useState(false)

  const onSubmit = (data: Inputs) => {
    signIn(data, role.ADMIN, setLoading)
  }

  const { signIn } = useAuth()

  return (
    <Grid
      as="main"
      height="100vh"
      templateColumns="1fr 464px 1fr"
      templateRows="1fr 1fr 1fr"
      templateAreas="
      '. logo .'
      '. form .'
      '. . .'
      "
      justifyContent="center"
      alignItems="center"
      backgroundColor="gray.200"
    >
      <Flex
        gridArea="logo"
        alignItems="flex-end"
        justifyContent="center"
        height="100%"
      >
        <Image src={Logo} marginBottom={8} width="300px"></Image>
      </Flex>

      <Flex justifyContent="center" gridArea="form">
        <Flex
          width={['75%', '75%', '75%', '100%']}
          backgroundColor="white"
          borderRadius="lg"
          height="100%"
          flexDir="column"
          alignItems="stretch"
          paddingX={12}
          paddingY={8}
          boxShadow="1px 2px 6px rgba(113, 128, 150, 0.16);"
          textAlign="center"
        >
          <Heading as="h4" size="md" marginBottom={12} color="gray.700">
            Acesso administração
          </Heading>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.email}>
              <Input
                name="email"
                size="lg"
                icon="mail"
                placeholder="Inserir login"
                type="text"
                inputRef={register({ required: true })}
              ></Input>

              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
              <PasswordInput
                name="password"
                inputRef={register({ required: true })}
              ></PasswordInput>

              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <Button
              marginTop={4}
              isLoading={loading}
              type="submit"
              width="100%"
            >
              Acessar
            </Button>
          </form>
        </Flex>
      </Flex>
    </Grid>
  )
}

export default AdminLogin
