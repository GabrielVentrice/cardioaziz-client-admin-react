import api from '../api'

import { IPatientInput } from '../../components/patient-form'

export const get = async (page: number) => {
  let params = {}

  params['page'] = page + 1

  return await api.get('/pacientes', { params })
}

export const getId = async (id: string) => {
  let params = {}

  return await api.get(`/pacientes/${id}`, { params })
}

export const post = async ({
  name,
  birthday,
  email,
  tel,
  cpf,
  rg
}: IPatientInput) => {
  const body = {
    nome: name,
    nascimento: birthday,
    email,
    telelfone: tel,
    cpf,
    rg
  }

  return await api.post('/pacientes', body)
}

export const put = async (
  { name, birthday, email, tel, cpf, rg }: IPatientInput,
  id: string
) => {
  const body = {
    nome: name,
    nascimento: birthday,
    email,
    telelfone: tel,
    cpf,
    rg
  }

  return await api.put(`/pacientes/${id}`, body)
}
