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
  id: string
}

const Input: React.FC<InputProps> = ({
  icon,
  placeholder,
  type,
  rightElement,
  size,
  inputRef,
  id,
  width,
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
        _placeholder={{ color: 'gray.400', fontSize: 'md' }}
        focusBorderColor="red.900"
        onFocus={() => setIconColor('red.900')}
        onBlur={() => setIconColor('gray.400')}
        _hover={{ borderColor: 'gray.400' }}
        ref={inputRef}
        width={width ? width : ['200px', '200px', '400px', '400px']}
      />

      {rightElement && <InputRightElement>{rightElement}</InputRightElement>}
    </InputGroup>
  )
}

export default Input
