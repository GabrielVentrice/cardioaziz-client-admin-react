import React, { useLayoutEffect, useState, useCallback } from 'react'

import { Header } from './styles'
import { Flex } from '@chakra-ui/core'

import * as requests from '../../../../services/requests'
import ExamCard from '../../../../components/exam-card'

const Exam: React.FC = ({ id }) => {
  const [exams, setExams] = useState([])

  const getExams = useCallback(() => {
    requests.examResults
      .getId(id)
      .then(res => {
        console.log('Exames ==> ', res.data)
        setExams(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [id])

  useLayoutEffect(() => {
    getExams()
  }, [getExams])

  return (
    <Flex flexDir="column">
      <Header>Exames</Header>

      <Flex flexDir="column">
        {exams.map(({ exam_id }) => {
          const { nome_original, data_cad, _id } = exam_id

          return (
            <ExamCard name={nome_original} date={data_cad} id={_id}></ExamCard>
          )
        })}
      </Flex>
    </Flex>
  )
}

export default Exam
