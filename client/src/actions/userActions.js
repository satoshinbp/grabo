import axios from 'axios'
import { API_URL } from '@env'
import * as WebBrowser from 'expo-web-browser'

export const login = (user) => ({
  type: 'LOGIN',
  user,
})

export const startLogin = () => async (dispatch) => {
  // const user = await WebBrowser.openBrowserAsync(`${API_URL}/auth/google`)
  // WebBrowser.dismissBrowser()
  const user = await axios.get(`${API_URL}/auth/google`)
  dispatch(login(user))
}

export const logout = () => ({
  type: 'LOGOUT',
})

export const startLogout = () => async (dispatch) => {
  await axios.get(`${API_URL}/api/logout`)
  dispatch(logout())
}
