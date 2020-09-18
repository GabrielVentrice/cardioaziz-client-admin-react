import api from '../api'

export const get = async (id?: string) => {
  let params = {}

  if (id) {
    params['id'] = id
  }

  return await api.get('/new-exams', { params })
}

export const getPaginate = async (page: number) => {
  let params = {}

  params['page'] = page + 1

  return await api.get('/new-exams/paginate', { params })
}

export const post = async (
  name: string,
  preparation: string[],
  observation: string
) => {
  return await api.post(`/new-exams`, {
    nome: name,
    preparacao: preparation,
    observacao: observation
  })
}

export const put = async (
  name: string,
  preparation: string[],
  observation: string,
  activated: boolean,
  examId
) => {
  let params = {}

  if (examId) {
    params['id'] = examId
  }

  return await api.put(
    `/new-exams`,
    {
      nome: name,
      preparacao: preparation,
      observacao: observation,
      ativado: activated
    },
    { params }
  )
}

export const remove = async (id: string) => {
  let params = {}

  if (id) {
    params['id'] = id
  }

  return await api.delete('/new-exams', { params })
}
