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

const createUniqQuestion = (req, res) => {
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

const createAnswerToFixedQuestion = (req, res) => {
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

const createAnswerToUniqQuestion = (req, res) => {
  console.log(req.params.id)
  console.log(req.params.index)
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

const createUserToFixedQuestionHighlight = (req, res) => {
  Product.findOne({
    _id: req.params.id,
  }).then((product) => {
    product.markModified('fixedQandAs')
    product.fixedQandAs[req.body.questionIndex].highlightedBy.push(req.body.userId)
    product
      .save()
      .then((result) => res.send(result))
      .catch((e) => console.error(e))
  })
}

const createUserToUniqQuestionHighlight = (req, res) => {
  Product.findOne({
    _id: req.params.id,
  }).then((product) => {
    product.markModified('uniqQandAs')
    product.uniqQandAs[req.body.questionIndex].highlightedBy.push(req.body.userId)
    product
      .save()
      .then((result) => res.send(result))
      .catch((e) => console.error(e))
  })
}

const removeUserFromFixedQuestionHighlight = (req, res) => {
  Product.findOne({
    _id: req.params.id,
  }).then((product) => {
    const newHighlightArray = product.fixedQandAs[req.params.index].highlightedBy.filter((userId) => {
      return userId.toString() !== req.params.userId
    })
    product.markModified('fixedQandAs')
    product.fixedQandAs[req.params.index].highlightedBy = newHighlightArray
    product
      .save()
      .then((result) => res.send(result))
      .catch((e) => console.error(e))
  })
}

const removeUserFromUniqQuestionHighlight = (req, res) => {
  Product.findOne({
    _id: req.params.id,
  }).then((product) => {
    const newHighlightArray = product.uniqQandAs[req.params.index].highlightedBy.filter((userId) => {
      return userId.toString() !== req.params.userId
    })
    product.markModified('uniqQandAs')
    product.uniqQandAs[req.params.index].highlightedBy = newHighlightArray
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

const updateReport = async (req, res) => {
  let targetProduct = await Product.findOne({
    _id: req.body.target.QandAsId,
  })

  let targetreport = await targetProduct[req.body.target.type === 'uniq' ? 'uniqQandAs' : 'fixedQandAs'][
    req.body.target.questionIndex
  ].answers[req.body.target.answerIndex].report

  req.body.reportKeys.forEach((reportKey) => {
    targetreport[reportKey] += 1
  })

  await targetProduct
    .save()
    .then((result) => res.send(result))
    .catch((e) => res.send(e))
}

module.exports = {
  getProducts,
  getProductById,
  getProductsByGroup,
  getProductsByUserId,
  getProductsByFavoredUserId,
  createProduct,
  createAnswerToFixedQuestion,
  createAnswerToUniqQuestion,
  createUniqQuestion,
  createUserToFixedQuestionHighlight,
  createUserToUniqQuestionHighlight,
  removeUserFromFixedQuestionHighlight,
  removeUserFromUniqQuestionHighlight,
  createUserToFavorite,
  removeUserFromFavorite,
  updateReport,
}
