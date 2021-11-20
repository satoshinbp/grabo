const User = require('../models/User')

const getCurrentUser = async (req, res) => res.send(req.user)

const getUsersByGroup = (req, res) => {
  User.find({ groups: { $in: req.params.group } })
    .then((result) => res.send(result))
    .catch((e) => console.error(e))
}

const updateUser = async (req, res) => {
  let user = await User.findOne({ _id: req.params.id })
  const updates = Object.keys(req.body)

  updates.forEach((update) => {
    if (update !== 'notifications') {
      user[update] = req.body[update]
    } else {
      user.notifications.push(req.body.notifications)
    }
  })

  await user
    .save()
    .then((result) => res.send(result))
    .catch((error) => res.send(error))
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

module.exports = { getCurrentUser, getUsersByGroup, updateUser, logout }
