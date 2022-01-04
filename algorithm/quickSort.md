# 快速排序
复杂度：O(nlogn)
最糟糕下：O(n^2)

```
function quickSort(arr){
  if(arr.length <= 1){
    return arr;
  }
  const pivot = arr.splice(arr.length >> 1,1)[0];
  let left = [],right = [];
  arr.forEach(item => {
    item > pivot ? right.push(item) : left.push(item);
  })
  return [...quickSort(left),pivot,...quickSort(right)];
}
```