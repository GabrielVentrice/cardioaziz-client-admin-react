import React, { useLayoutEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
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
        <Flex gridArea="header" flexDir="column">
          <Heading size="lg" color="gray.800">
            Paciente
          </Heading>

          <Breadcrumb
            separator={<Icon color="gray.600" name="chevron-right" />}
          >
            <BreadcrumbItem>
              <BreadcrumbLink color="gray.600" href="/">
                Lista de pacientes
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink color="gray.600" href="#">
                Editar paciente
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
          <Profile patient={patient}></Profile>

          <Flex width={8}></Flex>

          <Exam patientId={id}></Exam>
        </Flex>
      </Flex>
    </DashboardStructure>
  )
}

export default Patient
