import api from '../api'

export const updatePass = async (password, code) => {
  return await api.post(`/update/pass/`, { password, code })
}

export const resetPass = async email => {
  return await api.post(`/reset/pass`, { username: email })
}

export const validateCode = async code => {
  return await api.post(`/validate-code`, { code })
}
