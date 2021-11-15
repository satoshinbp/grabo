const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    googleId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, required: true },
    groups: { type: [String], default: [] },
    notifications: {
      type: [
        {
          read: { type: Boolean, required: true },
          message: { type: String, required: true },
        },
      ],
      default: [],
    },
    tokens: { type: [String], required: true },
    notificationToken: String,
    isNotificationOn: { type: Boolean, default: false },
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)
module.exports = User
