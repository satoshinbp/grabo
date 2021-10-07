const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const userSchema = new Schema(
  {
    googleId: String,
    credits: { type: Number, default: 0 },
    name: {
      type: String,
      required: true,
    },
    email: String,
    googleID: String,
    lang: [String],
    favProducts: [ObjectId],
    myProducts: [ObjectId],
    notifications: [
      {
        read: Boolean,
        message: String,
      },
    ],
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)
module.exports = User
