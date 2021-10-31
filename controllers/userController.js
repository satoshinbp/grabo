const User = require('../models/User')

const updateUser = async (req, res) => {
  let user = await User.findOne({ _id: `${req.body.user_id}` })
  const updates = Object.keys(req.body)
  updates.forEach((update) => (user[update] = req.body[update]))

  await user
    .save()
    .then((result) => {
      res.send(result)
    })
    .catch((error) => res.send(error))
}

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
