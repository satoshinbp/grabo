import axios from 'axios'
import { API_URL, REACT_APP_VISION_API_KEY } from '@env'

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

const postImage = async (params) => {
  try {
    const res = await axios.post(`${API_URL}/images`, params, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return res
  } catch (err) {
    throw err
  }
}

export { sendImgToCloudVision, postImage }
