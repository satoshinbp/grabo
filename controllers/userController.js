const User = require('../models/User')

const createUser = (req, res) => {
  // implement later
  console.log('User was successfully created! ')
}

const updateUser = (req, res) => {
  
  // _id will be replaced by req.body.id
  User.updateOne(
    { _id: '6177a6880ff9181090432c78' },
    {
      name: req.body.name,
      groups: req.body.groups,
      notification: req.body.notification,
      favProducts: req.body.favProducts,
    }
  )
    .then((result) => {
      res.send(result)
    })
    .catch((error) => res.send(error))

const getCurrentUser = async (req, res) => res.send(req.user)

const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => token !== req.token)
    await req.user.save()

    res.send()
  } catch (e) {
    res.status(500).send()
  }
}

module.exports = { getCurrentUser, updateUser, logout }
