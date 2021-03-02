const Sequelize = require('sequelize')
const db = require('../db')

const ProductAttribute = db.define('productAttribute', {
  value: {
    type: Sequelize.STRING
  }
})

module.exports = ProductAttribute
