const Sequelize = require('sequelize')
const db = require('../db')
const OrderProduct = require('./orderProducts')
const {convertToDollars, convertToPennies} = require('./utility')

const TAX_RATE = 0.7
const SHIPPING_RATE = 0.0
const DISCOUNT_RATE = 0.0

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM,
    values: ['cart', 'processing', 'shipped', 'delivered', 'cancelled'],
    defaultValue: 'cart'
  },
  tax: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  shippingCost: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  discountCode: {
    type: Sequelize.STRING
  },
  discountAmt: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

// Instance Methods

Order.prototype.getProductSubtotal = async () => {
  const productSubtotals = await OrderProduct.findAll({
    where: {orderId: this.id}
  })
  const productSubtotal = productSubtotals.reduce((acc, val) => acc + val)
  return productSubtotal
}

Order.prototype.calculateAdditionalTotals = productSubtotal => {
  this.tax = Math.floor(productSubtotal * TAX_RATE)
  this.shippingCost = Math.floor(productSubtotal * SHIPPING_RATE)
  this.discountAmt = Math.floor(productSubtotal * DISCOUNT_RATE)
}

Order.prototype.getTotalCost = async () => {
  const productSubtotal = await this.getProductSubtotal()
  this.calculateAdditionalTotals(productSubtotal)
  return productSubtotal + this.tax + this.shipping + this.discountAmt
}

// Hooks

Order.afterFind(order => {
  if (order) {
    order.tax = convertToDollars(order.tax)
    order.shippingCost = convertToDollars(order.shippingCost)
    order.discountAmt = convertToDollars(order.discountAmt)
  }
})

Order.beforeValidate(order => {
  console.log('in beforeValidate Order hook')
  console.log('order: ', order)
  if (order) {
    order.tax = convertToPennies(order.tax)
    order.shippingCost = convertToPennies(order.shippingCost)
    order.discountAmt = convertToPennies(order.discountAmt)
  }
  console.log('exiting hook')
})

Order.beforeBulkCreate(orders => {
  orders.forEach(order => {
    order.tax = convertToPennies(order.tax)
    order.shippingCost = convertToPennies(order.shippingCost)
    order.discountAmt = convertToPennies(order.discountAmt)
  })
})

module.exports = Order
