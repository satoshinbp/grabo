const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/api/users', userController.findAll)
router.get('/api/user/:userId', userController.findOne)
router.post('/api/user', userController.addOne)

module.exports = router
