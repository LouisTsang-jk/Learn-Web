Array.prototype.flag = function (depth = 1) {
  if (depth === 0) return this;
  const arr = this.slice();
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      arr = [...arr, ...arr[i].flag(depth - 1)];
    }
  }
  return arr;
};

const arr = [1, 2, [3], [4, 5, [6, [7]]], "", {}];
console.log(arr.flat());
console.log(arr.flat(2));
console.log(arr.flat(3));
console.log(arr.flat(4));
// function flat (arr, depth = 1) {
//   if (depth === 0) return arr;
//   return arr.reduce((acc, cur) => {
//       if (Array.isArray(cur) && depth) {
//           return acc = [...acc, ...flat(cur, depth - 1)]
//       } else {
//           return acc = [...acc, cur];
//       }
//   }, [])
// }
