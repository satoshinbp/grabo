const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/', userController.getCurrentUser)
router.get('/:group', userController.getUsersByGroup)
router.post('/logout', userController.logout)
router.patch('/:id', userController.updateUser)
router.patch('/:userId/notification/:notificationId', userController.readNotification)

module.exports = router
