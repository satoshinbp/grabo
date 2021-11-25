import axios from 'axios'
import { SERVER_ROOT_URI } from '@env'
// SERVER_ROOT_URI might not work depends on dev environment
// In that case, replace SERVER_ROOT_URI to "http://<your network IP address>:<PORT>"

const fetchProductById = async (token, id) => {
  const { data } = await axios.get(`http://192.168.1.65:8000/api/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

const fetchProductsByGroup = async (token, code) => {
  const { data } = await axios.get(`http://192.168.1.65:8000/api/products/group/${code}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

const fetchProductsByUserId = async (token, userId) => {
  try {
    const { data } = await axios.get(`http://192.168.1.65:8000/api/products/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data
  } catch (e) {
    console.error(e)
  }
}

const fetchProductsByFavoredUserId = async (token, userId) => {
  const { data } = await axios.get(`http://192.168.1.65:8000/api/products/fav/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

const postProduct = async (token, params) => {
  const { data } = await axios.post(`http://192.168.1.65:8000/api/products`, params, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

const postQuestionUniq = async (token, { productId, question }) => {
  const { data } = await axios.post(`http://192.168.1.65:8000/api/products/${productId}/questions/uniq`, question, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

const postAnswer = async (token, { productId, index, type, answer }) => {
  const { data } = await axios.post(
    `http://192.168.1.65:8000/api/products/${productId}/questions/${type}/${index}/answers`,
    answer,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  return data
}

const reportQuestion = async (token, { productId, index, type, reportKeys }) => {
  const res = await axios.put(
    `http://192.168.1.65:8000/api/products/${productId}/questions/${type}/${index}/reports`,
    reportKeys,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return res
}

const reportAnswer = async (token, { productId, questionIndex, type, answerIndex, reportKeys }) => {
  const res = await axios.put(
    `http://192.168.1.65:8000/api/products/${productId}/questions/${type}/${questionIndex}/answers/${answerIndex}/reports`,
    reportKeys,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return res
}

const postUserToHighlight = async (token, { productId, userId, questionIndex, questionType }) => {
  const { data } = await axios.post(
    `http://192.168.1.65:8000/api/products/${productId}/questions/${questionType}/${questionIndex}/highlight`,
    { userId },
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return data
}

const deleteUserFromHighlight = async (token, { productId, userId, questionIndex, questionType }) => {
  const { data } = await axios.delete(
    `http://192.168.1.65:8000/api/products/${productId}/questions/${questionType}/${questionIndex}/highlight/${userId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  )
  return data
}

const postUserToFavorite = async (token, { productId, userId }) => {
  const { data } = await axios.post(`http://192.168.1.65:8000/api/products/${productId}/favor`, userId, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

const deleteUserFromFavorite = async (token, { productId, userId }) => {
  const { data } = await axios.delete(`http://192.168.1.65:8000/api/products/${productId}/favor/${userId}`, {
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
