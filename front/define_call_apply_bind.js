const question = '实现call apply bind';

/**
 * call方法
 * @param {*} context 上下文
 */
Function.prototype.myCall = function (context) {
  context = context || window;
  context.fn = this;
  const args = [...arguments].slice(1);
  context.fn(args);
  delete context.fn;
};

function say() {
  console.log(this, arguments);
}

say.myCall({ a: 1 }, 'hello');

/**
 * apply方法
 * @param {*} context 上下文
 */
Function.prototype.myApply = function (context, args) {
  context = context || window;
  context.fn = this;
  const newArgs = [...args];
  context.fn(...newArgs);
  delete context.fn;
};

say.myApply({ a: 1 }, [1, 2]);

/**
 * bind方法
 * 绑定this，返回一个函数，不立即执行，实现柯里化
 * @param {*} context 上下文
 */
Function.prototype.myBind = function (context) {
  const self = this;
  const args = [...arguments].slice(1);
  return function () {
    const newArgs = args.concat([...arguments])
    self.apply(context, newArgs);
  }
};

const newSay = say.myBind({ a: 1 }, 'hello2');
newSay('hello');
