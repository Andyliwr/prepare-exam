/**
 * Currying 为实现多参函数提供了一个递归降解的实现思路——把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数
 * Currying 延迟求值的特性需要用到 JavaScript 中的作用域——说得更通俗一些，我们需要使用作用域来保存上一次传进来的参数。
 */

// 基本方法
function add(x, y) {
  return x + y;
}

/**
 * 抽象函数
 * currying 函数的返回值其实是一个接收剩余参数并且立即返回计算值的函数
 * 但是它的返回值并没有自动被 Currying化 。
 * 所以我们可以通过递归来将 currying 的返回的函数也自动 Currying 化
 * @param {*} fn
 * @param {*} args1
 * @returns
 */
function currying(fn, ...args1) {
  return function (...args2) {
    return fn(...args1, ...args2);
  };
}

/**
 * 具体实现
 * @param {*} fn
 * @param {*} args
 * @returns
 */
function trueCurrying(fn, ...args) {
  // 查看是否有足够的有效参数, fn.length 代表被 currying 化函数需要的参数个数
  if (args.length >= fn.length) {
    return fn(...args);
  }

  return function (...args2) {
    return trueCurrying(fn, ...args, ...args2);
  };
}

const curryingAdd = trueCurrying(add);
console.log(curryingAdd(1)(2));
