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
  const { userId, group, text: keywords, highlitedQuestions, uniqQuestions } = req.body

  const params = {
    userId,
    group,
    keywords,
    images: req.body.url.map((image) => ({ url: image })),
    fixedQandAs: fixedQuestions.map((question, index) => ({
      question,
      highlightedBy: highlitedQuestions.includes(index) ? [userId] : [],
    })),
    uniqQandAs: uniqQuestions.map((uniqQuestion) => ({
      question: { description: uniqQuestion },
      highlightedBy: uniqQuestion ? [userId] : [],
    })),
  }

  Product.create(params)
    .then((result) => res.send(result))
    .catch((e) => console.error(e))
}

const createUserToFavorite = (req, res) => {
  const { id } = req.params
  const { userId } = req.body

  Product.findOne({ _id: id }).then((product) => {
    product.favoredUserIds.push(userId)
    product
      .save()
      .then((result) => res.send(result))
      .catch((e) => console.error(e))
  })
}

const removeUserFromFavorite = (req, res) => {
  const { id, userId } = req.params

  Product.findOne({ _id: id }).then((product) => {
    product.favoredUserIds = product.favoredUserIds.filter((favoredUserId) => favoredUserId.toString() !== userId)
    product
      .save()
      .then((result) => res.send(result))
      .catch((e) => console.error(e))
  })
}

const createQuestion = (req, res) => {
  const { id } = req.params
  const questionType = req.params.type === 'fixed' ? 'fixedQandAs' : 'uniqQandAs'

  Product.findOne({ _id: id }).then((product) => {
    product[questionType].push(req.body)
    product.markModified(questionType)
    product
      .save()
      .then((result) => res.send(result))
      .catch((e) => console.error(e))
  })
}

const createAnswer = (req, res) => {
  const { id, index } = req.params
  const questionType = req.params.type === 'fixed' ? 'fixedQandAs' : 'uniqQandAs'

  Product.findOne({ _id: id }).then((product) => {
    product[questionType][index].answers.push(req.body)
    product[questionType][index].highlightedBy = []
    product.markModified(questionType)
    product
      .save()
      .then((result) => res.send(result))
      .catch((e) => console.error(e))
  })
}

const createReportToQuestion = (req, res) => {
  const { id, index } = req.params
  const questionType = req.params.type === 'fixed' ? 'fixedQandAs' : 'uniqQandAs'

  Product.findOne({ _id: id }).then((product) => {
    const updateReport = product[questionType][index].report
    req.body.forEach((reportKey) => {
      updateReport[reportKey] += 1
    })
    product
      .save()
      .then((result) => res.send(result))
      .catch((e) => res.send(e))
  })
}

const createReportToAnswer = (req, res) => {
  const { id, questionIndex, answerIndex } = req.params
  const questionType = req.params.type === 'fixed' ? 'fixedQandAs' : 'uniqQandAs'

  Product.findOne({
    _id: id,
  }).then((product) => {
    const updateReport = product[questionType][questionIndex].answers[answerIndex].report
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
  const { id, index } = req.params
  const questionType = req.params.type === 'fixed' ? 'fixedQandAs' : 'uniqQandAs'
  const { userId } = req.body

  Product.findOne({ _id: id }).then((product) => {
    product[questionType][index].highlightedBy.push(userId)
    product.markModified(questionType)
    product
      .save()
      .then((result) => res.send(result))
      .catch((e) => console.error(e))
  })
}

const removeUserFromHighlight = (req, res) => {
  const { id, index, userId } = req.params
  const questionType = req.params.type === 'fixed' ? 'fixedQandAs' : 'uniqQandAs'

  Product.findOne({ _id: id }).then((product) => {
    product[questionType][index].highlightedBy = product[questionType][index].highlightedBy.filter(
      (highlightedUserId) => highlightedUserId.toString() !== userId
    )
    product.markModified(questionType)
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
  createUserToFavorite,
  removeUserFromFavorite,
  createQuestion,
  createAnswer,
  createReportToQuestion,
  createReportToAnswer,
  createUserToHighlight,
  removeUserFromHighlight,
}
