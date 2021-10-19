const AWS = require('aws-sdk')
const multer = require('multer')
var multerS3 = require('multer-s3')

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESSKEYID,
  secretAccessKey: process.env.S3_SECRETACCESSKEY,
})

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'grabo1',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname })
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    },
  }),
})

const uploadImage = (req, res) => {
  console.log('Successfull')
  res.send('Successfully uploaded ')
}

module.exports = { upload, uploadImage }
