const fp = require('lodash/fp')
const { Maybe, Container } = require('./support')

// let ex4 = function (n) {
//   if (n) {
//     return parseInt(n)
//   }
// }
// ex4()

let ex4 = function (n) {
  const maybe = Maybe.of(n)
  const data = maybe.map(parseInt)
  console.log(data)
}
ex4()
