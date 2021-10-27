const User = require('../models/User')

const createUser = (req, res) => {
  // implement later
  console.log('User was successfully created! ')
}

const updateUser = (req, res) => {
  console.log('req', req.body)
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
}

module.exports = { createUser, updateUser }
