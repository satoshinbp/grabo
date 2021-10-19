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
    fixedQandA: [
      {
        question: {
          title: { type: String, required: true },
          report: { wrong: Number, affiliate: Number, threats: Number, privacy: Number },
        },
        answers: [
          {
            userId: { type: String, required: true },
            value: { type: String, required: true },
            report: { wrong: Number, affiliate: Number, threats: Number, privacy: Number },
          },
        ],
        highlightedBy: [String],
      },
    ],
    uniqueQandA: [
      {
        question: { userId: { type: String, required: true }, value: { type: String, required: true } },
        answers: [
          {
            userId: { type: String, required: true },
            value: { type: String, required: true },
            report: { wrong: Number, affiliate: Number, threats: Number, privacy: Number },
          },
        ],
        highlightedBy: [String],
      },
    ],
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)
module.exports = Product
