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

const getProductsByFavoredUserId = (req, res) => {
  Product.find({ favoredUserIds: { $in: [req.params.id] } })
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
      highlightedBy: req.body.highlitedQuestion.includes(index) ? [] : [],
    })),

    uniqQandAs: [
      {
        question: {
          description: req.body.uniqQuestion,
        },
        highlightedBy: req.body.uniqQuestion ? [] : [],
      },
    ],
  }

  Product.create(params)
    .then((result) => res.send(result))
    .catch((err) => console.log(err))
}

/*const addAnswer = (req, res) => {
  console.log('req.body', req.body)
  Product.updateOne(
    { _id: req.body.docId, 'fixedQandAs.question': fixedQuestions[req.body.questionIndex] },
    {
      $push: {
        'fixedQandAs.$.answers': {
          userId: req.user._id,
          description: req.body.answer.description,
          report: {
            wrong: 0,
            affiliate: 0,
            threats: 0,
            privacy: 0,
          },
        },
      },
    }
  )
    .then((result) => res.send(result))
    .catch((err) => console.log(err))
}*/

const addAnswer = async (req, res) => {
  let product = await Product.findOne({
    _id: req.body.docId,
  })
  product.fixedQandAs[req.body.questionIndex].answers.push(req.body.answer)
  console.log('answer', product.fixedQandAs[0].answers)
  product.markModified('fixedQandAs.answer')
  console.log(product.markModified('fixedQandAs.answers'))
  //const updates =  // answerまでのパス
  // console.log(updates) 中身： [ 'docId', 'answer', 'questionIndex' ]
  // 下の例だと、product.docId product.answerみたいになってupdateされる
  //updates.forEach((update) => (product[update] = req.body[update]))
  await product
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
}
