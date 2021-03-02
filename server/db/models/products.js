const Sequelize = require('sequelize')
const db = require('../db')

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
    type: Sequelize.FLOAT,
    allowNull: false
  },
  stock: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Product
