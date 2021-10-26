const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.get('/auth/google', authController.authenticateWithGoogle)
router.get('/auth/google/callback', authController.authorizeWithGoogle)
router.get('/api/logout', authController.logout)

module.exports = router
