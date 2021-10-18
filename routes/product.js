const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const productController = require('../controllers/product')

router.get('/api/product', productController.getProduct)

module.exports = router
