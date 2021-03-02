const User = require('./user')
const Attribute = require('./attributes')
const OrderProduct = require('./orderProducts')
const Order = require('./orders')
const ProductAttribute = require('./productAttributes')
const ProductGroup = require('./productGroups')
const Product = require('./products')
const ShippingAddress = require('./shippingAddresses')
const Variation = require('./variation')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
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
