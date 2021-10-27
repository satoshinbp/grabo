const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

router.get('/', productController.getProducts)
router.get('/group/:group', productController.getProductsByGroup)
router.get(':id', productController.getProductById)
router.get('/user/:id', productController.getProductsByUserId)
router.post('/', productController.createProduct)

module.exports = router
