const User = require('./user')
const Attribute = require('./attributes')
const OrderProduct = require('./orderProducts')
const Order = require('./orders')
const ProductAttribute = require('./productAttributes')
const ProductGroup = require('./productGroups')
const Product = require('./products')
const ShippingAddress = require('./shippingAddresses')
const Variation = require('./variation')
const Sequelize = require('sequelize')

User.hasMany(ShippingAddress)
ShippingAddress.belongsTo(User)
User.hasMany(Order)
Order.belongsTo(User)
Order.belongsTo(ShippingAddress)
ShippingAddress.hasMany(Order)
Order.belongsToMany(Product, {through: OrderProduct})
Product.belongsToMany(Order, {through: OrderProduct})
Attribute.belongsToMany(Product, {through: ProductAttribute})
Product.belongsToMany(Attribute, {through: ProductAttribute})
Variation.belongsToMany(Product, {through: ProductGroup})
Product.belongsToMany(Variation, {through: ProductGroup})

Product.findWithQuery = query => {
  const Op = Sequelize.Op
  const {sortColumn, direction, keywords, page} = query
  const offset = (page - 1) * 10
  const limit = 10
  const order = [[sortColumn, direction]]

  if (keywords.length) {
    console.log('keywords: ', keywords)
    return Product.findAndCountAll({
      order,
      limit,
      offset,
      where: {
        name: {
          [Op.iLike]: {
            [Op.any]: `{%${keywords}%}`
          }
        }
      }
    })
  }
  return Product.findAndCountAll({
    order,
    limit,
    offset,
    include: [{model: Attribute}]
  })
}

module.exports = {
  User,
  Attribute,
  OrderProduct,
  Order,
  ProductAttribute,
  ProductGroup,
  Product,
  ShippingAddress,
  Variation
}
