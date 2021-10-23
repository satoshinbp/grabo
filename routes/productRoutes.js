const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

router.get('/', productController.getProducts)
router.get('/group/:group', productController.getProductsByGroup)
router.get('/document/:id', productController.getProductById)
router.get('/user/:userID', productController.getProductsByUserId) // userId already used in getProductsByUserId
router.post('/', productController.createProduct)

module.exports = router
