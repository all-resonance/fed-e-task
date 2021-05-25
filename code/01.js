// setTimeout(function () {
//   var a = 'hello'
//   setTimeout(function () {
//     var b = 'lagou'
//     setTimeout(function () {
//       var c = 'I Love U'
//       console.log(a + b + c)
//     }, 10)
//   }, 10)
// }, 10)

function delay(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout)
  })
}

delay(10).then(() => {
  var a = 'hello'
  delay(10).then(() => {
    var b = 'lagou'
    delay(10).then(() => {
      var c = 'I Love U'
      console.log(a + b + c)
    })
  })
})
