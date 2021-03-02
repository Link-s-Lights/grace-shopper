const products = require('./products')
let productAttributes = []
let attributesObject = {}

const coinFlip = () => {
  return Math.random() > 0.5
}

const getWatts = () => {
  const watts = ['60 watts', '75 watts', '100 watts', '40 watts']
  return watts[Math.floor(watts.length * Math.random())]
}

const getColor = () => {
  const options = ['white', 'sun yellow', 'soft white']
  return options[Math.floor(options.length * Math.random())]
}

const getOutput = () => {
  const options = ['2900lm', '1000lm', '1500lm', '5000lm']
  return options[Math.floor(options.length * Math.random())]
}
const getHours = () => {
  return ''.concat(Math.ceil(10 * Math.random()), '0,000 hours')
}

for (let i = 1; i <= products.length; i++) {
  //watts
  if (coinFlip()) {
    attributesObject.productId = i
    attributesObject.attributeId = 1
    attributesObject.value = getWatts()
    productAttributes.push(attributesObject)
    attributesObject = {}
  }
  //color
  if (coinFlip()) {
    attributesObject.productId = i
    attributesObject.attributeId = 2
    attributesObject.value = getColor()
    productAttributes.push(attributesObject)
    attributesObject = {}
  }
  //Light Ouput
  if (coinFlip()) {
    attributesObject.productId = i
    attributesObject.attributeId = 3
    attributesObject.value = getOutput()
    productAttributes.push(attributesObject)
    attributesObject = {}
  }
  //hours
  if (coinFlip()) {
    attributesObject.productId = i
    attributesObject.attributeId = 4
    attributesObject.value = getHours()
    productAttributes.push(attributesObject)
    attributesObject = {}
  }
}

module.exports = productAttributes
