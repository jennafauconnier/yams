import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

let _token = null

export function setAnonymousId(id: string) {
  if (id) {
    api.defaults.headers.common['user-anonymous-id'] = id
  } else {
    delete api.defaults.headers.common['user-anonymous-id']
  }
}

export function setToken(token: string) {
  _token = token
  if (_token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${_token}`
  } else {
    delete api.defaults.headers.common['Authorization']
  }
}

export default api
