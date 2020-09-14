import React from 'react'
import { Icon, Button } from '@chakra-ui/core'

import Input from '../input'

interface PasswordProps {
  name?: string
  inputRef?: any
}

const PasswordInput: React.FC<PasswordProps> = ({ inputRef, ...rest }) => {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <Input
      {...rest}
      size="lg"
      icon="lock"
      type={show ? 'text' : 'password'}
      placeholder="Inserir senha"
      rightElement={
        <Button
          h="95%"
          size="sm"
          onClick={handleClick}
          background="none"
          color="gray.600"
          _hover={{ background: 'none', color: 'red.800' }}
        >
          {show ? <Icon name="eye-off"></Icon> : <Icon name="eye"></Icon>}
        </Button>
      }
      inputRef={inputRef}
    />
  )
}

export default PasswordInput
