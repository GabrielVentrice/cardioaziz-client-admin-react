import api from '../api'

export const get = async () => {
  return await api.get('/new-exams')
}
