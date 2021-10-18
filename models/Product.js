const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const productSchema = new Schema(
  {
    img: {
      url: { type: [String], required: true },
      report: { wrong: Number, affiliate: Number, threats: Number, privacy: Number },
    },
    lang: String,
    keywords: [String],
    fixedQuestions: [
      {
        question: {
          title: { type: String, required: true },
          report: { wrong: Number, affiliate: Number, threats: Number, privacy: Number },
        },
        answers: [
          {
            userID: { type: String, required: true },
            value: { type: String, required: true },
            report: { wrong: Number, affiliate: Number, threats: Number, privacy: Number },
          },
        ],
        highlighted: [String],
      },
    ],
    uniqueQuestions: [
      {
        question: { userID: { type: String, required: true }, value: { type: String, required: true } },
        answers: [
          {
            userID: { type: String, required: true },
            value: { type: String, required: true },
            report: { wrong: Number, affiliate: Number, threats: Number, privacy: Number },
          },
        ],
        highlighted: [String],
      },
    ],
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)
module.exports = Product
