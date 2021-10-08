const login = (req, res) => {
  res.send(req.user)
  // res.send('Successfully logged in with Google!')
}

const getCurrentUser = (req, res) => {
  res.send(req.user)
}

const logout = (req, res) => {
  req.logout()
  res.redirect('/')
}

module.exports = { getCurrentUser, login, logout }
