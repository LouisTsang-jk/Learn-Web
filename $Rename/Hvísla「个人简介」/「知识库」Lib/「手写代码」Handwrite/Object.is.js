Object.is = function (x, y) {
  if (x === y) {
    // +0 != -0 || 1/-Infinity !== 1/Infinity
    return x !== 0 || 1 / x === 1 / y;
  } else {
    // NaN === NaN
    return x !== x && y !== y;
  }
};

console.log(Object.is(NaN, NaN)); // true
console.log(Object.is(-0, +0)); // false
