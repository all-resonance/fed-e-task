const fp = require('lodash/fp')
const { Maybe, Container } = require('./support')
const safeProp = fp.curry(function (x, o) {
  return Maybe.of(o[x])
})
let user = { id: 2, name: 'Albert' }
let ex3 = () => {
  const firstName = function (data) {
    return safeProp('name')(data)
  }
  const getFirst = fp.flowRight(fp.first, fp.prop('_value'), firstName)
  console.log(getFirst(user))
}
ex3()
