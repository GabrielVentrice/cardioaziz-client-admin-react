import axios from 'axios'

const api = axios.create({
  timeout: 5000,
  // baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*'
  },
  baseURL: 'http://cardioaziz-exames.com.br/api'
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('CardioAziz:token')

  if (token) {
    Object.assign(config.headers, {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4iLCJ1c2VySWQiOiI1ZDMwZDdjNDFjOWQ0NDAwMDA4Zjk0N2QiLCJpYXQiOjE1OTg5Nzg5NDZ9.tQ5pluUrLaSkaT-l9NCCKAyiOWyBajdzAJKDzcP6F8Y`
    })
  }

  return config
})

export default api
