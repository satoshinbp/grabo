const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 8000
const uri = process.env.MONGO_URI

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log('connected to db'))
  .catch((err) => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})
