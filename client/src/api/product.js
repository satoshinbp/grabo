import axios from 'axios'
import { SERVER_ROOT_URI, REACT_APP_VISION_API_KEY } from '@env'
import groups from '../utils/groups'
// SERVER_ROOT_URI might not work depends on dev environment
// In that case, replace SERVER_ROOT_URI to "<your network IP address>:<PORT>""

const fetchProductById = async (token, id) => {
  try {
    const { data } = await axios.get(`http://192.168.1.65:8000/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data
  } catch (e) {
    console.error(e)
  }
}

const fetchProductsByGroup = async (token, code) => {
  try {
    const { data } = await axios.get(`http://192.168.1.65:8000/api/products/group/${code}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data
  } catch (e) {
    console.error(e)
  }
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
  try {
    const { data } = await axios.get(`http://192.168.1.65:8000/api/products/fav/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data
  } catch (e) {
    console.error(e)
  }
}

const postImage = async (token, params) => {
  try {
    const res = await axios.post(`http://192.168.1.65:8000/api/images`, params, {
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
    const res = await axios.post(`http://192.168.1.65:8000/api/products`, params, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res
  } catch (e) {
    console.error(e)
  }
}

const getOcrText = async (image) => {
  const url = `https://vision.googleapis.com/v1/images:annotate?key=${REACT_APP_VISION_API_KEY}`
  const params = {
    requests: [
      {
        features: [{ type: 'TEXT_DETECTION', maxResults: 1 }],
        image: { content: image },
        imageContext: { languageHints: groups.map((group) => group.code) },
      },
    ],
  }

  const { data } = await axios.post(url, params, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  if (!data.responses[0].textAnnotations) throw new Error()

  const locale = data.responses[0].textAnnotations[0].locale
  const descriptions = data.responses[0].textAnnotations
    .filter((_, index) => index !== 0)
    .map((annotation) => annotation.description)

  return { locale, descriptions }
}

const addAnswerForFixedQuestion = async (token, id, params) => {
  try {
    const { data } = await axios.put(`http://192.168.1.65:8000/api/products/${id}/fixedquestion/answer`, params, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data
  } catch (e) {
    console.error(e)
  }
}

const addAnswerForUniqQuestion = async (token, id, params) => {
  try {
    const { data } = await axios.put(`http://192.168.1.65:8000/api/products/${id}/uniqquestion/answer`, params, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data
  } catch (e) {
    console.error(e)
  }
}

const addUniqQuestion = async (token, id, params) => {
  try {
    const { data } = await axios.put(`http://192.168.1.65:8000/api/products/${id}/question`, params, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data
  } catch (e) {
    console.error(e)
  }
}

const addUserToFixedQnHighlight = async (token, id, params) => {
  try {
    console.log(params)
    const { data } = await axios.put(`http://192.168.1.65:8000/api/products/${id}/question/fixed/highlight`, params, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data
  } catch (e) {
    console.error(e)
  }
}

const addUserToUniqQnHighlight = async (token, id, params) => {
  try {
    const { data } = await axios.put(`http://192.168.1.65:8000/api/products/${id}/question/uniq/highlight`, params, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data
  } catch (e) {
    console.error(e)
  }
}

const removeUserFromFixedQnHighlight = async (token, id, params) => {
  try {
    const { data } = await axios.put(`http://192.168.1.65:8000/api/products/${id}/question/fixed/unhighlight`, params, {
      headers: { Authorization: `Bearer ${token}` },
    })
    console.log(data)
    return data
  } catch (e) {
    console.error(e)
  }
}

const removeUserFromUniqQnHighlight = async (token, id, params) => {
  try {
    const { data } = await axios.put(`http://192.168.1.65:8000/api/products/${id}/question/uniq/unhighlight`, params, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data
  } catch (e) {
    console.error(e)
  }
}

const updateFavorite = async (token, id, params) => {
  try {
    const { data } = await axios.put(`http://192.168.1.65:8000/api/products/${id}/favorite`, params, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data
  } catch (e) {
    console.error(e)
  }
}

const updateReport = async (token, params) => {
  try {
    const res = await axios.put(`http://192.168.1.65:8000/api/products/report`, params, {
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
  getOcrText,
  // searchProducts,
  postImage,
  postProduct,
  addAnswerForFixedQuestion,
  addAnswerForUniqQuestion,
  addUniqQuestion,
  addUserToFixedQnHighlight,
  addUserToUniqQnHighlight,
  removeUserFromFixedQnHighlight,
  removeUserFromUniqQnHighlight,
  updateFavorite,
  updateReport,
}
