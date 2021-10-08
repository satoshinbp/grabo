const getCurrentUser = (req, res) => {
  res.send(req.user)
}

const logout = (req, res) => {
  req.logout()
  res.redirect('/')
}

module.exports = { getCurrentUser, logout }
