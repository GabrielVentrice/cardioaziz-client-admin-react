import React, { ReactNode } from 'react'

import { Flex, Heading, Button as ChakraButton } from '@chakra-ui/core'

import { Container } from './styles'

import Button from '../button'

interface IPopup {
  title: string
  children: ReactNode
}

const Popup: React.FC = ({ title, children }: IPopup) => {
  return (
    <Container>
      <Flex justifyContent="center" alignItems="center" height="100%">
        <Flex
          background="white"
          padding={8}
          flexDir="column"
          borderRadius={2}
          boxShadow="2px 4px 6px rgba(0,0,0,0.16)"
        >
          <Heading size="lg" mb={8} color="gray.600" fontWeight={600}>
            {title}
          </Heading>

          {children}

          {/* <Flex justifyContent="space-between" mt={6}>
            <ChakraButton
              padding={0}
              background="none"
              color="gray.500"
              fontWeight={400}
            >
              Cancelar
            </ChakraButton>
            <Button> Salvar</Button>
          </Flex> */}
        </Flex>
      </Flex>
    </Container>
  )
}

export default Popup
