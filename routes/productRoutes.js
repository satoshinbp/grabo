const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

router.get('/api/products', productController.getProducts)
router.get('/api/product/:id', productController.getProductById)
router.post('/api/product', productController.createProduct)

module.exports = router
