import axios from 'axios'
import { REACT_APP_VISION_API_KEY } from '@env'

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

  const res = await axios({
    url,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    data,
  })

  console.log('Text Detection Result: ', res.data.responses[0].textAnnotations[0])
  return res.data.responses[0].textAnnotations[0].description
}

export { sendImgToCloudVision }
