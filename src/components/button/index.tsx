import React, { Children } from 'react'
import { Button as ChackraButton } from '@chakra-ui/core'

interface ButtonProps {
  unFocus?: boolean
  onClick(): void
  width?: string
  marginTop?: number
  isLoading?: boolean
}

const Button: React.FC<ButtonProps> = ({ unFocus, children, ...rest }) => {
  return (
    <ChackraButton
      backgroundColor={unFocus ? 'gray.400' : 'red.900'}
      color="white"
      fontWeight="500"
      _hover={{ color: 'white', backgroundColor: 'red.800' }}
      _active={{ color: 'white', backgroundColor: 'red.500' }}
      {...rest}
    >
      {children}
    </ChackraButton>
  )
}

export default Button
