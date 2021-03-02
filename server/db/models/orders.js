const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    defaultValue: 'cart',
    validate: {
      isIn: [['cart', 'processing', 'shipped', 'delivered', 'cancelled']]
    }
  },
  totalPrice: {
    type: Sequelize.FLOAT
  },
  subTotal: {
    type: Sequelize.FLOAT
  },
  tax: {
    type: Sequelize.FLOAT
  },
  shippingCost: {
    type: Sequelize.FLOAT
  },
  discountCode: {
    type: Sequelize.STRING
  },
  discountAmt: {
    type: Sequelize.FLOAT
  }
})

module.exports = Order
