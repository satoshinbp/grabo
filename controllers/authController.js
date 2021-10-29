require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const generateToken = async (user) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)

  user.tokens.push(token)
  await user.save()

  return token
}

const signInWithgoogle = async (req, res) => {
  try {
    let user = await User.findOne({ googleId: req.body.googleId })

    if (!user) {
      user = new User(req.body)
    }

    const token = await generateToken(user)
    res.send({ token, user }) // token to be stored in secure storage or app storage
  } catch (e) {
    console.error('Failed to fetch user')
    throw new Error(e.message)
  }
}

module.exports = { signInWithgoogle }
