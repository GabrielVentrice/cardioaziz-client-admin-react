import React, { HTMLProps } from 'react'
import { IInput } from '@chakra-ui/core/dist/Input'
import {
  InputGroup,
  InputLeftElement,
  Input as ChakraInput,
  Icon,
  InputRightElement
} from '@chakra-ui/core'

interface InputProps {
  name?: string
  icon?: string
  placeholder: string
  type: string
  size: IInput['size']
  rightElement?: HTMLProps<HTMLButtonElement>
  inputRef?: any
}

const Input: React.FC<InputProps> = ({
  icon,
  placeholder,
  type,
  rightElement,
  size,
  inputRef,
  ...rest
}) => {
  const [iconColor, setIconColor] = React.useState('gray.400')

  return (
    <InputGroup marginY={2} size={size}>
      {icon && (
        <InputLeftElement children={<Icon name={icon} color={iconColor} />} />
      )}

      <ChakraInput
        {...rest}
        type={type}
        placeholder={placeholder}
        backgroundColor="white"
        _placeholder={{ color: 'gray.500', fontSize: 'md' }}
        focusBorderColor="red.900"
        onFocus={() => setIconColor('red.900')}
        onBlur={() => setIconColor('gray.400')}
        _hover={{ borderColor: 'gray.400' }}
        ref={inputRef}
      />

      {rightElement && <InputRightElement>{rightElement}</InputRightElement>}
    </InputGroup>
  )
}

export default Input
