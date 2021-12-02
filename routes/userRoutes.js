const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/', userController.getCurrentUser)
router.get('/highlight/:id', userController.getUserById)
router.get('/:group', userController.getUsersByGroup)
router.post('/logout', userController.logout)
router.patch('/:id', userController.updateUser)
router.get('/:userId/notification/:notificationId', userController.readNotification)

module.exports = router
