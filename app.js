require('dotenv').config()

const express = require('express')
const app = express()

const uri = process.env.MONGO_URI
const mongoose = require('mongoose')
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.log(err))

const userRoutes = require('./routes/userRoutes')
app.use('/api', userRoutes)

module.exports = app
