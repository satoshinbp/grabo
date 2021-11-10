import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import { SERVER_ROOT_URI, REACT_APP_VISION_API_KEY } from '@env'
// SERVER_ROOT_URI might not work depends on dev environment
// In that case, replace SERVER_ROOT_URI to "<your network IP address>:<PORT>""

const fetchProductById = async (token, id) => {
  try {
    const { data } = await axios.get(`${SERVER_ROOT_URI}/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data
  } catch (e) {
    console.error(e)
  }
}

const fetchProductsByGroup = async (token, code) => {
  try {
    const { data } = await axios.get(`${SERVER_ROOT_URI}/api/products/group/${code}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data
  } catch (e) {
    console.error(e)
  }
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
  try {
    const { data } = await axios.get(`${SERVER_ROOT_URI}/api/products/fav/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data
  } catch (e) {
    console.error(e)
  }
}

const postImage = async (token, params) => {
  try {
    const res = await axios.post(`${SERVER_ROOT_URI}/api/images`, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    })
    return res
  } catch (e) {
    console.error(e)
  }
}

const postProduct = async (token, params) => {
  try {
    const res = await axios.post(`${SERVER_ROOT_URI}/api/products`, params, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res
  } catch (e) {
    console.error(e)
  }
}

const sendImgToCloudVision = async (image) => {
  const url = `https://vision.googleapis.com/v1/images:annotate?key=${REACT_APP_VISION_API_KEY}`
  const data = {
    requests: [
      {
        features: [{ type: 'TEXT_DETECTION', maxResults: 1 }],
        image: { content: image },
        imageContext: { languageHints: ['ja', 'ru', 'ko', 'es', 'ar', 'de', 'pt', 'fr', 'zh', 'hi', 'pa', 'uk', 'fa'] },
      },
    ],
  }

  try {
    const res = await axios.post(url, data, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })

    return res.data.responses[0].textAnnotations[0]
  } catch (e) {
    console.error(e)
  }
}

const addAnswer = async (token, params) => {
  try {
    const res = await axios.put(`${SERVER_ROOT_URI}/api/products/answer`, params, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res
  } catch (e) {
    console.error(e)
  }
}

const addUniqQuestion = async (token, params) => {
  try {
    const res = await axios.put(`${SERVER_ROOT_URI}/api/products/question`, params, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res
  } catch (e) {
    console.error(e)
  }
}

const updateHighlight = async (token, params) => {
  try {
    const res = await axios.put(`${SERVER_ROOT_URI}/api/products/highlight`, params, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res
  } catch (e) {
    console.error(e)
  }
}

const updateReview = async (params) => {
  try {
    const token = await SecureStore.getItemAsync('token')
    const res = await axios.put(`${SERVER_ROOT_URI}/api/products/review`, params, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res
  } catch (e) {
    console.error(e)
  }
}

export {
  fetchProductById,
  fetchProductsByGroup,
  fetchProductsByUserId,
  fetchProductsByFavoredUserId,
  sendImgToCloudVision,
  postImage,
  postProduct,
  addAnswer,
  addUniqQuestion,
  updateHighlight,
  updateReview,
}
