import axios from 'axios'
import { SERVER_ROOT_URI } from '@env'
// SERVER_ROOT_URI might not work depends on dev environment
// In that case, replace SERVER_ROOT_URI to "<your network IP address>:<PORT>""

const signInWithGoogle = async (idToken) => {
  try {
    const { data } = await axios.post(`http://192.168.1.65:8000/auth/google`, { idToken })
    return data
  } catch (e) {
    console.error(e)
  }
}

const fetchUser = async (token) => {
  try {
    const { data } = await axios.get(`http://192.168.1.65:8000/api/users`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data
  } catch (e) {
    console.error(e)
  }
}

const fetchUsersByGroup = async (token, code) => {
  try {
    const { data } = await axios.get(`http://192.168.1.65:8000/api/users/${code}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data
  } catch (e) {
    console.error(e)
  }
}

const patchUser = async (token, id, params) => {
  try {
    const { data } = await axios.patch(`http://192.168.1.65:8000/api/users/${id}`, params, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data
  } catch (e) {
    console.error(e)
  }
}

export { signInWithGoogle, fetchUser, fetchUsersByGroup, patchUser }
