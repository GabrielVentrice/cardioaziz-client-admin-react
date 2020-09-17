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

import ExamForm from './hooks/exam-form'
import ExamHourForm from './hooks/exam-hour-form'

const Exam: React.FC = () => {
  let { id } = useParams()

  const [exam, setExam] = useState()

  const getExam = useCallback(() => {
    requests.exam
      .get(id)
      .then(res => {
        console.log(res.data)

        setExam(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [id])

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

        <Flex width="100%" height="100%" paddingY={4} flexWrap="wrap">
          <Flex width={640}>
            <Flex
              flexDir="column"
              boxShadow="2px 4px 6px rgba(113, 128, 150, 0.16)"
              padding={4}
              background="white"
              borderRadius="md"
              width="100%"
            >
              {exam && <ExamForm exam={exam}></ExamForm>}
            </Flex>
          </Flex>

          <Flex width={640} ml={8}>
            <ExamHourForm examId={id}></ExamHourForm>
          </Flex>
        </Flex>
      </Flex>
    </DashboardStructure>
  )
}

export default Exam
