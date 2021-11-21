import axios from 'axios'
import { SERVER_ROOT_URI, REACT_APP_VISION_API_KEY } from '@env'
import groups from '../utils/groups'
// SERVER_ROOT_URI might not work depends on dev environment
// In that case, replace SERVER_ROOT_URI to "<your network IP address>:<PORT>""

const fetchProductById = async (token, id) => {
  const { data } = await axios.get(`${SERVER_ROOT_URI}/api/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

const fetchProductsByGroup = async (token, code) => {
  const { data } = await axios.get(`${SERVER_ROOT_URI}/api/products/group/${code}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

const fetchProductsByUserId = async (token, userId) => {
  try {
    const { data } = await axios.get(`${SERVER_ROOT_URI}/api/products/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data
  } catch (e) {
    console.error(e)
  }
}

const fetchProductsByFavoredUserId = async (token, userId) => {
  const { data } = await axios.get(`${SERVER_ROOT_URI}/api/products/fav/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

const postProduct = async (token, params) => {
  const { data } = await axios.post(`${SERVER_ROOT_URI}/api/products`, params, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

const postUniqQuestion = async (token, { id, question }) => {
  const { data } = await axios.post(`${SERVER_ROOT_URI}/api/products/${id}/question/uniq`, question, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

const postAnswerToFixedQn = async (token, { id, questionIndex, answer }) => {
  const { data } = await axios.post(
    `${SERVER_ROOT_URI}/api/products/${id}/question/fixed/${questionIndex}/answer`,
    answer,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  return data
}

const postAnswerToUniqQn = async (token, { id, questionIndex, answer }) => {
  const { data } = await axios.post(
    `${SERVER_ROOT_URI}/api/products/${id}/question/uniq/${questionIndex}/answer`,
    answer,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  return data
}

const addUserToFixedQnHighlight = async (token, id, params) => {
  const { data } = await axios.post(`${SERVER_ROOT_URI}/api/products/${id}/question/fixed/highlight`, params, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

const addUserToUniqQnHighlight = async (token, id, params) => {
  const { data } = await axios.post(`${SERVER_ROOT_URI}/api/products/${id}/question/uniq/highlight`, params, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

const removeUserFromFixedQnHighlight = async (token, id, userId, questionIndex) => {
  const { data } = await axios.delete(
    `${SERVER_ROOT_URI}/api/products/${id}/question/fixed/${questionIndex}/highlight/${userId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  return data
}

const removeUserFromUniqQnHighlight = async (token, id, userId, questionIndex) => {
  const { data } = await axios.delete(
    `${SERVER_ROOT_URI}/api/products/${id}/question/uniq/${questionIndex}/highlight/${userId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  return data
}

const addUserToFav = async (token, id, params) => {
  const { data } = await axios.post(`${SERVER_ROOT_URI}/api/products/${id}/favor`, params, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

const removeUserFromFav = async (token, id, userId) => {
  const { data } = await axios.delete(`${SERVER_ROOT_URI}/api/products/${id}/favor/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

const updateReport = async (token, params) => {
  const res = await axios.put(`${SERVER_ROOT_URI}/api/products/report`, params, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res
}

export {
  fetchProductById,
  fetchProductsByGroup,
  fetchProductsByUserId,
  fetchProductsByFavoredUserId,
  // searchProducts,
  postProduct,
  postAnswerToFixedQn,
  postAnswerToUniqQn,
  postUniqQuestion,
  addUserToFixedQnHighlight,
  addUserToUniqQnHighlight,
  removeUserFromFixedQnHighlight,
  removeUserFromUniqQnHighlight,
  addUserToFav,
  removeUserFromFav,
  updateReport,
}
