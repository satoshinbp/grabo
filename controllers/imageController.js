require('dotenv').config()
const AWS = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'grabo1',
    metadata: (_, file, cb) => cb(null, { fieldName: file.fieldname }),
    key: (_, _, cb) => cb(null, Date.now().toString()),
  }),
})

const uploadImage = (req, res) => {
  console.log('Image successfully uploaded')
  res.send('Image successfully uploaded')
}

module.exports = { upload, uploadImage }
