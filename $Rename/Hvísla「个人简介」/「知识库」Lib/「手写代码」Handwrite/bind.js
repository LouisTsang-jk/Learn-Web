Function.prototype.bind = function (ctx, ...args) {
  const self = this;
  const fn = function (...rest) {
    return self.call(ctx, ...args, ...rest);
  };
  // 复制目标函数的prototype给fn
  if (self.prototype) { // 箭头函数没有prototype
    fn.prototype = Object.create(self.prototype);
  }
  return fn;
};

const obj = {
  name: 'apple'
}

document.onclick = function () {
  console.log(this);
}.bind(obj);

