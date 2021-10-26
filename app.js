require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
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

// const verifyToken = (token) =>
//   new Promise((resolve, reject) => {
//     jwt.verify(token, 'secrethere@123', (err, payload) => {
//       if (err) return reject(err)
//       resolve(payload)
//     })
//   })

// const auth = async (req, res, next) => {
//   const authHeader = req.headers['authorization']
//   if (!authHeader) return res.status(401).send({ message: "didn't find any token in the header" })

//   const token = authHeader && authHeader.split('Bearer ')[1]
//   if (!token) return res.status(401).send({ message: "probably you didn't send the token in the header" })

//   let payload
//   try {
//     payload = await verifyToken(token)
//   } catch (e) {
//     return res.status(401).send({ message: 'token is either expired or not valid' })
//   }

//   const user = await User.findById(payload.id)
//   if (!user) return res.status(401).end()
//   req.user = user
//   next()
// }

// app.use('/api', auth) // apply auth middleware under routes '/api'
app.use('/', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/images', imageRoutes)
app.use('/api/products', productRoutes)

module.exports = app
