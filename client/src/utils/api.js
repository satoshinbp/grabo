import axios from 'axios'
import { API_URL, REACT_APP_VISION_API_KEY } from '@env'
import products from '../mocks/products'

const sendImgToCloudVision = async (image) => {
  const url = `https://vision.googleapis.com/v1/images:annotate?key=${REACT_APP_VISION_API_KEY}`
  const data = {
    requests: [
      {
        features: [{ type: 'TEXT_DETECTION', maxResults: 1 }],
        image: { content: image },
        imageContext: { languageHints: ['ja', 'ko', 'fr', 'zh', 'hi', 'pa', 'uk', 'fa'] },
      },
    ],
  }

  const res = await axios.post(url, data, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  console.log('Text Detection Result: ', res.data.responses[0].textAnnotations[0])
  return res.data.responses[0].textAnnotations[0].description
}

const fetchProductsByGroup = (group) => {
  // const url = `${API_URL}/<api>`
  // const res = await axios.get(url)
  // return res.data

  return products.filter((product) => product.group === group)
}

export { sendImgToCloudVision, fetchProductsByGroup }
