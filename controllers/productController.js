const Product = require('../models/Product')

const getProducts = (req, res) => {
  Product.find()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
}

const getProductById = (req, res) => {
  Product.findById(req.params.id)
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
}

const createProduct = (req, res) => {
  Product.create(req.body)
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err)
    })
}

module.exports = { getProducts, getProductById, createProduct }
