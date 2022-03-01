function New (func) {
  // 1. 创建空对象
  var res = {};
  // 2. 继承构造函数的原型对象
  if (func.prototype !== null) {
    res.__proto__ = func.prototype;
  }
  // 3. 将this指向空对象,并将传入构造函数的参数在空对象上下文中执行一遍
  var ret = func.apply(res, Array.prototype.slice.call(arguments, 1));
  // 4.a 如果构造函数返回一个对象/函数，则直接返回这个对象
  if ((typeof ret === 'object' || typeof ret === 'function') && ret !== null) {
    return ret;
  }
  // 4.b 反之则返回新创建的对象
  return res;
}

// var obj = new A(1,2);
var obj = New(A, 1, 2);

// - - - - - - 
// 不考虑兼容的简洁版
function New (fn, ...args) {
  // 1. 创建空对象并继承构造函数的原型对象
  const obj = Object.create(fn.prototype);
  // 2. 将this指向空对象,并将传入构造函数的参数在空对象上下文中执行一遍
  const ret = fn.apply(obj, args);
  // 3. 如果构造函数返回一个对象，则直接返回这个对象，反之则返回新创建的对象
  return fn instanceof Object ? ret : obj;
}