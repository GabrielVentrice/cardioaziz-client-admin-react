import React, { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useToast } from '@chakra-ui/core'
import { useHistory } from 'react-router'

import { Flex, Button as ChakraButton } from '@chakra-ui/core'

import FormControl from '../form-control'
import Popup from '../popup'
import Input from '../input'
import Button from '../button'

export interface IExamInput {
  name: string
  preparation: string[]
  observation: string
  active: boolean
}

const ExamForm: React.FC = ({ isOpen, onClose, toClose, exam }) => {
  const history = useHistory()

  const { register, handleSubmit, errors } = useForm<IExamInput>()
  const toast = useToast()

  const onEditSubmit = useCallback(() => {}, [])

  const onSubmit = useCallback(() => {}, [])

  return (
    <Popup title={exam ? 'Editar Exame' : 'Criar Exame'}>
      <Flex>
        <form onSubmit={handleSubmit(exam ? onEditSubmit : onSubmit)}>
          <Flex flexDir="column">
            <Flex justifyContent="space-between" mt={6}>
              <ChakraButton
                onClick={toClose}
                padding={0}
                background="none"
                color="gray.500"
                fontWeight={400}
              >
                Cancelar
              </ChakraButton>
              <Button type="submit">{exam ? 'Atualizar' : 'Salvar'}</Button>
            </Flex>
          </Flex>
        </form>
      </Flex>
    </Popup>
  )
}

export default ExamForm
