Function.prototype.apply = function (context, args) {
  context = context ? Object(context) : context;
  const key = Symbol();
  context[key] = this;
  const result = context[key](...args);
  delete context[key];
  return result;
}

const obj = {
  name: 'obj'
}

function say (str1, str2) {
  console.log(this.name, str1, str2);
}