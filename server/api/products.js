const router = require('express').Router()
const {Product, Attribute, ProductAttribute} = require('../db/models')
module.exports = router

// TODO: Abstract to other file
const bulkCreateAssociations = async (productId, attributes) => {
  const allAttributes = await Promise.all(
    attributes.map(attribute => {
      return Attribute.findOrCreate({
        where: {name: attribute.name}
      })
    })
  )

  const associationArray = allAttributes.map((attribute, index) => {
    return {
      productId: productId,
      attributeId: attribute[0].id,
      value: attributes[index].value
    }
  })

  await ProductAttribute.bulkCreate(associationArray)
}

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({include: Attribute})
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (req.user.type !== 'admin') {
      res.sendStatus(401)
    } else {
      const newProduct = await Product.create(req.body)
      bulkCreateAssociations(newProduct.id, req.body.attributes)
      res.json(newProduct)
    }
  } catch (err) {
    next(err)
  }
})

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

// broken
router.put('/:id', async (req, res, next) => {
  try {
    const [numberOfAffectedRows, affectedRows] = await Product.update(
      {
        ...req.body
      },
      {
        where: {id: req.params.id},
        returning: true,
        plain: true
      }
    )
    console.log('NUM AFFECT', numberOfAffectedRows)
    const updatedProduct = affectedRows
    console.log('AFF PRODUCT', affectedRows)
    bulkCreateAssociations(updatedProduct.id, req.body.attributes)
    updatedProduct ? res.json(updatedProduct) : res.sendStatus(304)
  } catch (err) {
    console.log(err)
    next(err)
  }
})
//test
router.delete('/:id', async (req, res, next) => {
  try {
    await Product.destroy({where: {id: req.user.id}})
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
