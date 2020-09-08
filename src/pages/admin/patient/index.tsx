import React, { useLayoutEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { Flex, Heading } from '@chakra-ui/core'

import DashboardStructure from '../../../components/dashboard-structure'

import * as requests from '../../../services/requests'

import Profile from './hooks/profile'
import Exam from './hooks/exam'

const Patient: React.FC = () => {
  let { id } = useParams()

  const [patient, setPatient] = useState({})

  const getPatient = useCallback(() => {
    requests.patient
      .getId(id)
      .then(res => {
        setPatient(res.data)
      })
      .catch(err => {})
  }, [id])

  useLayoutEffect(() => {
    getPatient()
  }, [getPatient])

  return (
    <DashboardStructure>
      <Flex
        direction="column"
        paddingX={['24px', '24px', '48px', '72px']}
        paddingY="24px"
        height="100%"
        width="100%"
      >
        <Flex gridArea="header">
          <Heading size="lg" color="gray.800">
            Paciente
          </Heading>
        </Flex>

        <Flex
          gridArea="option"
          paddingY={4}
          alignItems="center "
          justifyContent="flex-end"
          width="100%"
        >
          {/* <Button
            onClick={() => setCreateIsOpen(true)}
            boxShadow="4px 4px 8px rgba(5,7,10,0.09), -4px -4px 8px rgba(255,255,255,0.5)"
            background="#E2E8F0"
            fontSize="md"
            color="gray.500"
            fontWeight={500}
            _hover={{
              color: 'gray.600'
            }}
            _active={{
              boxShadow:
                'inset 2px 2px 4px rgba(5,7,10,0.2), -2px -2px 4px rgba(255,255,255,0.4)',
              background: '#c8d3e3',
              color: 'white',
              border: 'none'
            }}
          >
            <Icon name="userPlus" color="gray.500" mr={2} size={5}></Icon>{' '}
            Adicionar exame
          </Button> */}
        </Flex>

        <Flex width="100%" height="100%" paddingY={4}>
          <Profile patient={patient}></Profile>

          <Exam patientId={id}></Exam>
        </Flex>
      </Flex>
    </DashboardStructure>
  )
}

export default Patient
