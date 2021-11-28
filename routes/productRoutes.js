const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

router.get('/', productController.getProducts)
router.get('/:id', productController.getProductById)
router.get('/group/:group', productController.getProductsByGroup)
router.get('/user/:id', productController.getProductsByUserId)
router.get('/fav/user/:id', productController.getProductsByFavoredUserId)

router.post('/', productController.createProduct)
router.post('/:id/questions/:type', productController.createQuestion)
router.post('/questions/:type/:id/answers', productController.createAnswer)

router.put('/questions/:type/:id/reports', productController.createReportToQuestion)
router.put('/questions/:type/:questionId/answers/:answerId/reports', productController.createReportToAnswer)

router.post('/questions/:type/:id/highlight', productController.createUserToHighlight)
router.delete('/questions/:type/:id/highlight/:userId', productController.removeUserFromHighlight)

router.post('/:id/favor', productController.createUserToFavorite)
router.delete('/:id/favor/:userId', productController.removeUserFromFavorite)

module.exports = router
