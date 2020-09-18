import axios from 'axios'

const api = axios.create({
  timeout: 5000,
  // baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*'
  },
  baseURL: 'https://api.cardioaziz.com.br/api'
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('CardioAziz:token')

  if (token) {
    Object.assign(config.headers, {
      Authorization: `Bearer ${token}`
    })
  }

  return config
})

export default api
