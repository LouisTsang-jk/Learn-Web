// 1. 将函数设置为对象的属性
// 2. 执行函数
// 3. 删除对象的这个属性
Function.prototype.call = function (context, ...args) {
  context = context ? Object(context) : context;
  const key = Symbol();
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
}