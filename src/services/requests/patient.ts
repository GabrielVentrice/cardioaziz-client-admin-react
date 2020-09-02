import api from '../api'

export const get = async (page: string) => {
  let params = {}

  return await api.get('/paciente', { params })
}
