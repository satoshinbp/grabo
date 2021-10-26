const User = require('../models/User')

const createUser = (req, res) => {
  // implement later
  console.log('User was successfully created! ')
}

const updateUser = (req, res) => {
  User.updateOne({ name: 'Dean Noris' }, { $set: { groups: req.groups } })
}

module.exports = { createUser, updateUser }
