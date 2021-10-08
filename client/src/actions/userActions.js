import axios from 'axios'
import { API_URL } from '@env'

export const login = (user) => {
  return {
    type: 'LOGIN',
    user,
  }
}

export const startLogin = () => {
  return (dispatch) => {
    axios.get(`${API_URL}/auth/google`).then((res) => {
      dispatch(login(res.user))
    })
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT',
  }
}

export const startLogout = () => {
  return (dispatch) => {
    axios.get(`${API_URL}/api/logout`).then((res) => {
      dispatch(logout())
    })
  }
}
