import api from '../api'

export const getId = async (id: string) => {
  let params = {}

  return await api.get(`/pacientes/todos-exames/${id}`, { params })
}
