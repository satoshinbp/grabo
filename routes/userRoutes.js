const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/users', userController.findAll)
router.get('/user/:userId', userController.findOne)
router.post('/user', userController.addOne)

module.exports = router
