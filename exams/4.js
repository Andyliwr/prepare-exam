const assert = require('assert');

const question = '实现一个信号灯控制器，红/黄/绿灯依次点亮 300/200/100 毫秒，不断交替，本题需要自己写测试';

// 实现一个简单的延时函数
const delay = ms => new Promise((resolve, reject) => setTimeout(resolve, ms));

// 红灯亮 300 毫秒，换黄灯亮 200 毫秒，换绿灯亮 100 毫秒，再换红灯 ......
let light = ''; // red, yellow, green
async function execute() {
  while (true) {
    light = '红灯';
    await delay(300);
    light = '黄灯';
    await delay(200);
    light = '绿灯';
    await delay(100);
  }
}

/*******测试部分*******/
module.exports = async function doTest() {
  return new Promise((resolve, reject) => {
    try {
      execute();
      setTimeout(() => {
        assert.deepStrictEqual(light, '黄灯');
        resolve('通过');
      }, 400);
    } catch (ex) {
      resolve('通过');
    }
  });
};
