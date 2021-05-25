const fp = require('lodash/fp')
const cars = require('./data')

let _average = function (xs) {
    return fp.reduce(fp.add, 0, xs) / xs.length
}

const averageDollarValue = fp.flowRight(_average, fp.map(item => item.dollar_value))
console.log(averageDollarValue(cars))