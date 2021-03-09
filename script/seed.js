'use strict'

const db = require('../server/db')
const {
  User,
  ShippingAddress,
  Product,
  Attribute,
  ProductAttribute,
  Order,
  OrderProduct
} = require('../server/db/models')

const userSeed = require('../seedfiles/users')
const addressSeed = require('../seedfiles/shippingAddresses')
const productSeed = require('../seedfiles/products')
const attributeSeed = require('../seedfiles/attributes')
const productAttSeed = require('../seedfiles/productAttributes')
const orderSeed = require('../seedfiles/orders')
const orderProductSeed = require('../seedfiles/orderProduct')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await User.bulkCreate(userSeed)
  console.log(`seeded ${users.length} users`)
  const shippingAddresses = await ShippingAddress.bulkCreate(addressSeed)
  console.log(`seeded ${shippingAddresses.length} addresses`)
  const products = await Product.bulkCreate(productSeed)
  console.log(`seeded ${products.length} products`)
  const attributes = await Attribute.bulkCreate(attributeSeed)
  console.log(`seeded ${attributes.length} attributes`)
  const productAttributes = await ProductAttribute.bulkCreate(productAttSeed)
  console.log(`seeded ${productAttributes.length} product attributes`)
  const orders = await Order.bulkCreate(orderSeed)
  console.log(`seeded ${orders.length} attributes`)
  const orderProducts = await OrderProduct.bulkCreate(orderProductSeed)
  console.log(`seeded ${orderProducts.length} product attributes`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
