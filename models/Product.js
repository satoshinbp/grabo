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
  userId: { type: ObjectId }, //shall be required once autheintication gets ready
  description: { type: String, required: true, trim: true },
  report: { type: reportSchema, default: () => ({}) },
})

const productSchema = new Schema(
  {
    images: {
      type: [
        {
          url: { type: String, required: true },
          report: { type: reportSchema, default: () => ({}) },
        },
      ],
      required: true,
    },
    userId: { type: ObjectId }, //shall be required once autheintication gets ready
    group: { type: String, required: true },
    keywords: {
      type: [{ type: String, required: true, trim: true }],
      default: [],
    },
    fixedQandAs: {
      type: [
        {
          question: { type: String, required: true, trim: true },
          answers: { type: [uniqCommentSchema], default: [] },
          highlightedBy: [ObjectId],
        },
      ],
      required: true,
    },
    uniqQandAs: {
      type: [
        {
          question: { type: uniqCommentSchema, required: true },
          answers: { type: [uniqCommentSchema], default: [] },
          highlightedBy: [ObjectId],
        },
      ],
      default: [],
    },
    favoredUserIds: { type: [ObjectId], default: [] },
  },
  { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)
module.exports = Product
