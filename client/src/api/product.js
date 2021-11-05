import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import { SERVER_ROOT_URI, REACT_APP_VISION_API_KEY } from '@env'
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
  const { data } = await axios.get(`${SERVER_ROOT_URI}/api/products/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

const postImage = async (params) => {
  try {
    const token = await SecureStore.getItemAsync('token')
    const res = await axios.post(`${SERVER_ROOT_URI}/api/images`, params, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    })
    return res
  } catch (err) {
    throw err
  }
}

const postProduct = async (params) => {
  try {
    const token = await SecureStore.getItemAsync('token')
    const res = await axios.post(`${SERVER_ROOT_URI}/api/products`, params, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res
  } catch (err) {
    console.error(err)
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

  const res = await axios.post(url, data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  return res.data.responses[0].textAnnotations[0]
}

export { fetchProductById, fetchProductsByGroup, fetchProductsByUserId, sendImgToCloudVision, postImage, postProduct }
