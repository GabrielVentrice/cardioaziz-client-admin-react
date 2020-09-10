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

const Exam: React.FC = () => {
  let { id } = useParams()

  const [patient, setExam] = useState({})

  const getExam = useCallback(() => {}, [id])

  useLayoutEffect(() => {
    getExam()
  }, [getExam])

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
            Exame
          </Heading>

          <Breadcrumb
            separator={<Icon color="gray.600" name="chevron-right" />}
          >
            <BreadcrumbItem>
              <BreadcrumbLink color="gray.600" href="/exames">
                Lista de exames
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink color="gray.600" href="#">
                Editar exame
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

        <Flex width="100%" height="100%" paddingY={4} flexWrap="wrap"></Flex>
      </Flex>
    </DashboardStructure>
  )
}

export default Exam
