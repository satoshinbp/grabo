const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const productSchema = new Schema(
  {
    images: [
      {
        url: String,
        report: { wrong: Number, affiliate: Number, threats: Number, privacy: Number },
      },
    ],
    group: String,
    keywords: [String],
    fixedQandAs: [
      {
        question: {
          description: String,
          report: { wrong: Number, affiliate: Number, threats: Number, privacy: Number },
        },
        answers: [
          {
            userId: ObjectId,
            description: String,
            report: { wrong: Number, affiliate: Number, threats: Number, privacy: Number },
          },
        ],
        highlightedBy: [String],
      },
    ],
    uniqQandAs: [
      {
        question: {
          userId: ObjectId,
          description: String,
          report: { wrong: Number, affiliate: Number, threats: Number, privacy: Number },
        },
        answers: [
          {
            userId: ObjectId,
            description: String,
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
