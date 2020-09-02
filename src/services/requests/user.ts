import api from '../api'

interface IAuth {
  email: string
  password: string
  role: string
}

export const auth = async ({ email, password, role }: IAuth) => {
  let params = { role: '' }

  params['role'] = role

  return await api.post(
    'authenticate',
    { username: email, password },
    { params }
  )
}
