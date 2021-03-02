const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('orderProduct', {
  qty: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
})

module.exports = OrderProduct
