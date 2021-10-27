const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const reportSchema = new Schema({
  wrong: { type: Number, default: 0 },
  affiliate: { type: Number, default: 0 },
  threats: { type: Number, default: 0 },
  privacy: { type: Number, default: 0 },
})

const uniqCommentSchema = new Schema({
  userId: { type: ObjectId, required: true },
  description: { type: String, required: true, trim: true },
  report: { type: reportSchema, required: true },
})

const productSchema = new Schema(
  {
    images: {
      type: [
        {
          url: { type: String, required: true },
          report: { type: reportSchema, required: true },
        },
      ],
      required: true,
    },
    userId: { type: ObjectId, required: true },
    group: { type: String, required: true },
    keywords: {
      type: [{ type: String, required: true, trim: true }],
      default: [],
    },
    fixedQandAs: [
      {
        question: {
          type: {
            description: { type: String, required: true, trim: true },
            report: { type: reportSchema, required: true },
          },
          default: [],
        },
        answers: { type: [uniqCommentSchema], default: [] },
        highlightedBy: [ObjectId],
      },
    ],
    uniqQandAs: [
      {
        question: { type: uniqCommentSchema, default: [] },
        answers: { type: [uniqCommentSchema], default: [] },
        highlightedBy: [ObjectId],
      },
    ],
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)
module.exports = Product
