const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

router.get('/', productController.getProducts)
router.get('/:id', productController.getProductById)
router.get('/group/:group', productController.getProductsByGroup)
router.get('/user/:id', productController.getProductsByUserId)
router.get('/fav/user/:id', productController.getProductsByFavoredUserId)
router.post('/', productController.createProduct)
router.put('/:id/answer', productController.addAnswer)
router.put('/:id/question', productController.addUniqQuestion)
router.put('/highlight', productController.updateHighlight)
router.put('/favorite', productController.updateFavorite)
router.put('/report', productController.updateReport)

module.exports = router
