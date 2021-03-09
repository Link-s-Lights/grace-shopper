const router = require('express').Router()
const isAuthorized = require('./gatekeeper')
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
