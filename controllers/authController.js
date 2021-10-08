const login = (req, res) => {
  res.send(req.user)
  res.redirect('/')
}

const getCurrentUser = (req, res) => {
  res.send(req.user)
}

const logout = (req, res) => {
  req.logout()
  res.redirect('/')
}

module.exports = { getCurrentUser, login, logout }
