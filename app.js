require('dotenv').config()

const mongoose = require('mongoose')
const uri = process.env.MONGO_URI
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB!'))
  .catch((err) => console.log(err))

const express = require('express')
const app = express()
const userRoutes = require('./routes/userRoutes')
app.use('/', userRoutes)

module.exports = app
