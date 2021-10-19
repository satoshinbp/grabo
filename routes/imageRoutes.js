const express = require('express')
const router = express.Router()
const imageController = require('../controllers/imageController')

router.post('/api/image', imageController.upload.array('image', 3), imageController.uploadImage)

module.exports = router
