import React from 'react'
import { useForm } from 'react-hook-form'

import {
  Heading,
  Grid,
  Flex,
  ButtonGroup,
  Text,
  Image,
  FormControl,
  FormErrorMessage,
  Link
} from '@chakra-ui/core'

import { useAuth } from '../../hooks/AuthContext'

import Input from '../../components/input/'
import PasswordInput from '../../components/password-input/'
import Button from '../../components/button'

import Logo from '../../assets/logo.png'
import { role } from '../../utils/constants'
import { useSortBy } from 'react-table'

interface Inputs {
  email: string
  password: string
}

const Login: React.FC = () => {
  const { register, handleSubmit, errors, formState } = useForm<Inputs>()

  const [loginOption, setLoginOption] = React.useState('patient')

  const [loading, setLoading] = React.useState(false)

  const onSubmit = (data: Inputs) => {
    signIn(data, role.PATIENT, setLoading)
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
            Plataforma de exames
          </Heading>

          <Flex>
            <Heading
              as="h6"
              size="xs"
              marginBottom={2}
              color="gray.400"
              fontWeight="500"
            >
              Acessar como
            </Heading>
          </Flex>

          <ButtonGroup spacing={4} marginBottom={16} display="flex">
            <Button
              unFocus={loginOption === 'doctor'}
              onClick={() => setLoginOption('patient')}
              width="50%"
            >
              Paciente
            </Button>

            <Button
              unFocus={loginOption === 'patient'}
              onClick={() => setLoginOption('doctor')}
              width="50%"
            >
              Médico
            </Button>
          </ButtonGroup>

          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.email}>
              <Input
                name="email"
                size="lg"
                icon="mail"
                placeholder="Inserir Email"
                type="email"
                inputRef={register({ required: 'Campo necessário' })}
              ></Input>

              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
              <PasswordInput
                name="password"
                inputRef={register({ required: 'Campo necessário' })}
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

          <Link
            marginTop={8}
            fontSize="sm"
            color="gray.400"
            href="/esqueci-senha"
          >
            Esqueci minha senha
          </Link>
        </Flex>
      </Flex>
    </Grid>
  )
}

export default Login
