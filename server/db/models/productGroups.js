const db = require('../db')
const Sequelize = require('sequelize')

const ProductGroup = db.define('productGroup', {
  description: {
    type: Sequelize.STRING
  }
})

module.exports = ProductGroup
