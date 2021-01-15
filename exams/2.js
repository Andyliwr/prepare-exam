const assert = require('assert');

const question = '找出一个字符串中，所有长度为 n 且出现超过 1 次的子串';

function findChildStr(str, n) {
  if (typeof str !== 'string' || typeof n !== 'number') throw new Error('param invalid');
  // 先求出所有子串
  const allSubStr = [];
  const result = []
  const strArr = str.split('');
  for(let i=0; i<strArr.length; i++) {
    const curStr = str.substring(i, i+n);
    if (curStr.length === n) {
      // 符合要求的加入到结果数组中
      if (allSubStr.indexOf(curStr) > -1 && result.indexOf(curStr) < 0) result.push(curStr);
      allSubStr.push(curStr);
    }
  }
  return result;
}

/*******测试部分*******/
module.exports = function doTest() {
  try {
    assert.deepStrictEqual(findChildStr('AAAAAAAABBAAAAAAAA', 8).sort(), ['AAAAAAAA']);
    assert.deepStrictEqual(findChildStr('AAACCCAAACCCAAA', 2).sort(), ['AA', 'AC', 'CA', 'CC']);
    return '通过';
  } catch (ex) {
    return '不通过';
  }
}
