const router = require('express').Router()
const {
  User,
  Order,
  OrderProduct,
  ShippingAddress,
  Product
} = require('../db/models')
const {Op} = require('sequelize')
module.exports = router

router.get('/orders', async (req, res, next) => {
  try {
    if (req.user.type === 'user') {
      const orders = await Order.findAll({
        where: {
          userId: req.user.id,
          status: {[Op.ne]: 'cart'}
        },
        include: [ShippingAddress, Product]
      })
      res.json(orders)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/cart', async (req, res, next) => {
  try {
    if (req.user.type === 'user') {
      const [cart, created] = await Order.findOrCreate({
        where: {
          userId: req.user.id,
          status: 'cart'
        },
        include: Product
      })
      if (created) {
        res.json({lineItems: []})
      } else {
        const lineItems = cart.products.map(product => ({
          id: product.id,
          name: product.name,
          qty: product.orderProduct.qty,
          price: product.price,
          stock: product.stock
        }))
        res.json({lineItems})
      }
    } else {
      res.json(null) //send empty if not user, should never be called
    }
  } catch (err) {
    next(err)
  }
})

router.put('/cart', async (req, res, next) => {
  try {
    if (req.user.type === 'user') {
      const [cart, newCart] = await Order.findOrCreate({
        where: {
          userId: req.user.id,
          status: 'cart'
        }
      })
      if (!newCart) await OrderProduct.destroy({where: {orderId: cart.id}})
      const lineItems = req.body.lineItems.map(item => {
        return {orderId: cart.id, productId: item.id, qty: item.qty}
      })
      await OrderProduct.bulkCreate(lineItems)
      res.sendStatus(200)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/checkout', async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        userId: req.user.id,
        status: 'cart'
      },
      include: Product
    })
    cart.status = 'pending'
    let outOfStock = false
    cart.products.forEach(product => {
      if (product.stock <= product.orderProduct.qty) {
        console.error('NOT ENOUGH STOCK', product.name)
        res.sendStatus(500)
        outOfStock = true
        cart.status = 'cart'
      }
    })
    if (outOfStock === false) {
      await Promise.all(
        cart.products.map(product => {
          const productQty = product.orderProduct.qty
          product.decrement('stock', {by: productQty})
          product.orderProduct.subtotal = productQty * product.price
          product.orderProduct.save()
        })
      )
    }
    cart.tax =
      cart.products.reduce(
        (subTotal, product) => subTotal + product.orderProduct.subtotal,
        0
      ) * 0.0875
    cart.shippingAddressId = req.user.shippingAddresses[0].id
    cart.status = 'shipped'
    await cart.save()
    res.send(cart)
  } catch (err) {
    console.log(err)
  }
})
