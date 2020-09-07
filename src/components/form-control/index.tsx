import React, { ReactNode } from 'react'

import {
  FormControl as ChakraFormControl,
  FormLabel,
  FormHelperText
} from '@chakra-ui/core'
import { FieldError } from 'react-hook-form'

interface IFormControlProps {
  label: string
  isInvalid: FieldError
  type: string
  mr?: number
  children: ReactNode
}

const FormControl = ({
  label,
  children,
  isInvalid,
  type,
  mr
}: IFormControlProps) => {
  return (
    <ChakraFormControl my={2} mr={mr} isInvalid={!!isInvalid}>
      <FormLabel color="gray.800" htmlFor={type}>
        {label}
      </FormLabel>

      {children}

      <FormHelperText id={`${type}-helper-text`} color={!isInvalid && 'white'}>
        {isInvalid ? isInvalid.message : '-'}
      </FormHelperText>
    </ChakraFormControl>
  )
}

export default FormControl
