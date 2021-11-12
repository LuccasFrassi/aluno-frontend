import axios from 'axios'

const api = axios.create({
  baseURL: 'https://cadastroalunos-backend.herokuapp.com'
})

export default api;