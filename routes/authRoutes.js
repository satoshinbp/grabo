const express = require('express')
const router = express.Router()
const passport = require('passport')
const authController = require('../controllers/authController')

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/auth/google/callback', passport.authenticate('google'))
router.get('/api/logout', authController.logout)
router.get('/api/current_user', authController.getCurrentUser)

module.exports = router
