Function.prototype.call = function (context) {
  context = context ? Object(context) : window;
  context.fn = this;

  const args = [...arguments].slice(1);
  const result = context.fn(...args);

  delete context.fn;
  return result;
};
