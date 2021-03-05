const Sequelize = require('sequelize')
const db = require('../db')
const {convertToDollars, convertToPennies} = require('./utility')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  stock: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  imageUrl: {
    type: Sequelize.TEXT
  }
})

// Hooks

Product.afterFind(result => {
  if (Array.isArray(result)) {
    result.forEach(product => {
      product.price = convertToDollars(product.price)
    })
  } else {
    result.price = convertToDollars(result.price)
  }
})

Product.beforeValidate(product => {
  product.price = convertToPennies(product.price)
})

Product.beforeBulkCreate(products => {
  products.forEach(product => {
    product.price = convertToPennies(product.price)
  })
})

module.exports = Product
