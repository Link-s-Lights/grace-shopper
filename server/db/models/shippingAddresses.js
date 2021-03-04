const Sequelize = require('sequelize')
const db = require('../db')

const ShippingAddress = db.define('shippingAddress', {
  default: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  line1: {
    allowNull: false,
    type: Sequelize.STRING
  },
  line2: {
    type: Sequelize.STRING
  },
  city: {
    allowNull: false,
    type: Sequelize.STRING
  },
  state: {
    allowNull: false,
    type: Sequelize.STRING
  },
  zip: {
    allowNull: false,
    type: Sequelize.STRING
  }
})

module.exports = ShippingAddress
