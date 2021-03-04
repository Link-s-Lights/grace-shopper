const User = require('./user')
const Attribute = require('./attributes')
const OrderProduct = require('./orderProducts')
const Order = require('./orders')
const ProductAttribute = require('./productAttributes')
const ProductGroup = require('./productGroups')
const Product = require('./products')
const ShippingAddress = require('./shippingAddresses')
const Variation = require('./variation')

User.hasMany(ShippingAddress)
ShippingAddress.belongsTo(User)
User.hasMany(Order)
Order.belongsTo(User)
Order.hasOne(ShippingAddress)
Order.belongsToMany(Product, {through: OrderProduct})
Product.belongsToMany(Order, {through: OrderProduct})
Attribute.belongsToMany(Product, {through: ProductAttribute})
Product.belongsToMany(Attribute, {through: ProductAttribute})
Variation.belongsToMany(Product, {through: ProductGroup})
Product.belongsToMany(Variation, {through: ProductGroup})

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
