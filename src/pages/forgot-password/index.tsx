import React, { useState } from 'react'

import { Grid, Flex, Image } from '@chakra-ui/core'

import Logo from '../../assets/logo.png'

import SendEmail from './hooks/send-email'
import UpdatePassword from './hooks/update-password'
import ValidateCode from './hooks/validate-code'

const ForgotPassword: React.FC = () => {
  const [stepState, setStepState] = useState(0)

  const [validationCode, setValidationCode] = useState(null)

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
          boxShadow="0px 2px 3px rgba(0,0,0,0.14)"
          textAlign="center"
        >
          {stepState === 0 && <SendEmail setStepState={setStepState} />}

          {stepState === 1 && (
            <ValidateCode
              setStepState={setStepState}
              setValidationCode={setValidationCode}
            />
          )}

          {stepState === 2 && (
            <UpdatePassword validationCode={validationCode} />
          )}
        </Flex>
      </Flex>
    </Grid>
  )
}

export default ForgotPassword
