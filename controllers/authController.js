require('dotenv').config()
const axios = require('axios')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const redirectUri = 'auth/google/callback'

const getGoogleAuthUrl = () => {
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
  return `${rootUrl}?${params.toString()}`
}

const authenticateWithGoogle = async (req, res) => res.redirect(getGoogleAuthUrl())

const getTokensWithGoogle = ({ code, clientId, clientSecret, redirectUri }) => {
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

const generateToken = (user) => jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '10d' })

const authorizeWithGoogle = async (req, res) => {
  const code = req.query.code
  const { id_token, access_token } = await getTokensWithGoogle({
    code,
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

    const googleUser = response.data
    let user = await User.findOne({ googleId: googleUser.id })
    if (!user) {
      const newUser = new User({
        googleId: googleUser.id,
        name: googleUser.given_name + ' ' + googleUser.family_name,
        email: googleUser.email,
        image: googleUser.picture,
      })
      user = await newUser.save()
    }

    const token = generateToken(user)
    res.cookie(process.env.COOKIE_NAME, token, {
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

const logout = (req, res) => {
  req.logout()
  res.redirect('/')
}

module.exports = { authenticateWithGoogle, authorizeWithGoogle, logout }
