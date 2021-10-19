const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

router.get('/api/product', productController.getProduct)
router.get('/api/product/:id', productController.getProductById)

module.exports = router
