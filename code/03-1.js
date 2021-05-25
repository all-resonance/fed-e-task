const fp = require('lodash/fp')
const { Maybe } = require('./support')
let maybe = Maybe.of([5, 6, 1])
let ex1 = () => {
  const add = fp.flowRight(fp.map((e) => fp.add(e, 2)))
  let maybe2 = maybe.map(add)
  console.log(maybe2)
}
ex1()
