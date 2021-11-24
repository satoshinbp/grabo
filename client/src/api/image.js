import axios from 'axios'
import { SERVER_ROOT_URI, REACT_APP_VISION_API_KEY } from '@env'
import groups from '../utils/groups'
// SERVER_ROOT_URI might not work depends on dev environment
// In that case, replace SERVER_ROOT_URI to "http://<your network IP address>:<PORT>"

const postImage = async (token, params) => {
  await axios.post(`http://54.202.13.134/api/images`, params, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  })
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

export { getOcrText, postImage }
