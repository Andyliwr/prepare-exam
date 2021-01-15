/**
 * 实现一个Promise
 * Promise有三种状态，pending， fulfilled, rejected
 * 状态只能由pending变成 fulfilled 或者 rejected ，且一单发生改变就再也无法修改
 * Promise有 then 和 catch 方法，then 函数会返回一个 Promise 实例，并且该返回值是一个新的实例而不是之前的实例
 * https://juejin.im/post/5dc383bdf265da4d2d1f6b23
 */

function Promise(executor) {
  // 初始化state为等待态
  this.state = 'pending';
  // 成功的值
  this.value = undefined;
  // 失败的原因
  this.reason = undefined;
  // 存放成功回调的数组，后面会依次执行
  this.successCallbacks = [];
  // 存放失败回调的数组
  this.errorCallbacks = [];

  const self = this;

  // 成功
  let resolve = value => {
    // 异步执行所有的回调函数
    setTimeout(() => {
      if (this.state === 'pending') {
        // resolve调用后，state转化为成功态，如果再调用resolve函数就会失效
        this.state = 'fulfilled';
        // 储存成功的值
        this.value = value;

        for (let i = 0; i < self.successCallbacks.length; i++) {
          self.successCallbacks[i](value);
        }
      }
    });
    
  };
  // 失败
  let reject = reason => {
    setTimeout(() => {
      if (this.state === 'pending') {
        // resolve调用后，state转化为成功态，如果再调用resolve函数就会失效
        this.state = 'rejected';
        // 储存成功的值
        this.reason = reason;

        for (let i = 0; i < self.errorCallbacks.length; i++) {
          self.errorCallbacks[i](reason);
        }
      }
    });
  };
  // 立即执行
  try {
    executor(resolve, reject);
  } catch (err) {
    reject(err);
  }
}

/**
 * 这里只实现一个简易的then方法，接受两个回调函数 successCallback 和 errorCallback
 */
Promise.prototype.then = function (successCallback, errorCallback) {
  const context = this;
  let newPromise = null;
  // 首先对入参 successCallback, errorCallback做校验
  successCallback = typeof successCallback === 'function' ? successCallback : function (v) {};
  errorCallback = typeof errorCallback === 'function' ? errorCallback : function (r) {};
  if (context.status === 'resolved') {
    return (newPromise = new Promise(function (resolve, reject) {
      // 异步执行不影响主进程
      setTimeout(() => {
        try {
          const result = successCallback(context.data);
          resolve(result);
        } catch (err) {
          reject(err);
        }
      })
    }));
  }

  if (context.status === 'rejected') {
    return (newPromise = new Promise(function (resolve, reject) {
      setTimeout(() => {
        try {
          const error = errorCallback(context.data);
          reject(error);
        } catch (err) {
          reject(err);
        }
      });
    }));
  }

  if (context.status === 'pending') {
    return (newPromise = new Promise(function (resolve, reject) {
      this.successCallbacks.push(function (value) {
        try {
          const result = successCallback(context.data);
          resolve(result);
        } catch (e) {
          reject(e);
        }
      });
      this.errorCallbacks.push(function (value) {
        try {
          const error = errorCallback(context.data);
          reject(error);
        } catch (err) {
          reject(err);
        }
      });
    }));
  }
};
