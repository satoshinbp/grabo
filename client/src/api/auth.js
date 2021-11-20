import axios from 'axios'
import { SERVER_ROOT_URI } from '@env'
// SERVER_ROOT_URI might not work depends on dev environment
// In that case, replace SERVER_ROOT_URI to "<your network IP address>:<PORT>""

const signInWithGoogle = async (idToken) => {
  try {
    const { data } = await axios.post(`${SERVER_ROOT_URI}/auth/google`, { idToken })
    return data
  } catch (e) {
    console.error(e)
  }
}

const fetchUser = async (token) => {
  try {
    const { data } = await axios.get(`${SERVER_ROOT_URI}/api/users`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data
  } catch (e) {
    console.error(e)
  }
}

const fetchUsersByGroup = async (token, code) => {
  try {
    const { data } = await axios.get(`${SERVER_ROOT_URI}/api/users/${code}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data
  } catch (e) {
    console.error(e)
  }
}

const updateUser = async (token, params) => {
  try {
    const { data } = await axios.patch(`${SERVER_ROOT_URI}/api/users/${params.user_id}`, params, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data
  } catch (e) {
    console.error(e)
  }
}

export { signInWithGoogle, fetchUser, fetchUsersByGroup, updateUser }
