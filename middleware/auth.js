require('dotenv').config()
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = mongoose.model('User')

const auth = async (req, res, next) => {
  console.log(req.header('Authorization'))
  const token = req.header('Authorization').replace('Bearer ', '')
  console.log(token)
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  try {
    const user = await User.findOne({ _id: decoded._id, tokens: { $in: [token] } })

    if (!user) throw new Error()

    req.token = token
    req.user = user
    next()
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' })
  }
}

module.exports = auth
