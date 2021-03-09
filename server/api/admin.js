const router = require('express').Router()
const isAuthorized = require('./gatekeeper')
const {Product, Attribute} = require('../db/models')
const {createAssociations, updateAssociations} = require('./utility')
module.exports = router

/**
 * POST a new product to the database,
 * requires administrative access
 * @param {Object} req.body - requires {name, price}, can accept {description, stock=0, imageUrl}
 */
router.post('/products', isAuthorized, async (req, res, next) => {
  try {
    if (req.user.type !== 'admin') {
      res.sendStatus(401)
    } else {
      const {name, price, description, stock, imageUrl} = req.body
      const newProduct = await Product.create({
        name,
        price,
        description,
        stock,
        imageUrl
      })
      await createAssociations(newProduct.id, req.body.attributes)
      res.json(newProduct)
    }
  } catch (err) {
    next(err)
  }
})

/**
 * PUT new data onto an existing product by id,
 * requires administrative access
 * @param {Object} req.body - can accept {name, price, description, stock=0, imageUrl} and should pass in unchanged values
 */
router.put('/products/:id', isAuthorized, async (req, res, next) => {
  /* NOTE: PUT route contains minor bug:
   * Can update existing attribute
   * associations, but cannot add new ones
   */
  try {
    const {name, price, description, stock, imageUrl} = req.body
    const [numberOfAffectedRows, affectedRows] = await Product.update(
      {name, price, description, stock, imageUrl},
      {
        where: {id: req.params.id},
        returning: true,
        plain: true
      }
    )
    const updatedProduct = affectedRows
    console.log('attributes received: ', req.body.attributes)

    updateAssociations(updatedProduct.id, req.body.attributes)
    updatedProduct ? res.json(updatedProduct) : res.sendStatus(304)
  } catch (err) {
    console.log(err)
    next(err)
  }
})

router.delete('/products/:id', isAuthorized, async (req, res, next) => {
  try {
    await Product.destroy({where: {id: req.params.id}})
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
