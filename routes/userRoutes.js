const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/', userController.getCurrentUser)
router.get('/:id', userController.getUserById)
router.patch('/:id', userController.updateUser)
router.post('/logout', userController.logout)

module.exports = router
