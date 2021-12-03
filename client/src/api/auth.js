import axios from 'axios'
import { SERVER_ROOT_URI } from '@env'
// SERVER_ROOT_URI might not work depends on dev environment
// In that case, replace SERVER_ROOT_URI to "http://<your network IP address>:<PORT>"

const signInWithGoogle = async (idToken) => {
  const { data } = await axios.post(`http://54.202.13.134/auth/google`, { idToken })
  return data
}

const fetchUser = async (token) => {
  const { data } = await axios.get(`http://54.202.13.134/api/users`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

const fetchUsersByGroup = async (token, code) => {
  const { data } = await axios.get(`http://54.202.13.134/api/users/${code}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

const fetchUserById = async (token, id) => {
  const { data } = await axios.get(`http://54.202.13.134/api/users/highlight/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

const patchUser = async (token, id, params) => {
  const { data } = await axios.patch(`http://54.202.13.134/api/users/${id}`, params, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

const setNotificationTrue = async (token, userId, notificationId) => {
  const { data } = await axios.get(`http://54.202.13.134/api/users/${userId}/notification/${notificationId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

export { signInWithGoogle, fetchUser, fetchUsersByGroup, fetchUserById, patchUser, setNotificationTrue }
