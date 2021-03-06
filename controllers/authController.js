require('dotenv').config()
const { OAuth2Client } = require('google-auth-library')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const generateAuthToken = async (user) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)

  user.tokens.push(token)
  await user.save()

  return token
}

const client = new OAuth2Client()
const verifyGoogleIdToken = async (idToken) => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: [process.env.GOOGLE_ANDROID_CLIENT_ID, process.env.GOOGLE_IOS_CLIENT_ID],
  })
  const payload = ticket.getPayload()
  const googleId = payload['sub']
  const firstName = payload['given_name']
  const lastName = payload['family_name']
  const email = payload['email']
  const image = payload['picture']
  return { googleId, firstName, lastName, email, image }
}

const signInWithGoogle = async (req, res) => {
  try {
    const { googleId, firstName, lastName, email, image } = await verifyGoogleIdToken(req.body.idToken)
    let user = await User.findOne({ googleId })

    if (!user) {
      user = new User({ googleId, firstName, lastName, email, image })
    }

    const token = await generateAuthToken(user)
    res.status(200).send({ token, user })
  } catch (e) {
    res.status(400).send()
  }
}

module.exports = { signInWithGoogle }
