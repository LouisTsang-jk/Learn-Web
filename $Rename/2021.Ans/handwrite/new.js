/**
 * new过程
 * 1. 创建空对象
 * 2. 
 */
function hackNew(fn, ...args) {
  const obj = {};
  obj.__proto__ = fn.prototype;
  fn.apply(obj, args);
  return obj;
}
