const Product = require('../models/Product')

const getProducts = (req, res) => {
  Product.find()
    .then((result) => res.send(result))
    .catch((e) => console.error(e))
}

const getProductById = (req, res) => {
  Product.findById(req.params.id)
    .then((result) => res.send(result))
    .catch((e) => console.error(e))
}

const getProductsByGroup = (req, res) => {
  Product.find({ group: req.params.group })
    .then((result) => res.send(result))
    .catch((e) => console.error(e))
}

const getProductsByUserId = (req, res) => {
  Product.find({ userId: req.params.id })
    .then((result) => res.send(result))
    .catch((e) => console.error(e))
}

const getProductsByFavoredUserId = (req, res) => {
  Product.find({ favoredUserIds: { $in: [req.params.id] } })
    .then((result) => res.send(result))
    .catch((e) => console.error(e))
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
      highlightedBy: req.body.highlitedQuestions.includes(index) ? [req.body.userId] : [],
    })),

    uniqQandAs: req.body.uniqQuestions.map((uniqQuestion, index) => ({
      question: {
        description: uniqQuestion,
      },
      highlightedBy: uniqQuestion ? [req.body.userId] : [],
    })),
  }

  Product.create(params)
    .then((result) => res.send(result))
    .catch((e) => console.error(e))
}

const addAnswer = (req, res) => {
  Product.findOne({
    _id: req.body.docId,
  }).then((product) => {
    product.fixedQandAs[req.body.questionIndex].answers.push(req.body.answer)
    product.fixedQandAs[req.body.questionIndex].highlightedBy = []
    product.markModified('fixedQandAs')
    product
      .save()
      .then((result) => {
        res.send(result)
      })
      .catch((error) => console.log(error))
  })
}

const updateReview = async (req, res) => {
  let targetProduct = await Product.findOne({ 'fixedQandAs._id': req.body.target.fixedQandAsId })
  let targetreport = await targetProduct.fixedQandAs[req.body.target.fixedquestionIndex].answers[
    req.body.target.answerIndex
  ].report

  req.body.reportKeys.forEach((reportKey) => {
    targetreport[reportKey] += 1
  })

  await targetProduct
    .save()
    .then((result) => {
      res.send(result)
    })
    .catch((error) => res.send(error))
}

module.exports = {
  getProducts,
  getProductById,
  getProductsByGroup,
  getProductsByUserId,
  getProductsByFavoredUserId,
  createProduct,
  addAnswer,
  updateReview,
}
