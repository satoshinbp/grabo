import axios from 'axios'
import { SERVER_ROOT_URI } from '@env'
// SERVER_ROOT_URI might not work depends on dev environment
// In that case, replace SERVER_ROOT_URI to "http://<your network IP address>:<PORT>"

const signInWithGoogle = async (idToken) => {
  try {
    const { data } = await axios.post(`http://54.202.13.134/auth/google`, { idToken })
    return data
  } catch (e) {
    console.error(e)
  }
}

const fetchUser = async (token) => {
  try {
    const { data } = await axios.get(`http://54.202.13.134/api/users`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data
  } catch (e) {
    console.error(e)
  }
}

const fetchUsersByGroup = async (token, code) => {
  try {
    const { data } = await axios.get(`http://54.202.13.134/api/users/${code}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data
  } catch (e) {
    console.error(e)
  }
}

const patchUser = async (token, id, params) => {
  try {
    const { data } = await axios.patch(`http://54.202.13.134/api/users/${id}`, params, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data
  } catch (e) {
    console.error(e)
  }
}

const setNotificationTrue = async (token, params) => {
  try {
    const { data } = await axios.patch(`${SERVER_ROOT_URI}/api/users/${params.id}/notification`, params, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data
  } catch (e) {
    console.error(e)
  }
}

export { signInWithGoogle, fetchUser, fetchUsersByGroup, patchUser, setNotificationTrue }
