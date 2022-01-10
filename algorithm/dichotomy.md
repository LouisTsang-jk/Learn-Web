# 二分法
输入：
arr(从小到大排好序的数组)
target(数组arr中的一个元素)
输出：
index(target为于nums中的索引)
例如：
const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const target = 1;
dichotomy(nums, target);
//-> 2

```
var search = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let mid;
  while (left <= right) {
    mid = ((right - left) >> 1) + left;
    if (nums[mid] === target) {
      return mid;
    } else if (target < nums[mid]) {
      console.log('p 1');
      right = mid - 1;
    } else {
      console.log('p 2');
      left = mid + 1;
    }
  }
  return -1;
};
```