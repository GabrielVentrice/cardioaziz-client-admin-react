import api from '../api'

export const getId = async (id: string) => {
  let params = {}

  return await api.get(`/pacientes/todos-exames/${id}`, { params })
}

export const download = async (id: string) => {
  return await api.get(`/pacientes/exames/${id}`)
}

export const upload = async (formData, patientId: string) => {
  return await api.post(`/pacientes/upload-exame/${patientId}`, { formData })
}

export const deleteRelation = async relationId => {
  return await api.delete(`/pacientes/exames-deletar/${relationId}`)
}
