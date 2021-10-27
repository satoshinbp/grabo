require('dotenv').config()
const jwt = require('jsonwebtoken')
const axios = require('axios')
const User = require('../models/User')

const redirectUri = 'auth/google/callback'

const googleAuth = (req, res) => {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
  const params = new URLSearchParams({
    redirect_uri: `${process.env.SERVER_ROOT_URI}/${redirectUri}`,
    client_id: process.env.GOOGLE_CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'].join(
      ' '
    ),
  })

  res.redirect(`${rootUrl}?${params.toString()}`)
}

const getTokens = ({ code, clientId, clientSecret, redirectUri }) => {
  const url = 'https://oauth2.googleapis.com/token'
  const params = new URLSearchParams({
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code',
  })

  return axios
    .post(url, params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then((res) => res.data)
    .catch((error) => {
      console.error(`Failed to fetch auth tokens`)
      throw new Error(error.message)
    })
}

const generateToken = async (user) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)

  user.tokens.push(token)
  await user.save()

  return token
}

const googleAuthCallback = async (req, res) => {
  const { id_token, access_token } = await getTokens({
    code: req.query.code,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    redirectUri: `${process.env.SERVER_ROOT_URI}/${redirectUri}`,
  })
  const url = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${id_token}`,
      },
    })
    const profile = response.data
    let user = await User.findOne({ googleId: profile.id })

    if (!user) {
      user = new User({
        googleId: profile.id,
        name: profile.given_name + ' ' + profile.family_name,
        email: profile.email,
        image: profile.picture,
      })
    }

    const token = await generateToken(user)

    // below code is WIP
    // need to decide where to store token in client side
    res.cookie('token', token, {
      maxAge: 900000,
      httpOnly: true,
      secure: false,
    })
    res.redirect(process.env.CLIENT_ROOT_URI)
  } catch (err) {
    console.error('Failed to fetch user')
    throw new Error(err.message)
  }
}

module.exports = { googleAuth, googleAuthCallback }
