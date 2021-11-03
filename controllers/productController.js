const Product = require('../models/Product')

const getProducts = (req, res) => {
  Product.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err))
}

const getProductById = (req, res) => {
  Product.findById(req.params.id)
    .then((result) => res.send(result))
    .catch((err) => console.log(err))
}

const getProductsByGroup = (req, res) => {
  Product.find({ group: req.params.group })
    .then((result) => res.send(result))
    .catch((err) => console.log(err))
}

const getProductsByUserId = (req, res) => {
  Product.find({ userId: req.params.id })
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
}

const fixedQuestions = [
  'What is the name of this product?',
  'Who is the maker of this product?',
  'What is the taste of this product?',
  'What is this product used for?',
  'Please review this product.',
]

const createProduct = (req, res) => {
  // console.log('This is req body' + JSON.stringify(req.body))

  const params = {
    userId: req.body.userId,
    group: req.body.code,
    keywords: req.body.text,
    // userId, // userId shall be provided once autheintication gets ready
    images: req.body.url.map((image, index) => ({
      url: image,
    })),

    fixedQandAs: fixedQuestions.map((question, index) => ({
      question: question,
      highlightedBy: req.body.highlitedQuestion.includes(index) ? [req.body.userId] : [],
    })),

    uniqQandAs: [
      {
        question: {
          description: req.body.uniqQuestion,
        },
        highlightedBy: req.body.uniqQuestion ? [req.body.userId] : [],
      },
    ],
  }

  Product.create(params)
    .then((result) => res.send(result))
    .catch((err) => console.log(err))
}

module.exports = { getProducts, getProductById, getProductsByGroup, getProductsByUserId, createProduct }
