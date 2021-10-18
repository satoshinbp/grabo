const Product = require('../models/Product')

const getProduct = (req, res, next) => {
  Product.find()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = { getProduct }
