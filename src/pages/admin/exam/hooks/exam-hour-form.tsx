import React, { useCallback, useEffect, useLayoutEffect } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { useQuery } from 'react-query'

import Input from '../../../../components/input'
import FormControl from '../../../../components/form-control'
import Button from '../../../../components/button'

import * as request from '../../../../services/requests'

import {
  Divider,
  Flex,
  Heading,
  Icon,
  Select,
  useToast,
  Button as ChakraButton,
  Text
} from '@chakra-ui/core'

import { Form } from './styles'

const ExamHourForm: React.FC = ({ examId }) => {
  const { register, handleSubmit, errors, control, reset } = useForm({
    defaultValues: { hour: [{ weekDay: 1, start: '', end: '' }] }
  })

  const [loading, setLoading] = React.useState(false)

  const { fields, append, remove } = useFieldArray({ control, name: 'hour' })

  const toast = useToast()

  const hourArray = async () => {
    return new Promise(resolve => {
      resolve(
        request.examHour
          .get(examId)
          .then(res => {
            const hourArray = res.data.map(({ inicio, fim, semana, _id }) => {
              return { start: inicio, end: fim, weekDay: semana, id: _id }
            })

            setLoading(true)

            return hourArray
          })
          .catch(err => {})
      )
    })
  }

  useQuery('data', hourArray, {
    refetchOnWindowFocus: false,
    onSuccess: data => {
      // from memor the problem: this reset is belong to the previous hook instance
      reset({
        hour: data
      })
    }
  })

  const removeApi = id => {
    console.log('Removendo :')
    console.log(id)
    console.log(id.length < 25)

    if (id.length < 25)
      request.examHour
        .remove(id)
        .then()
        .catch(({ response }) => {
          toast({
            description: 'Ocorreu um erro ao remover o horario',
            status: 'error'
          })
        })
  }

  const onSubmit = useCallback(({ hour }) => {
    let error = false

    hour.map(({ id, start, end, weekDay }) => {
      if (id.length < 25) {
        //Atualizar
        request.examHour
          .put(id, { start, end, weekDay })
          .then()
          .catch(({ response }) => {
            error = true
          })
      } else {
        //Criar
        request.examHour
          .post(examId, { start, end, weekDay })
          .catch(({ response }) => {
            error = true
          })
      }
    })

    if (error) {
      toast({
        description: 'Ocorreu um erro ao salvar os horários',
        status: 'error'
      })
    } else {
      toast({ description: 'Horários salvos', status: 'success' })
    }
  }, [])

  return (
    <Flex
      flexDir="column"
      boxShadow="2px 4px 6px rgba(113, 128, 150, 0.16)"
      padding={4}
      background="white"
      borderRadius="md"
      width="100%"
    >
      {loading && (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Heading size="md" color="gray.700">
            Editar horários
          </Heading>

          <Divider></Divider>

          <Flex flexDir="column" justifyContent="space-between" height="100%">
            <Flex flexDir="column">
              <Flex
                flexDir="column"
                overflowY="scroll"
                maxHeight="560px"
                paddingRight={4}
              >
                {fields.map((item, index) => {
                  return (
                    <Flex alignItems="center" key={item.id}>
                      <Flex alignItems="center">
                        <Select
                          name={`hour[${index}].weekDay`}
                          placeholder="Dia da semana"
                          ref={register}
                          defaultValue={item.weekDay}
                          minW="120px"
                        >
                          <option value={1}>Segunda</option>
                          <option value={2}>Terça</option>
                          <option value={3}>Quarta</option>
                          <option value={4}>Quinta</option>
                          <option value={5}>Sexta</option>
                          <option value={6}>Sábado</option>
                        </Select>

                        <Input
                          placeholder="00:00"
                          name={`hour[${index}].id`}
                          inputRef={register({ required: 'Campo necessario' })}
                          width="80"
                          ml={2}
                          defaultValue={item.id}
                          display="none"
                        />

                        <Input
                          placeholder="00:00"
                          name={`hour[${index}].start`}
                          inputRef={register({ required: 'Campo necessario' })}
                          width="160px"
                          ml={2}
                          defaultValue={item.start}
                        />

                        <Text ml={2} color="gray.400">
                          até
                        </Text>

                        <Input
                          placeholder="00:00"
                          name={`hour[${index}].end`}
                          inputRef={register({
                            required: 'Campo necessario'
                          })}
                          width="160px"
                          ml={2}
                          defaultValue={item.end}
                        />
                      </Flex>

                      <Flex
                        alignItems="center"
                        onClick={() => {
                          removeApi(item.id)

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
              </Flex>
              <Flex>
                <ChakraButton
                  onClick={() => append({ step: '' })}
                  color="gray.400"
                  fontWeight="500"
                  width="524px"
                  borderWidth="2px"
                  borderColor="gray.300"
                  background="none"
                >
                  Adicionar horário
                </ChakraButton>
              </Flex>
            </Flex>

            <Flex justifyContent="flex-end">
              <Button type="submit">Salvar horários</Button>
            </Flex>
          </Flex>
        </Form>
      )}
    </Flex>
  )
}

export default ExamHourForm
