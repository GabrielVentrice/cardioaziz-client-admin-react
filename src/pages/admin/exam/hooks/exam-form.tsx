import React from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

import Input from '../../../../components/input'
import FormControl from '../../../../components/form-control'
import Button from '../../../../components/button'

import * as request from '../../../../services/requests'

import { Form } from './styles'

import {
  Flex,
  Heading,
  Icon,
  Textarea,
  Checkbox,
  Button as ChakraButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PopoverFooter,
  ButtonGroup,
  Divider,
  useToast
} from '@chakra-ui/core'

interface IExam {
  _id: string
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
  const history = useHistory()

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

  function onClickRemove() {
    request.exam
      .remove(exam._id)
      .then(res => {
        toast({
          description: 'Exame removido',
          status: 'success'
        })
        history.push('/exames')
      })
      .catch(err => {
        toast({
          description: 'Não foi possivel remover este exame',
          status: 'error'
        })
      })
  }

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
        <Flex justifyContent="space-between">
          <Popover placement="right">
            <PopoverTrigger>
              <ChakraButton
                fontSize="sm"
                fontWeight="400"
                backgroundColor="red.300"
                color="white"
                _hover={{ backgroundColor: 'red.500' }}
              >
                Remover
              </ChakraButton>
            </PopoverTrigger>
            <PopoverContent zIndex={4} position="absolute" marginLeft="100px">
              <PopoverArrow />
              <PopoverBody>Remover exame</PopoverBody>
              <PopoverFooter d="flex" justifyContent="flex-end">
                <ButtonGroup size="sm">
                  <Button
                    variantColor="red"
                    onClick={() => {
                      onClickRemove()
                    }}
                  >
                    confirmar
                  </Button>
                </ButtonGroup>
              </PopoverFooter>
            </PopoverContent>
          </Popover>

          <Button type="submit">Salvar exame</Button>
        </Flex>
      </Flex>
    </Form>
  )
}

export default ExamForm
