const logout = (req, res) => {
  req.logout()
  res.redirect('/')
}

const getCurrentUser = (req, res) => {
  res.send(req.user)
}

module.exports = { logout, getCurrentUser }
