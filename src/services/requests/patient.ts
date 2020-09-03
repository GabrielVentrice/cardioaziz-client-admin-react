import api from '../api'

import { IPatientInput } from '../../components/patient-form'

export const get = async (page: string) => {
  let params = {}

  return await api.get('/paciente', { params })
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
