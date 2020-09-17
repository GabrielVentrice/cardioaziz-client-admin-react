import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'

import Input from '../../../../components/input'
import FormControl from '../../../../components/form-control'
import Button from '../../../../components/button'

import * as request from '../../../../services/requests'

import { Form } from './styles'

import {
  Divider,
  Flex,
  Heading,
  Icon,
  Textarea,
  Checkbox,
  useToast,
  Button as ChakraButton
} from '@chakra-ui/core'

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
  const toast = useToast()

  const preparationArray = exam.preparacao.map(field => {
    return { step: field }
  })

  const { register, handleSubmit, errors, control } = useForm({
    defaultValues: {
      name: exam.nome,
      observation: exam.observacao,
      preparation: preparationArray,
      activated: exam.ativado
    }
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'preparation'
  })

  const onSubmit = ({ activated, name, observation, preparation }) => {
    let arrayPreparation = []

    if (preparation) {
      arrayPreparation = preparation.map(({ step }) => {
        return step
      })
    }

    request.exam
      .put(name, arrayPreparation, observation, activated, exam._id)
      .then(res => {
        toast({ description: 'Exame atualizado', status: 'success' })
      })
      .catch(({ response }) => {
        console.log(response)

        toast({
          description: 'Não foi possivel atualizar o exame',
          status: 'error'
        })
      })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDir="column" justifyContent="space-between" height="100%">
        <Flex flexDir="column">
          <Flex justifyContent="space-between">
            <Heading size="md" color="gray.700">
              Editar exame
            </Heading>

            <Checkbox
              variantColor="green"
              type="checkbox"
              ref={register}
              name="activated"
            >
              <Heading size="sm" color="gray.700">
                Ativado
              </Heading>
            </Checkbox>
          </Flex>

          <Divider></Divider>
          <Flex overflowY="scroll" flexDir="column" paddingRight={4}>
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
                backgroundColor="gray.100"
                height="120px"
              />
            </FormControl>

            <Divider></Divider>

            <FormControl
              label="Preparação"
              isInvalid={errors.preparation}
              width="100%"
            >
              <Flex flexDir="column" maxH="240px">
                {fields.map((item, index) => {
                  return (
                    <Flex alignItems="center" key={item.id}>
                      <Flex width="100%">
                        <Input
                          placeholder={`${index + 1}ª Preparo`}
                          name={`preparation[${index}].step`}
                          inputRef={register({
                            required: 'Campo necessario'
                          })}
                          defaultValue={item.step}
                          width="544px"
                        />
                      </Flex>

                      <Flex
                        alignItems="center"
                        onClick={() => {
                          remove(index)
                        }}
                        cursor="pointer"
                        width="40px"
                        h="40px"
                        justifyContent="center"
                      >
                        <Icon name="delete" color="red.400"></Icon>
                      </Flex>
                    </Flex>
                  )
                })}
                <Flex width="544px">
                  <ChakraButton
                    onClick={() => append({ step: '' })}
                    mt={4}
                    color="gray.400"
                    fontWeight="500"
                    width="100%"
                    borderWidth="2px"
                    borderColor="gray.300"
                    background="none"
                  >
                    Adicionar preparo
                  </ChakraButton>
                </Flex>
              </Flex>
            </FormControl>
          </Flex>
        </Flex>
        <Flex justifyContent="flex-end">
          <Button type="submit">Salvar exame</Button>
        </Flex>
      </Flex>
    </Form>
  )
}

export default ExamForm
