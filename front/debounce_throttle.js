/**
 * 防抖和节流的作用都是防止函数多次调用。
 * 区别在于，假设一个用户一直触发这个函数，且每次触发函数的间隔小于wait，防抖的情况下只会调用一次，而节流的 情况会每隔一定时间（参数wait）调用函数
 *
 * 防抖有延迟执行的防抖函数和立即执行的防抖函数，使用场景上略微有些区别，延迟执行的防抖函数适合处理输入框输入的场景，如果我们希望用户输入完最后一个字才调用查询接口，就适合使用延迟执行防抖
 * 立即执行防抖使用的场景是第一次立即执行，后面需要超过间隔时间才会执行。比如点击某个按钮可以取消或者开启某个功能，你希望用户第一次点击的时候立即开启某个功能，并且如果用户不停的点击按钮，你希望只有在超过一定间隔才去触发。
 *
 */

/**
 * 防抖函数实现
 * @param {*} func 执行函数
 * @param {*} wait 间隔时间
 * @param {boolean} [immediate=false] 是否立即执行
 */
function debounce(func, wait, immediate = false) {
  let first = false;
  let time = 0;
  return function (...args) {
    if (time) clearTimeout(time);
    if (immediate && !first) {
      func.apply(this, args);
      first = true;
    } else {
      time = setTimeout(() => {
        func.apply(this, args);
      }, wait);
    }
  };
}

function say(text) {
  console.log(text);
}
const debounceSay = debounce(say, 1000, true);
// debounceSay('hello');


/**
 * 节流函数实现
 * @param {*} func 执行函数
 * @param {*} wait 间隔时间
 * @param {boolean} [immediate=false] 是否立即执行
 */
function throttle(func, wait) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime > wait) {
      func.apply(this, args)
      lastTime = now;
    };
  };
}

const throttleSay = throttle(say, 1000, true);
// throttleSay('hello');
