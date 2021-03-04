const Sequelize = require('sequelize')
const db = require('../db')

const Variation = db.define('variation', {
  name: {
    type: Sequelize.STRING
  }
})

module.exports = Variation
