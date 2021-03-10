const router = require('express').Router()
const isAuthorized = require('./gatekeeper')
const {Product, Attribute} = require('../db/models')
const {createAssociations, updateAssociations} = require('./utility')
module.exports = router

/**
 * GET all products in the database
 */
router.get('/', async (req, res, next) => {
  try {
    console.log(req.query.sortColumn)
    const query = {
      keywords: req.query.keywords ? req.query.keywords.split(' ') : [],
      sortColumn: req.query.sortColumn || 'id',
      direction: req.query.direction || 'ASC',
      page: req.query.page || 1,
      size: req.query.size || 12
    }
    console.log('router query: ', query)
    const {count, rows} = await Product.findWithQuery(query)
    res.json({count, rows, query})
  } catch (err) {
    next(err)
  }
})

/**
 * GET a single product in the database by its id
 */
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id
      },
      include: Attribute
    })
    res.json(product)
  } catch (err) {
    next(err)
  }
})

/**
 * POST a new product to the database,
 * requires administrative access
 * @param {Object} req.body - requires {name, price}, can accept {description, stock=0, imageUrl}
 */
router.post('/', isAuthorized, async (req, res, next) => {
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
router.put('/:id', isAuthorized, async (req, res, next) => {
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

/**
 * DELETE an existing product in the database by id,
 * requires administrative access
 */
router.delete('/:id', isAuthorized, async (req, res, next) => {
  try {
    await Product.destroy({where: {id: req.params.id}})
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
