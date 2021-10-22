const Product = require('../models/Product')

const getProducts = (req, res) => {
  Product.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err))
}

const getProductById = (req, res) => {
  console.log(req.params.id)
  Product.findById(req.params.id)
    .then((result) => res.send(result))
    .catch((err) => console.log(err))
}

const getProductsByGroup = (req, res) => {
  Product.find({ group: req.params.group })
    .then((result) => res.send(result))
    .catch((err) => console.log(err))
}

const createProduct = (req, res) => {
  Product.create(req.body)
    .then((result) => res.send(result))
    .catch((err) => console.log(err))
}

module.exports = { getProducts, getProductById, getProductsByGroup, createProduct }
