const User = require('../models/User')

const findAll = (req, res) => {
  User.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err))
}

const findOne = (req, res) => {
  User.findById(req.params.userId)
    .then((result) => res.send(result))
    .catch((err) => console.log(err))
}

const addOne = (req, res) => {
  const user = new User({
    name: 'Shinya Sato',
  })

  user
    .save()
    .then((result) => res.send(result))
    .catch((err) => console.log(err))
}

module.exports = { findAll, findOne, addOne }
