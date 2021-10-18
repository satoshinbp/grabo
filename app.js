require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
require('./services/passport')
const authRoutes = require('./routes/authRoutes')
const ProductTest = require('./models/ProductTest')
const Product = require('./models/Product')

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB!')
  })
  .catch((err) => {
    console.log(err)
  })

const app = express()

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(authRoutes)

app.get('/api/product', (req, res) => {
  const product = new Product({
    img: {
      url: ['https://www.lays.com/sites/lays.com/files/2020-11/lays-Classic-small.jpg'],
      report: { wrong: 0, affiliate: 10, threats: 1, privacy: 9 },
    },
    lang: 'Japanese',
    keywords: ['salty', 'tasty', 'potato chips', 'crispy', 'fried'],
    fixedQuestions: [
      {
        question: {
          title: 'What is the name of this product?',
          report: { wrong: 0, affiliate: 10, threats: 1, privacy: 9 },
        },
        answers: [
          {
            userID: '987654321',
            value: 'Lays potato chips',
            report: { wrong: 0, affiliate: 10, threats: 1, privacy: 9 },
          },
        ],
        highlighted: ['3456789', '890123'],
      },
      {
        question: {
          title: 'Who is the maker of this product?',
          report: { wrong: 0, affiliate: 10, threats: 1, privacy: 9 },
        },
        answers: [
          { userID: '123456789', value: 'Frito-Lay', report: { wrong: 0, affiliate: 10, threats: 1, privacy: 9 } },
        ],
        highlighted: ['3456789', '890123'],
      },
      {
        question: {
          title: 'What is the taste of this product?',
          report: { wrong: 0, affiliate: 10, threats: 1, privacy: 9 },
        },
        answers: [
          {
            userID: '123456789',
            value: 'Salty and a bit sweet!',
            report: { wrong: 0, affiliate: 10, threats: 1, privacy: 9 },
          },
        ],
        highlighted: ['3456789', '890123'],
      },
      {
        question: {
          title: 'What is this product used for?',
          report: { wrong: 0, affiliate: 10, threats: 1, privacy: 9 },
        },
        answers: [
          { userID: '123456789', value: 'Snacks', report: { wrong: 0, affiliate: 10, threats: 1, privacy: 9 } },
        ],
        highlighted: ['3456789', '890123'],
      },
      {
        question: {
          title: 'Please review this product.',
          report: { wrong: 0, affiliate: 10, threats: 1, privacy: 9 },
        },
        answers: [
          {
            userID: '123456789',
            value: 'I this lays chips are most crispy and thinly sliced. I always go for lightly salted.',
            report: { wrong: 0, affiliate: 10, threats: 1, privacy: 9 },
          },
        ],
        highlighted: ['3456789', '890123'],
      },
    ],
    uniqueQuestions: [
      {
        question: { userID: '567890', value: 'Which flavour do you reccomend?' },
        answers: [{ userID: '123456789', value: 'BBQ!', report: { wrong: 0, affiliate: 10, threats: 1, privacy: 9 } }],
        highlighted: ['3456789', '890123'],
      },
    ],
  })

  product
    .save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log('err')
    })
})

module.exports = app
