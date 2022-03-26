function quickSort (arr) {
  if (arr.length <= 1) return arr;
  const [pivot] = arr.splice(arr.length >> 1, 1);
  const left = [];
  const right = [];
  arr.forEach(num => {
      pivot < num ? right.push(num) : left.push(num);
  })
  return [...quickSort(left), pivot, ...quickSort(right)];
}

const arr = [1,4,5,2,6,7,3];
quickSort(arr);