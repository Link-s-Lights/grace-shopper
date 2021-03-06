const router = require('express').Router()
const isAuthorized = require('./gatekeeper')
const {Order, ShippingAddress, OrderProduct, Product} = require('../db/models')
module.exports = router

// Hot fix for route, added /all to denote getting all orders which would require admin access
// TODO: include productOrder associations
router.get('/all', isAuthorized, async (req, res, next) => {
  try {
    const orders = await Order.findAll({include: ShippingAddress})
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

// TODO: include productOrder associations
router.get('/', async (req, res, next) => {
  try {
    if (req.user.type === 'user') {
      const orders = await Order.findAll({
        where: {
          userId: req.user.id
        },
        include: ShippingAddress
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
    console.log('in cart router')
    if (req.user.type === 'user') {
      const [cart, newCart] = await Order.findOrCreate({
        where: {
          userId: req.user.id,
          status: 'cart'
        }
      })
      // console.log('cart attained, is new: ', newCart)
      if (!newCart) await OrderProduct.destroy({where: {orderId: cart.id}})
      // console.log('destroyed old cart lineItems')
      const lineItems = req.body.lineItems.map(item => {
        return {orderId: cart.id, productId: item.id, qty: item.qty}
      })
      // console.log('created lineItems array')
      await OrderProduct.bulkCreate(lineItems)
      // console.log('orderProducts created')
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
      if (product.stock <= 0) {
        console.error('OUT OF STOCK', product.name)
        outOfStock = true
        cart.status = 'cart'
      }
    })
    if (outOfStock === false) {
      Promise.all(
        cart.products.forEach(product => {
          product.decrement('stock', {by: 1})
        })
      )
    }
    cart.status = 'shipped'
    cart.status = 'cart'
    res.send(cart.products)
  } catch (err) {
    console.log(err)
  }
})

// TODO: destructure req.body
// TODO: create productOrder associations *create/use utility functions
router.post('/', async (req, res, next) => {
  try {
    const {status, tax, shippingCost, discountCode, discountAmt} = req.body
    const newOrder = await Order.create({
      status,
      tax,
      shippingCost,
      discountCode,
      discountAmt
    })
    newOrder.setUser(req.user)
    newOrder.setShippingAddress(req.body.shippingAddress)
    res.json(newOrder)
  } catch (err) {
    next(err)
  }
})

// TODO: include productOrder associations
router.get('/:id', async (req, res, next) => {
  try {
    if (req.user.id) {
      const order = await Order.findOne({
        where: {
          id: req.params.id,
          userId: req.user.id
        },
        include: ShippingAddress
      })
      res.json(order)
    } else {
      res.sendStatus(401)
    }
  } catch (err) {
    next(err)
  }
})

// TODO: destructure req.body
// TODO: make productOrder associations editable
router.put('/:id', async (req, res, next) => {
  try {
    const [numberOfAffectedRows, affectedRows] = await Order.update(
      {
        ...req.body
      },
      {
        where: {id: req.params.id},
        returning: true,
        plain: true
      }
    )
    const updatedOrder = affectedRows[0]
    updatedOrder.setShippingAddress(req.body.shippingAddress)
    numberOfAffectedRows ? res.json(...affectedRows) : res.sendStatus(304)
  } catch (err) {
    next(err)
  }
})
