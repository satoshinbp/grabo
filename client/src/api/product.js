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

const postQuestionUniq = async (token, { productId, question }) => {
  const { data } = await axios.post(`${SERVER_ROOT_URI}/api/products/${productId}/questions/uniq`, question, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

const postAnswerFixed = async (token, { productId, index, answer }) => {
  const { data } = await axios.post(
    `${SERVER_ROOT_URI}/api/products/${productId}/questions/fixed/${index}/answers`,
    answer,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  return data
}

const postAnswerUniq = async (token, { productId, index, answer }) => {
  const { data } = await axios.post(
    `${SERVER_ROOT_URI}/api/products/${productId}/questions/uniq/${index}/answers`,
    answer,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return data
}

const updateReportUniqQn = async (token, { productId, index, reportKeys }) => {
  const res = await axios.put(
    `${SERVER_ROOT_URI}/api/products/${productId}/questions/uniq/${index}/reports`,
    reportKeys,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return res
}

const updateReportFixedAns = async (token, { productId, questionIndex, answerIndex, reportKeys }) => {
  const res = await axios.put(
    `${SERVER_ROOT_URI}/api/products/${productId}/questions/fixed/${questionIndex}/answers/${answerIndex}/reports`,
    reportKeys,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return res
}

const updateReportUniqAns = async (token, { productId, questionIndex, answerIndex, reportKeys }) => {
  const res = await axios.put(
    `${SERVER_ROOT_URI}/api/products/${productId}/questions/uniq/${questionIndex}/answers/${answerIndex}/reports`,
    reportKeys,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return res
}

const postUserToHighlightFixed = async (token, { productId, userId, questionIndex }) => {
  const { data } = await axios.post(
    `${SERVER_ROOT_URI}/api/products/${productId}/questions/fixed/${questionIndex}/highlight`,
    { userId },
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return data
}

const postUserToHighlightUniq = async (token, { productId, userId, questionIndex }) => {
  const { data } = await axios.post(
    `${SERVER_ROOT_URI}/api/products/${productId}/questions/uniq/${questionIndex}/highlight`,
    { userId },
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return data
}

const deleteUserFromHighlightFixed = async (token, { productId, userId, questionIndex }) => {
  const { data } = await axios.delete(
    `${SERVER_ROOT_URI}/api/products/${productId}/questions/fixed/${questionIndex}/highlight/${userId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return data
}

const deleteUserFromHighlightUniq = async (token, { productId, userId, questionIndex }) => {
  const { data } = await axios.delete(
    `${SERVER_ROOT_URI}/api/products/${productId}/questions/uniq/${questionIndex}/highlight/${userId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  return data
}

const postUserToFavorite = async (token, { productId, userId }) => {
  const { data } = await axios.post(`${SERVER_ROOT_URI}/api/products/${productId}/favor`, userId, {
    headers: { Authorization: `Bearer ${token}` },
  })
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
  postAnswerFixed,
  postAnswerUniq,
  postQuestionUniq,
  updateReportUniqQn,
  updateReportFixedAns,
  updateReportUniqAns,
  postUserToHighlightFixed,
  postUserToHighlightUniq,
  deleteUserFromHighlightFixed,
  deleteUserFromHighlightUniq,
  postUserToFavorite,
  deleteUserFromFavorite,
}
