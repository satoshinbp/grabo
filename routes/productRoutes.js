const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

router.get('/', productController.getProducts)
router.get('/id/:id', productController.getProductById)
router.get('/group/:group', productController.getProductsByGroup)
router.post('/', productController.createProduct)

module.exports = router
