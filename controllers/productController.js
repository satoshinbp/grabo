const Product = require('../models/Product')

const getProducts = (req, res) => {
  Product.find()
    .then((result) => res.status(200).send(result))
    .catch((e) => res.status(400).send())
}

const getProductById = (req, res) => {
  Product.findById(req.params.id)
    .then((result) => res.status(200).send(result))
    .catch((e) => res.status(400).send())
}

const getProductsByGroup = (req, res) => {
  Product.find({ group: req.params.group })
    .then((result) => res.status(200).send(result))
    .catch((e) => res.status(400).send())
}

const getProductsByUserId = (req, res) => {
  Product.find({ userId: req.params.id })
    .then((result) => res.status(200).send(result))
    .catch((e) => res.status(400).send())
}

const getProductsByFavoredUserId = (req, res) => {
  Product.find({ favoredUserIds: { $in: [req.params.id] } })
    .then((result) => res.status(200).send(result))
    .catch((e) => res.status(400).send())
}

const fixedQuestions = [
  'What is the name of this product?',
  'Who is the maker of this product?',
  'What is the taste of this product?',
  'What is this product used for?',
  'Please review this product.',
]

const createProduct = (req, res) => {
  const { userId, code: group, text: keywords, urls, highlitedQuestions, uniqQuestions } = req.body

  const product = {
    userId,
    group,
    keywords,
    images: urls.map((url) => ({ url })),
    fixedQandAs: fixedQuestions.map((question, index) => ({
      question,
      highlightedBy: highlitedQuestions.includes(index) ? [userId] : [],
    })),
    uniqQandAs: uniqQuestions.map((uniqQuestion) => ({
      question: { description: uniqQuestion, userId },
      highlightedBy: uniqQuestion ? [userId] : [],
    })),
  }

  Product.create(product)
    .then((result) => res.status(200).send(result))
    .catch((e) => res.status(400).send())
}

const createUserToFavorite = (req, res) => {
  const { id } = req.params
  const { userId } = req.body

  Product.findById(id)
    .then((product) => {
      product.favoredUserIds.push(userId)
      product
        .save()
        .then((result) => res.status(200).send(result))
        .catch((e) => res.status(400).send())
    })
    .catch((e) => res.status(400).send())
}

const removeUserFromFavorite = (req, res) => {
  const { id, userId } = req.params

  Product.findById(id)
    .then((product) => {
      product.favoredUserIds = product.favoredUserIds.filter((favoredUserId) => favoredUserId.toString() !== userId)
      product
        .save()
        .then((result) => res.status(200).send(result))
        .catch((e) => res.status(400).send())
    })
    .catch((e) => res.status(400).send())
}

const createQuestion = (req, res) => {
  const { id } = req.params
  const questionType = req.params.type === 'fixed' ? 'fixedQandAs' : 'uniq' ? 'uniqQandAs' : null

  Product.findById(id)
    .then((product) => {
      product[questionType].push(req.body)
      product.markModified(questionType)
      product
        .save()
        .then((result) => res.status(200).send(result))
        .catch((e) => res.status(400).send())
    })
    .catch((e) => res.status(400).send())
}

const createAnswer = (req, res) => {
  const { id } = req.params
  const questionType = req.params.type === 'fixed' ? 'fixedQandAs' : 'uniq' ? 'uniqQandAs' : null
  const query = { [`${questionType}._id`]: id }

  Product.findOne(query)
    .then((product) => {
      const question = product[questionType].find((question) => question._id.toString() === id)
      question.answers.push(req.body)
      question.highlightedBy = []
      product.markModified(questionType)
      product
        .save()
        .then((result) => res.status(200).send(result))
        .catch((e) => res.status(400).send())
    })
    .catch((e) => res.status(400).send())
}

const createReportToQuestion = (req, res) => {
  const { id } = req.params
  const questionType = req.params.type === 'fixed' ? 'fixedQandAs' : 'uniq' ? 'uniqQandAs' : null
  const query = { [`${questionType}._id`]: id }

  Product.findOne(query)
    .then((product) => {
      const report = product[questionType].find((question) => question._id.toString() === id).report
      req.body.forEach((reportKey) => {
        report[reportKey] += 1
      })
      product
        .save()
        .then((result) => res.status(200).send(result))
        .catch((e) => res.status(400).send())
    })
    .catch((e) => res.status(400).send())
}

const createReportToAnswer = (req, res) => {
  const { questionId, answerId } = req.params
  const questionType = req.params.type === 'fixed' ? 'fixedQandAs' : 'uniq' ? 'uniqQandAs' : null
  const query = { [`${questionType}._id`]: questionId }

  Product.findOne(query)
    .then((product) => {
      const report = product[questionType]
        .find((question) => question._id.toString() === questionId)
        .answers.find((answer) => answer._id.toString() === answerId).report
      req.body.forEach((reportKey) => {
        report[reportKey] += 1
      })
      product
        .save()
        .then((result) => res.status(200).send(result))
        .catch((e) => res.status(400).send())
    })
    .catch((e) => res.status(400).send())
}

const createUserToHighlight = (req, res) => {
  const { id } = req.params
  const questionType = req.params.type === 'fixed' ? 'fixedQandAs' : 'uniq' ? 'uniqQandAs' : null
  const { userId } = req.body
  const query = { [`${questionType}._id`]: id }

  Product.findOne(query).then((product) => {
    const question = product[questionType].find((question) => question._id.toString() === id)
    question.highlightedBy.push(userId)
    product.markModified(questionType)
    product
      .save()
      .then((result) => res.status(200).send(result))
      .catch((e) => res.status(400).send())
  })
}

const removeUserFromHighlight = (req, res) => {
  const { id, userId } = req.params
  const questionType = req.params.type === 'fixed' ? 'fixedQandAs' : 'uniq' ? 'uniqQandAs' : null
  const query = { [`${questionType}._id`]: id }

  Product.findOne(query)
    .then((product) => {
      const question = product[questionType].find((question) => question._id.toString() === id)
      question.highlightedBy = question.highlightedBy.filter(
        (highlightedUserId) => highlightedUserId.toString() !== userId
      )
      product.markModified(questionType)
      product
        .save()
        .then((result) => res.status(200).send(result))
        .catch((e) => res.status(400).send())
    })
    .catch((e) => res.status(400).send())
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
