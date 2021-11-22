const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

router.get('/', productController.getProducts)
router.get('/:id', productController.getProductById)
router.get('/group/:group', productController.getProductsByGroup)
router.get('/user/:id', productController.getProductsByUserId)
router.get('/fav/user/:id', productController.getProductsByFavoredUserId)

router.post('/', productController.createProduct)
router.post('/:id/question/uniq', productController.createQuestionUniq)
router.post('/:id/question/fixed/:index/answer', productController.createAnswerFixed)
router.post('/:id/question/uniq/:index/answer', productController.createAnswerUniq)
router.put('/:id/question/fixed/:questionIndex/answer/:answerIndex', productController.createReportFixed)
router.put('/:id/question/uniq/:questionIndex/answer/:answerIndex', productController.createReportUniq)

router.post('/:id/question/fixed/highlight', productController.createUserToHighlightFixed)
router.post('/:id/question/uniq/highlight', productController.createUserToHighlightUniq)
router.delete('/:id/question/fixed/:index/highlight/:userId', productController.removeUserFromHighlightFixed)
router.delete('/:id/question/uniq/:index/highlight/:userId', productController.removeUserFromHighlightUniq)

router.post('/:id/favor', productController.createUserToFavorite)
router.delete('/:id/favor/:userId', productController.removeUserFromFavorite)

module.exports = router
