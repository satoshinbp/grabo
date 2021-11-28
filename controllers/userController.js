const User = require('../models/User')

const getCurrentUser = (req, res) => res.status(200).send(req.user)

const getUsersByGroup = async (req, res) => {
  try {
    const users = User.find({ groups: { $in: req.params.group } })
    res.status(200).send(users)
  } catch (e) {
    res.status(400).send()
  }
}

const updateUser = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.params.id })
    const updates = Object.keys(req.body)

    updates.forEach((update) => {
      if (update !== 'notifications') {
        user[update] = req.body[update]
      } else {
        user.notifications.push(req.body.notifications)
      }
    })

    const updatedUser = await user.save()
    res.status(200).send(updatedUser)
  } catch (e) {
    res.status(400).send()
  }
}

const readNotification = async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.body.id }, { notifications: 1 })

    user.notifications.forEach((notification) => {
      if (notification._id === req.body.notificationId) {
        notification.read = true
      }
    })

    const updatedUser = await user.save()
    res.status(200).send(updatedUser)
  } catch {
    res.status(400).send()
  }
}

const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => token !== req.token)

    await req.user.save()
    res.status(200).send()
  } catch (e) {
    res.status(400).send()
  }
}

module.exports = { getCurrentUser, getUsersByGroup, updateUser, logout, readNotification }
