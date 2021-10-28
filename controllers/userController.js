const User = require('../models/User')

const getCurrentUser = async (req, res) => res.send(req.user)

const updateUser = (req, res) => {
  // WIP
  return console.log('User was successfully updated! ')
}

const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => token !== req.token)
    await req.user.save()

    res.send()
  } catch (e) {
    res.status(500).send()
  }
}

module.exports = { getCurrentUser, getUserById, updateUser, logout }
