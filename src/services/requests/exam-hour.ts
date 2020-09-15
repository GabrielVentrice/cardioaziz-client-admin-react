import api from '../api'

export const get = async (examId: string) => {
  let params = {}

  if (examId) {
    params['examId'] = examId
  }

  return api.get('/exam-hour', { params })
}
