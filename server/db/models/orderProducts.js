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

  lineItem.subtotal = convertToPennies(productPricePerQty.price * lineItem.qty)
  console.log(
    'lineItem subtotal for id: ',
    lineItem.productId,
    'subtotal: ',
    lineItem.subtotal
  )
}

OrderProduct.afterFind(lineItem => {
  lineItem.subtotal = convertToDollars(lineItem.subtotal)
})

// OrderProduct.beforeValidate((lineItem) => {
//   generateSubtotal(lineItem)
// })

// OrderProduct.beforeBulkCreate((lineItems) => {
//   lineItems.forEach(async (lineItem) => {
//       await generateSubtotal(lineItem)
//     })
// })
// /**
//  * prices { 1: 4.75, 2: 7.54}
//  * product = []
//   productPrices = {}
//   products.forEach(product => productPrices[product.id] = product.price)
//   lineItems.forEach(lineItem => {lineItem.subtotal = lineItem.qty * productPrices[lineItem.id]})
//  */
// OrderProduct.afterBulkCreate( (lineItems) => {
//   console.log('after bulk create')
// })

module.exports = OrderProduct
