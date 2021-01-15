/**
 * 实现js继承
 * 方式1 子类的原型设置为父类的实例
 */

// 声明父类
function Animal(color) {
  this.color = color;
}

// 声明子类
function Dog() {
  this.name = 'dog';
}

Dog.prototype = new Animal('白色');
const dog = new Dog();

console.log(dog.color); // "白色"

/**
 * 实现js继承
 * 方式2 在构造函数中使用apply或者call
 */

// 声明父类
function Animal(color) {
  this.color = color;
}

// 声明子类
function Dog() {
  Animal.call(this, '白色');
}

const dog2 = new Dog();

console.log(dog2.color); // "白色"
