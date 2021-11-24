const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

router.get('/', productController.getProducts)
router.get('/:id', productController.getProductById)
router.get('/group/:group', productController.getProductsByGroup)
router.get('/user/:id', productController.getProductsByUserId)
router.get('/fav/user/:id', productController.getProductsByFavoredUserId)

router.post('/', productController.createProduct)
router.post('/:id/favor', productController.createUserToFavorite)
router.delete('/:id/favor/:userId', productController.removeUserFromFavorite)
router.post('/:id/questions/:type', productController.createQuestion)
router.post('/:id/questions/:type/:index/answers', productController.createAnswer)
router.put('/:id/questions/:type/:index/reports', productController.createReportToQuestion)
router.put('/:id/questions/:type/:questionIndex/answers/:answerIndex/reports', productController.createReportToAnswer)
router.post('/:id/questions/:type/:index/highlight', productController.createUserToHighlight)
router.delete('/:id/questions/:type/:index/highlight/:userId', productController.removeUserFromHighlight)

module.exports = router
