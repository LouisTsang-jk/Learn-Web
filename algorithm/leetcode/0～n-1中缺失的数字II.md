```
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
  // 4,5,6,8,9,10,11
  // 0,1,2,3,4,5 ,6
  // 这里可以看到差值不一样，缺失的数字应该在差值(值和索引)较大的一边
  // 所以这题跟二分法找数字差不多，区别在条件判断上
  // 注意要考虑边界问题
  // ---上面思路错了---
  // 这里数组的值是唯一的，也就是说一定从0开始
  let left = 0;
  let right = nums.length - 1;
  let mid;
  while (left <= right) {
    mid = (right + left) >> 1;
    if (nums[mid] === mid) {
      // 说明mid左侧都正常
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return left;
};
```