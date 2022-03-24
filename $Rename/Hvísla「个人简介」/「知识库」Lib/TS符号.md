# TS符号
## ! 非空断言操作符
- 忽略 undefined 和 null 类型
- 调用函数时忽略 undefined 类型
## ?. 可选链运算符
## ?? 空值合并运算符
当左侧操作数为 null 或 undefined 时，其返回右侧的操作数，否则返回左侧的操作数。
- 短路
- 不能与 && 或 || 操作符共用
```
const baz = 0 ?? 42;
console.log(baz); // 输出：0
```
## ?: 可选属性

# 参考
[细数 TS 中那些奇怪的符号](https://segmentfault.com/a/1190000023943952#item-2)