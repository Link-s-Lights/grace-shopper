const convertToDollars = value => {
  if (value && Number.isInteger(value)) {
    return value / 100
  }
}

const convertToPennies = value => {
  if (value && !Number.isInteger(value)) {
    return value * 100
  }
}

module.exports = {
  convertToDollars,
  convertToPennies
}
