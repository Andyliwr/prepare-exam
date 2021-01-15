const assert = require('assert');

const question = '重新排列一个字符串，使得每个相邻字符都不同，列出所有情况';


// 求出所有子串
function anagrams(str) {
  if (str.length <= 2) {
    return str.length === 2 ? [str, str[1] + str[0]] : [str];
  } else {
    return str.split('')
      .reduce((acc, letter, i) => acc.concat(anagrams(str.slice(0, i) + str.slice(i + 1))
      .map(val => letter + val)), []);
  }
}

// 字符串只包含小写字母或者数字
function reorganize(str) {
  if (typeof str !== 'string') throw new Error('param invalid');
  const strArr = anagrams(str);
  const result = [];
  for (let i = 0; i < strArr.length; i++) {
    const tmpArr = strArr[i].split('');
    let repeat = false;
    for (let j=0; j<tmpArr.length; j++) {
      if (tmpArr[j] !== tmpArr[j+1]) {
        continue;
      } else {
        repeat = true;
        break;
      }
    }
    if (!repeat && result.indexOf(strArr[i]) < 0) result.push(strArr[i]);
  }
  return result;
}

/*******测试部分*******/
module.exports = function doTest() {
  try {
    assert.deepStrictEqual(reorganize('aabb').sort(), ['abab', 'baba']);
    assert.deepStrictEqual(reorganize('aaabbbb').sort(), ['bababab']);
    assert.deepStrictEqual(reorganize('aabbbc').sort(), ['ababcb', 'abcbab', 'bababc', 'babacb', 'babcab', 'babcba', 'bacbab', 'bcabab', 'bcbaba', 'cbabab']);
    assert.deepStrictEqual(reorganize('1bbbbb'), []);
    return '通过';
  } catch (ex) {
    return '不通过';
  }
};
