const assert = require('assert');

const question = '给定一个自然数 n，算出 n 的阶乘，分别用递归和循环两种方式实现';

// 阶乘: n！= n* (n-1) * ... * 5 * 4 * 3 * 2 * 1

/**
 * 递归实现
 */
function recursion(n) {
  if (typeof n !=='number' || n < 0) {
    throw new Error('param invalid');
  }
  if (n === 0) return 1;
  if (n === 1) {
    return 1;
  } else {
    return n * recursion(n-1);
  }
}

/**
 * 循环实现
 */
function loop(n) {
  if (typeof n !=='number' || n < 0) {
    throw new Error('param invalid');
  }
  if (n === 0) return 1;
  let result = 1;
  for(let i=0; i<n; i++) {
    result = result * (n-i);
  }
  return result;
}

/*******测试部分*******/
module.exports = function doTest() {
  try {
    assert.equal(recursion(3), 6);
    assert.equal(loop(3), 6);
    assert.equal(recursion(20), 2432902008176640000);
    assert.equal(loop(20), 2432902008176640000);
    return '通过';
  } catch (ex) {
    return '不通过';
  }
}
