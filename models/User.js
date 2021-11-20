const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    googleId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, required: true },
    groups: { type: [String], default: [] },
    notifications: {
      type: [
        {
          read: { type: Boolean, required: true },
          message: { type: String, required: true },
          //productid
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
