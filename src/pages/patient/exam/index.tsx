import React, { useLayoutEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../../hooks/AuthContext'

import {
  Flex,
  Heading,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon
} from '@chakra-ui/core'

import DashboardStructure from '../../../components/dashboard-structure'

import * as requests from '../../../services/requests'

import Exam from './hooks/exam'

const PatientExam: React.FC = () => {
  const { user } = useAuth()

  const [patient, setPatient] = useState({})

  const getPatient = useCallback(() => {
    requests.patient
      .getId(user._id)
      .then(res => {
        setPatient(res.data)
      })
      .catch(err => {})
  }, [user._id])

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
        <Flex gridArea="header" flexDir="column">
          <Heading size="lg" color="gray.800">
            Paciente
          </Heading>

          <Breadcrumb
            separator={<Icon color="gray.600" name="chevron-right" />}
          >
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink color="gray.600" href="#">
                Meus Exames
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>

        <Flex
          gridArea="option"
          paddingY={4}
          alignItems="center "
          justifyContent="flex-end"
          width="100%"
        ></Flex>

        <Flex width="100%" height="100%" paddingY={4} flexWrap="wrap">
          <Exam patientId={user._id} isPatient></Exam>
        </Flex>
      </Flex>
    </DashboardStructure>
  )
}

export default PatientExam
