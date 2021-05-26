// Promise的三种状态
const Pending = "Pending";
const Fulfilled = "Fulfilled";
const Rejected = "Rejected";

class MyPromise {
  // Promise的状态
  status = Pending;
  // Promise成功状态的值
  value = undefined;
  // Promise失败状态的原因
  reason = undefined;
  // 存放成功回调
  fulfilledCallbacks = []
  // 存放失败回调
  rejectedCallbacks = []

  // new的时候会传入一个回调函数executer，它包含resolve、reject两个参数
  constructor(executer) {
    if (typeof executer !== "function")
      throw new TypeError("executer must be an function");
    try {
      // 使Promise状态变为成功的函数
      const resolve = (value) => {
        // 如果状态已经改变，就不能再次改变了
        if (this.status !== Pending) return;
        this.value = value;
        this.status = Fulfilled
        while(this.fulfilledCallbacks.length) this.fulfilledCallbacks.shift()?.(this.value)
      };
      // 使Promise状态变为失败的函数
      const reject = (reason) => {
        // 如果状态已经改变，就不能再次改变了
        if (this.status !== Pending) return;
        this.reason = reason;
        this.status = Rejected
        while(this.rejectedCallbacks.length) this.rejectedCallbacks.shift()?.(this.reason)
      };
      executer(resolve, reject);
    } catch(e) {
      reject(e)
    }
  }

  // Promise的then方法, 默认会返回一个新的Promise
  then(onFulfilled, onRejected) {
    // 如果then没有传递回调，会默认有一个回调，方便后续链式调用时，达到参数透传的目的
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {throw new Error(reason)}

    let promise2 = new MyPromise((resolve, reject) => {
        // 根据不同状态调用不同的回调函数
        if(this.status === Fulfilled) {
            setTimeout(() => {
              try {
                const x = onFulfilled(this.value)
                resolvePromise(x, promise2, resolve, reject)
              } catch(e) {
                reject(e)
              }
            })
        } else if(this.status === Rejected) {
            setTimeout(() => {
              try {
                const x = onRejected(this.reason)
                resolvePromise(x, promise2, resolve, reject)
              } catch(e) {
                reject(e)
              }
            })
        } else {
            this.fulfilledCallbacks.push(() => {
                setTimeout(() => {
                  try {
                    const x = onFulfilled(this.value)
                    resolvePromise(x, promise2, resolve, reject)
                  } catch(e) {
                    reject(e)
                  }
                })
            })
            this.rejectedCallbacks.push(() => {
                setTimeout(() => {
                  try {
                    const x = onRejected(this.reason)
                    resolvePromise(x, promise2, resolve, reject)
                  } catch(e) {
                    reject(e)
                  }
                })
            })
        }
    })
    return promise2
  }

  catch(callback) {
    return this.then(undefined, callback)
  }

  // 无论promise的状态是失败还是成功，finally中的回调都会执行
  finally(callback) {
    return this.then((value) => {
      // 如果callback返回的值是一个promise对象，需要等待他执行完毕
      return MyPromise.resolve(callback()).then(() => value)
    },  (reason) => {
      return MyPromise.resolve(callback()).then(() => {throw reason})
    })
  }

  static all(array) {
    return new MyPromise((resolve, reject) => {
      try {
        let result = []
        // 有可能是异步的，所以这里用一个标识
        let i = 0
        function add(value, idx) {
          result[idx] = value // 保存和传递的数组顺序一致
          i++ // 每次自增，用于存放当前已经完成的数量
          // 如果长度和传递的数组长度一样，就代表这是最后一个了
          if(i === array.length) {
            resolve(result)
          }
        }
        for(let i = 0; i<array.length; i++) {
          const item = array[i]
          if(item instanceof MyPromise) {
            item.then(value => add(value, i), reject)
          } else {
            add(item, i)
          }
        }
      } catch(e) {reject(e)}
    })
  }

  static race(array) {
    return new MyPromise((resolve, reject) => {
      try {
        for(let i = 0; i<array.length; i++) {
          const item = array[i]
          if(item instanceof MyPromise) {
            item.then(resolve, reject)
          } else {
            resolve(item)
          }
        }
      } catch(e) {reject(e)}
    })
  }

  static resolve(value) {
    if(value instanceof MyPromise) return value
    return new MyPromise(resolve => resolve(value))
  }
}

// 判断回调函数返回的值，
// 如果是普通值，直接resolve
// 如果是对象，查看是否是promise对象，查看then方法根据状态不同调用不同的回调
function resolvePromise(x, promise2, resolve, reject) {
    // 如果回调返回的值和then方法返回的是同一个，则报错
    if(x === promise2) reject(new TypeError('x === promise2'))
    // 如果回调返回的值是promise对象
    if(x instanceof MyPromise) {
        x.then(resolve, reject)
    } else {
        resolve(x)
    }
}

module.exports = MyPromise