require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const imageRoutes = require('./routes/imageRoutes')
const productRoutes = require('./routes/productRoutes')
const auth = require('./middleware/auth')

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB!'))
  .catch((e) => console.error(e))

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api', auth) // apply auth middleware under routes '/api'
app.use('/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/images', imageRoutes)
app.use('/api/products', productRoutes)

module.exports = app
