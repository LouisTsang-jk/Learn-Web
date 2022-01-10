```
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  const index = find(nums, target);
  if (index === -1) return 0;
  let left = 0;
  let right = 0;
  // 左搜索
  while (left <= index) {
    if (nums[index - 1 - left] !== target) break;
    left++;
  }
  // 右搜索
  while (right <= nums.length - index) {
    if (nums[index + 1 + right] !== target) break;
    right++;
  }
  return left + right + 1;
};

var find = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let mid;
  while (left <= right) {
    mid = ((right - left) >> 1) + left;
    if (nums[mid] === target) {
      return mid;
    } else if (target < nums[mid]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return -1;
}
```