require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
// const cookieSession = require('cookie-session');
const passport = require('passport')
require('./services/passport')
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')

const uri = process.env.MONGO_URI
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.log(err))

const app = express()

// app.use(passport.initialize())
// app.use(passport.session())

app.use(userRoutes)
app.use(authRoutes)

module.exports = app
