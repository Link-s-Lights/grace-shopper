const Sequelize = require('sequelize')
const db = require('../db')

const Attribute = db.define('attribute', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
})

module.exports = Attribute
