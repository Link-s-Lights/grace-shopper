const router = require('express').Router()
const isAuthorized = require('./gatekeeper')
const {Order, ShippingAddress} = require('../db/models')
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

// TODO: destructure req.body
// TODO: create productOrder associations *create/use utility functions
router.post('/', async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body)
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
