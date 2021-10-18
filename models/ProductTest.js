const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const productTestSchema = new Schema(
  {
    img: { url: [String], report: { wrong: Number, affiliate: Number, threats: Number, privacy: Number } },
    lang: String,
    keywords: [String],
    fixedQuestions: [
      {
        question: { title: String, report: { wrong: Number, affiliate: Number, threats: Number, privacy: Number } },
        answers: [
          {
            userID: String,
            value: String,
            report: { wrong: Number, affiliate: Number, threats: Number, privacy: Number },
          },
        ],
        highlighted: [String],
      },
    ],
    uniqueQuestions: [
      {
        question: { userID: String, value: String },
        answers: [
          {
            userID: String,
            value: String,
            report: { wrong: Number, affiliate: Number, threats: Number, privacy: Number },
          },
        ],
        highlighted: [String],
      },
    ],
  },
  { timestamps: true }
)

const ProductTest = mongoose.model('productTest', productTestSchema)
module.exports = ProductTest

// list: wrong/ affiliate/ threats/ privacy/
