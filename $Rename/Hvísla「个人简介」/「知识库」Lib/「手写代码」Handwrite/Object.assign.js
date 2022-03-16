Object.assign = function (target, ...sources) {
  sources.forEach((source) => {
    for (key in source) {
      Object.keys(source).forEach(key => {
        target[key] = source[key];
      })
    }
  });
  return target;
};
const a = {
    a: 1,
    aa: Symbol('apple')
}
const b = Object.create({
    b: 2,
    bb: Symbol('banana')
})
const c = {
    c: 3,
    cc: []
}
const n1 = Object.assign(a, b, c);
console.log(n1); // {a: 1, aa: Symbol(apple), c: 3, cc: Array(0)}
console.log(n1 === a); // true