const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const userSchema = new Schema(
  {
    googleId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    image: String,
    groups: { type: [String], default: [] },
    favProducts: { type: [ObjectId], default: [] },
    notifications: { type: [{ read: Boolean, message: String }], default: [] },
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)
module.exports = User
