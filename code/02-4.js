const fp = require('lodash/fp')
const cars = require('./data')

let _underscore = fp.replace(/\W+/g, '_')

const sanitizeNames = fp.flowRight(_underscore)
console.log(sanitizeNames(['Hello World']))
