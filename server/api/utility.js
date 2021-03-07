const {Attribute, ProductAttribute} = require('../db/models')

// Helper functions for the helper functions

const generateAssociations = async (productId, attributes) => {
  try {
    const allAttributes = await Promise.all(
      attributes.map(attribute => {
        return Attribute.findOrCreate({
          where: {name: attribute.name}
        })
      })
    )
    return allAttributes.map((attribute, index) => {
      return {
        productId: productId,
        attributeId: attribute[0].id,
        value: attributes[index].productAttribute.value
      }
    })
  } catch (err) {
    console.log(err)
  }
}

// Exported Utility functions

const createAssociations = async (productId, attributes) => {
  try {
    const associations = await generateAssociations(productId, attributes)

    associations.forEach(association => {
      ProductAttribute.create(association)
    })
  } catch (err) {
    console.log(err)
  }
}

const updateAssociations = async (productId, attributes) => {
  try {
    await ProductAttribute.destroy({where: {productId}})
    await createAssociations(productId, attributes)
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  createAssociations,
  updateAssociations
}
