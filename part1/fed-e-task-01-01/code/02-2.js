const fp = require('lodash/fp')
const cars = require('./data')

const getFirstName = fp.flowRight(fp.prop('name'), fp.first)
console.log(getFirstName(cars))
