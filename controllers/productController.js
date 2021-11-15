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

const addAnswer = (req, res) => {
  Product.findOne({
    _id: req.params.id,
  }).then((product) => {
    if (req.body.isUniqQuestion) {
      product.uniqQandAs[req.body.questionIndex].answers.push(req.body.answer)
      product.uniqQandAs[req.body.questionIndex].highlightedBy = []
      product.markModified('uniqQandAs')
    } else {
      product.fixedQandAs[req.body.questionIndex].answers.push(req.body.answer)
      product.fixedQandAs[req.body.questionIndex].highlightedBy = []
      product.markModified('fixedQandAs')
    }
    product
      .save()
      .then((result) => res.send(result))
      .catch((e) => console.error(e))
  })
}

const addUniqQuestion = (req, res) => {
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

const updateHighlight = (req, res) => {
  Product.findOne({
    _id: req.params.id,
  }).then((product) => {
    if (req.body.isHighlighted) {
      if (req.body.isUniqQuestion) {
        const newHighlightArray = product.uniqQandAs[req.body.questionIndex].highlightedBy.filter((userId) => {
          return userId.toString() !== req.body.userId
        })
        product.markModified('uniqQandAs')
        product.uniqQandAs[req.body.questionIndex].highlightedBy = newHighlightArray
      } else {
        const newHighlightArray = product.fixedQandAs[req.body.questionIndex].highlightedBy.filter((userId) => {
          return userId.toString() !== req.body.userId
        })
        product.markModified('fixedQandAs')
        product.fixedQandAs[req.body.questionIndex].highlightedBy = newHighlightArray
      }
    } else {
      if (req.body.isUniqQuestion) {
        product.markModified('uniqQandAs')
        product.uniqQandAs[req.body.questionIndex].highlightedBy.push(req.body.userId)
      } else {
        product.markModified('fixedQandAs')
        product.fixedQandAs[req.body.questionIndex].highlightedBy.push(req.body.userId)
      }
    }
    product
      .save()
      .then((result) => res.send(result))
      .catch((e) => console.error(e))
  })
}

const updateFavorite = (req, res) => {
  Product.findOne({
    _id: req.params.id,
  }).then((product) => {
    if (req.body.isFavored) {
      const newFavoredArray = product.favoredUserIds.filter((userId) => {
        return userId.toString() !== req.body.userId
      })
      product.favoredUserIds = newFavoredArray
    } else {
      product.favoredUserIds.push(req.body.userId)
    }
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
  addAnswer,
  addUniqQuestion,
  updateHighlight,
  updateFavorite,
  updateReport,
}
