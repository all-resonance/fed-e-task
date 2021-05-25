const Pending = 'Pending' // 进行中
const Fulfilled = 'Fulfilled' // 已成功
const Rejected = 'Rejected' // 已失败

class MyPromise {
  // 当前状态
  status = Pending
  // 成功状态的value值
  value = undefined
  // 失败状态的reason值
  reason = undefined
  constructor(executer) {
    if (typeof executer !== 'function')
      throw new TypeError('executer must be an function')
    // 让状态改为成功的函数
    const resolve = (value) => {
      if (this.status !== Pending) return
      this.value = value
      this.status = Fulfilled
    }
    // 让状态改为失败的函数
    const reject = (reason) => {
      if (this.status !== Pending) return
      this.reason = reason
      this.status = Rejected
    }
    executer(resolve, reject)
  }

  // then方法返回一个新的promise对象
  then(onFulfilled, onRejected) {
    // 如果没有传回调函数，给它一个默认值, 方便链式调用时的参数透传
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (value) => value
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw new Error(reason)
          }
    let promise2 = new MyPromise((resolve, reject) => {
      
    })
    return promise2
  }
}
