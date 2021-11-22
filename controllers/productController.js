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
  const params = {
    userId: req.body.userId,
    group: req.body.code,
    keywords: req.body.text,
    userId: req.body.userId,
    images: req.body.url.map((image, index) => ({
      url: image,
    })),

    fixedQandAs: fixedQuestions.map((question, index) => ({
      question: question,
      highlightedBy: req.body.highlitedQuestions.includes(index) ? [req.body.userId] : [],
    })),

    uniqQandAs: req.body.uniqQuestions.map((uniqQuestion) => ({
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

const createQuestionUniq = (req, res) => {
  Product.findOne({
    _id: req.params.id,
  }).then((product) => {
    product.markModified('uniqQandAs')
    product.uniqQandAs.push(req.body)

    product
      .save()
      .then((result) => res.send(result))
      .catch((e) => console.error(e))
  })
}

const createAnswerFixed = (req, res) => {
  Product.findOne({
    _id: req.params.id,
  }).then((product) => {
    product.fixedQandAs[req.params.index].answers.push(req.body)
    product.fixedQandAs[req.params.index].highlightedBy = []
    product.markModified('fixedQandAs')
    product
      .save()
      .then((result) => res.send(result))
      .catch((e) => console.error(e))
  })
}

const createAnswerUniq = (req, res) => {
  Product.findOne({
    _id: req.params.id,
  }).then((product) => {
    product.uniqQandAs[req.params.index].answers.push(req.body)
    product.uniqQandAs[req.params.index].highlightedBy = []
    product.markModified('uniqQandAs')
    product
      .save()
      .then((result) => res.send(result))
      .catch((e) => console.error(e))
  })
}

const createReportUniqQn = (req, res) => {
  Product.findOne({
    _id: req.params.id,
  }).then((product) => {
    const updateReport = product.fixedQandAs[req.params.index].report
    req.body.forEach((reportKey) => {
      updateReport[reportKey] += 1
    })
    product
      .save()
      .then((result) => res.send(result))
      .catch((e) => res.send(e))
  })
}

const createReportFixedAns = (req, res) => {
  Product.findOne({
    _id: req.params.id,
  }).then((product) => {
    const updateReport = product.fixedQandAs[req.params.questionIndex].answers[req.params.answerIndex].report
    req.body.forEach((reportKey) => {
      updateReport[reportKey] += 1
    })
    product
      .save()
      .then((result) => res.send(result))
      .catch((e) => res.send(e))
  })
}

const createReportUniqAns = (req, res) => {
  Product.findOne({
    _id: req.params.id,
  }).then((product) => {
    const updateReport = product.uniqQandAs[req.params.questionIndex].answers[req.params.answerIndex].report
    req.body.forEach((reportKey) => {
      updateReport[reportKey] += 1
    })
    product
      .save()
      .then((result) => res.send(result))
      .catch((e) => res.send(e))
  })
}

const createUserToHighlight = (req, res) => {
  const questionType = req.params.type === 'fixed' ? 'fixedQandAs' : 'uniqQandAs'
  Product.findOne({
    _id: req.params.id,
  }).then((product) => {
    product[questionType][req.params.index].highlightedBy.push(req.body.userId)
    product.markModified(questionType)
    product
      .save()
      .then((result) => res.send(result))
      .catch((e) => console.error(e))
  })
}

const removeUserFromHighlight = (req, res) => {
  const { id, index } = req.params
  const questionType = req.params.type === 'fixed' ? 'fixedQandAs' : 'uniqQandAs'

  Product.findOne({ _id: id }).then((product) => {
    product[questionType][index].highlightedBy = product[questionType][index].highlightedBy.filter(
      (userId) => userId.toString() !== req.params.userId
    )
    product.markModified(questionType)
    product
      .save()
      .then((result) => res.send(result))
      .catch((e) => console.error(e))
  })
}

const createUserToFavorite = (req, res) => {
  Product.findOne({
    _id: req.params.id,
  }).then((product) => {
    product.favoredUserIds.push(req.body.userId)
    product
      .save()
      .then((result) => res.send(result))
      .catch((e) => console.error(e))
  })
}

const removeUserFromFavorite = (req, res) => {
  Product.findOne({
    _id: req.params.id,
  }).then((product) => {
    const newFavoredArray = product.favoredUserIds.filter((userId) => {
      return userId.toString() !== req.params.userId
    })
    product.favoredUserIds = newFavoredArray
    product
      .save()
      .then((result) => res.send(result))
      .catch((e) => console.error(e))
  })
}

module.exports = {
  getProducts,
  getProductById,
  getProductsByGroup,
  getProductsByUserId,
  getProductsByFavoredUserId,
  createProduct,
  createQuestionUniq,
  createAnswerFixed,
  createAnswerUniq,
  createReportUniqQn,
  createReportFixedAns,
  createReportUniqAns,
  createUserToHighlight,
  removeUserFromHighlight,
  createUserToFavorite,
  removeUserFromFavorite,
}
