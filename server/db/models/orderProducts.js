const Sequelize = require('sequelize')
const db = require('../db')
const Product = require('./products')
const {convertToDollars, convertToPennies} = require('./utility')

const OrderProduct = db.define('orderProduct', {
  qty: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  subtotal: {
    type: Sequelize.INTEGER
  }
})

const generateSubtotal = async lineItem => {
  const productPricePerQty = await Product.findOne({
    where: {
      id: lineItem.productId
    },
    attributes: ['price']
  })
  lineItem.subtotal = convertToPennies(productPricePerQty * lineItem.qty)
}

OrderProduct.afterFind(lineItem => {
  lineItem.subtotal = convertToDollars(lineItem.subtotal)
})

OrderProduct.beforeValidate(lineItem => {
  generateSubtotal(lineItem)
})

OrderProduct.beforeBulkCreate(lineItems => {
  lineItems.forEach(lineItem => {
    generateSubtotal(lineItem)
  })
})

module.exports = OrderProduct
