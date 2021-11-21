const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

router.get('/', productController.getProducts)
router.get('/:id', productController.getProductById)
router.get('/group/:group', productController.getProductsByGroup)
router.get('/user/:id', productController.getProductsByUserId)
router.get('/fav/user/:id', productController.getProductsByFavoredUserId)

router.post('/', productController.createProduct)
router.post('/:id/question/uniq', productController.createUniqQuestion)
router.post('/:id/question/fixed/:index/answer', productController.createAnswerToFixedQuestion)
router.post('/:id/question/uniq/:index/answer', productController.createAnswerToUniqQuestion)

router.post('/:id/question/fixed/highlight', productController.createUserToFixedQuestionHighlight)
router.post('/:id/question/uniq/highlight', productController.createUserToUniqQuestionHighlight)
router.delete('/:id/question/fixed/:index/highlight/:userId', productController.removeUserFromFixedQuestionHighlight)
router.delete('/:id/question/uniq/:index/highlight/:userId', productController.removeUserFromUniqQuestionHighlight)

router.post('/:id/favor', productController.createUserToFavorite)
router.delete('/:id/favor/:userId', productController.removeUserFromFavorite)

router.put('/report', productController.updateReport)

module.exports = router
