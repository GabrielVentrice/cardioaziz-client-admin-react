import React, { useCallback } from 'react'
import { Button, Divider, Flex, Heading, Icon, Select } from '@chakra-ui/core'
import { useForm, useFieldArray } from 'react-hook-form'

import Input from '../../../../components/input'
import FormControl from '../../../../components/form-control'

import { normalizeHour } from '../../../../utils/mask'

const ExamHourForm: React.FC = () => {
  const { register, handleSubmit, errors, control } = useForm()

  const { fields, append, remove } = useFieldArray({ control, name: 'hour' })

  const onSubmit = useCallback(data => {
    console.log(data)
  }, [])

  return (
    <Flex
      flexDir="column"
      boxShadow="2px 4px 6px rgba(113, 128, 150, 0.16)"
      padding={4}
      background="white"
      borderRadius="md"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading size="md" color="gray.700">
          Horario
        </Heading>

        <Divider></Divider>

        {fields.map((item, index) => {
          return (
            <Flex alignItems="center">
              <Select
                name={`hour[${index}].weekDay`}
                placeholder="Dia da semana"
                ref={register}
                defaultValue={item.weekDay}
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
                name={`hour[${index}].start`}
                inputRef={register({ required: 'Campo necessario' })}
                width="80"
                ml={2}
                defaultValue={item.start}
                // onChange={event => {
                //   const { value } = event.target

                //   event.target.value = normalizeHour(value)
                // }}
              />

              <Input
                placeholder="00:00"
                name={`hour[${index}].end`}
                inputRef={register({
                  required: 'Campo necessario'
                })}
                width="80"
                ml={2}
                defaultValue={item.end}
                // onChange={event => {
                //   const { value } = event.target

                //   event.target.value = normalizeHour(value)
                // }}
              />

              <Flex
                width={40}
                justifyContent="center"
                onClick={() => remove(index)}
                cursor="pointer"
              >
                <Icon name="delete"></Icon>
              </Flex>
            </Flex>
          )
        })}

        <Button onClick={() => append({ start: '', end: '', weekDay: 1 })}>
          Adicionar
        </Button>

        <Button type="submit">Salvar</Button>
      </form>
    </Flex>
  )
}

export default ExamHourForm
