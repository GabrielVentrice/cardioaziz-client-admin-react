import api from '../api'

export const get = async (examId: string) => {
  let params = {}

  if (examId) {
    params['examId'] = examId
  }

  return api.get('/exam-hour', { params })
}

export const post = async (examId: string, { start, end, weekDay }) => {
  let params = {}

  if (examId) {
    params['examId'] = examId
  }

  return api.post(
    '/exam-hour',
    { inicio: start, fim: end, semana: weekDay },
    { params }
  )
}

export const put = async (examHourId: string, { start, end, weekDay }) => {
  let params = {}

  if (examHourId) {
    params['id'] = examHourId
  }

  return api.put(
    '/exam-hour',
    { inicio: start, fim: end, semana: weekDay },
    { params }
  )
}

export const remove = async (examHourId: string) => {
  let params = {}

  if (examHourId) {
    params['id'] = examHourId
  }

  return api.delete('/exam-hour', { params })
}
