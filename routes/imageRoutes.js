const express = require('express')
const router = express.Router()
const imageController = require('../controllers/imageController')

router.post('/', imageController.upload.array('image', 3), imageController.uploadImage)

module.exports = router
