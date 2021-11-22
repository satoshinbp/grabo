const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

router.get('/', productController.getProducts)
router.get('/:id', productController.getProductById)
router.get('/group/:group', productController.getProductsByGroup)
router.get('/user/:id', productController.getProductsByUserId)
router.get('/fav/user/:id', productController.getProductsByFavoredUserId)

router.post('/', productController.createProduct)
router.post('/:id/questions/uniq', productController.createQuestionUniq)
router.post('/:id/questions/fixed/:index/answers', productController.createAnswerFixed)
router.post('/:id/questions/uniq/:index/answers', productController.createAnswerUniq)
router.put('/:id/questions/uniq/:index/reports', productController.createReportUniqQn)
router.put('/:id/questions/fixed/:questionIndex/answers/:answerIndex/reports', productController.createReportFixedAns)
router.put('/:id/questions/uniq/:questionIndex/answers/:answerIndex/reports', productController.createReportUniqAns)

router.post('/:id/questions/fixed/:index/highlight', productController.createUserToHighlightFixed)
router.post('/:id/questions/uniq/:index/highlight', productController.createUserToHighlightUniq)
router.delete('/:id/questions/fixed/:index/highlight/:userId', productController.removeUserFromHighlightFixed)
router.delete('/:id/questions/uniq/:index/highlight/:userId', productController.removeUserFromHighlightUniq)

router.post('/:id/favor', productController.createUserToFavorite)
router.delete('/:id/favor/:userId', productController.removeUserFromFavorite)

module.exports = router
