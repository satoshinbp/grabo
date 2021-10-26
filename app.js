// Authentication to be done after Json's class, currently commented out

require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
// const cookieSession = require('cookie-session')
// const passport = require('passport')
// require('./services/passport')
// const authRoutes = require('./routes/authRoutes')
const imageRoutes = require('./routes/imageRoutes')
const productRoutes = require('./routes/productRoutes')
const cors = require('cors')

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.log(err))

const app = express()
app.use(express.json())
app.use(cors())

// app.use(
//   cookieSession({
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//     keys: [process.env.COOKIE_KEY],
//   })
// )
// app.use(passport.initialize())
// app.use(passport.session())

// app.use(authRoutes)
app.use('/images', imageRoutes)
app.use('/products', productRoutes)

module.exports = app
