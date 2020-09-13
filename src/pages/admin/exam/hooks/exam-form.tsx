import React from 'react'
import { Divider, Flex, Heading, Icon, Textarea } from '@chakra-ui/core'
import { useForm, useFieldArray } from 'react-hook-form'

import Input from '../../../../components/input'
import FormControl from '../../../../components/form-control'
import Button from '../../../../components/button'

interface IExam {
  ativado: boolean
  nome: string
  observacao: string
  preparacao: string[]
}

interface ExamFormProps {
  exam: IExam
}

const ExamForm: React.FC = ({ exam }: ExamFormProps) => {
  const preparationArray = exam.preparacao.map(field => {
    return { step: field }
  })

  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: {
      name: exam.nome,
      observation: exam.observacao,
      preparation: preparationArray
    }
  })

  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: 'hour'
  })

  return (
    <Flex
      flexDir="column"
      boxShadow="2px 4px 6px rgba(113, 128, 150, 0.16)"
      padding={4}
      background="white"
      borderRadius="md"
      width="100%"
      justifyContent="space-between"
    >
      <Flex flexDir="column">
        <Heading size="md" color="gray.700">
          Editar Exame
        </Heading>

        <Divider></Divider>

        <FormControl
          type="name"
          label="Nome do exame*"
          mr={4}
          isInvalid={errors.name}
          width="100%"
        >
          <Input
            placeholder="Nome do exame"
            type="name"
            name="name"
            id="name"
            inputRef={register({ required: 'Campo necessario' })}
            width="100%"
          />
        </FormControl>

        <FormControl
          label="Observação"
          mr={4}
          isInvalid={errors.name}
          width="100%"
        >
          <Textarea
            placeholder="Observações do exame"
            name="observation"
            id="observation"
            width="100%"
            ref={register}
          />
        </FormControl>

        <Divider></Divider>

        <FormControl
          label="Preparação"
          mr={4}
          isInvalid={errors.name}
          width="100%"
        >
          <Flex overflowY="scroll" flexDir="column" maxH="320px">
            {fields.map((item, index) => {
              return (
                <Flex width="100%">
                  <Input
                    placeholder={`${index + 1}ª Preparação`}
                    name={`preparation[${index}].step`}
                    inputRef={register({ required: 'Campo necessario' })}
                    defaultValue={item.step}
                    width="100%"
                  />

                  <Flex
                    alignItems="center"
                    onClick={() => remove(index)}
                    cursor="pointer"
                  >
                    <Icon name="delete"></Icon>
                  </Flex>
                </Flex>
              )
            })}
          </Flex>

          <Button onClick={() => append({ step: '' })}>Adicionar</Button>
        </FormControl>
      </Flex>
      <Flex justifyContent="flex-end">
        <Button>Salvar</Button>
      </Flex>
    </Flex>
  )
}

export default ExamForm
