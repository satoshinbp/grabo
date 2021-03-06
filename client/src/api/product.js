import axios from 'axios'
import { SERVER_ROOT_URI } from '@env'
// SERVER_ROOT_URI might not work depends on dev environment
// In that case, replace SERVER_ROOT_URI to "http://<your network IP address>:<PORT>"

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
  const { data } = await axios.get(`${SERVER_ROOT_URI}/api/products/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
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

const postQuestionUniq = async (token, { productId, question }) => {
  const { data } = await axios.post(`${SERVER_ROOT_URI}/api/products/${productId}/questions/uniq`, question, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

const postAnswer = async (token, { id, type, answer }) => {
  const { data } = await axios.post(`${SERVER_ROOT_URI}/api/products/questions/${type}/${id}/answers`, answer, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

const reportQuestion = async (token, { id, type, reportKeys }) => {
  const res = await axios.put(`${SERVER_ROOT_URI}/api/products/questions/${type}/${id}/reports`, reportKeys, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res
}

const reportAnswer = async (token, { type, questionId, answerId, reportKeys }) => {
  const res = await axios.put(
    `${SERVER_ROOT_URI}/api/products/questions/${type}/${questionId}/answers/${answerId}/reports`,
    reportKeys,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return res
}

const postUserToHighlight = async (token, { userId, questionId, questionType }) => {
  const { data } = await axios.post(
    `${SERVER_ROOT_URI}/api/products/questions/${questionType}/${questionId}/highlight`,
    { userId },
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return data
}

const deleteUserFromHighlight = async (token, { userId, questionId, questionType }) => {
  const { data } = await axios.delete(
    `${SERVER_ROOT_URI}/api/products/questions/${questionType}/${questionId}/highlight/${userId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return data
}

const postUserToFavorite = async (token, { productId, userId }) => {
  const { data } = await axios.post(
    `${SERVER_ROOT_URI}/api/products/${productId}/favor`,
    { userId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  return data
}

const deleteUserFromFavorite = async (token, { productId, userId }) => {
  const { data } = await axios.delete(`${SERVER_ROOT_URI}/api/products/${productId}/favor/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

export {
  fetchProductById,
  fetchProductsByGroup,
  fetchProductsByUserId,
  fetchProductsByFavoredUserId,
  // searchProducts,
  postProduct,
  postAnswer,
  postQuestionUniq,
  reportQuestion,
  reportAnswer,
  postUserToHighlight,
  deleteUserFromHighlight,
  postUserToFavorite,
  deleteUserFromFavorite,
}
