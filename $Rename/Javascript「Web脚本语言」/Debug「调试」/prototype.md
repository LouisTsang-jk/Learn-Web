# Prototype

## 赋值操作/原型链查找
学习Kuitos的一次Debug经历。
### 起因
```
(() => {
  'use strict';

  const boundFn = Function.prototype.bind.call(OfflineAudioContext, window);
  console.log(boundFn.hasOwnProperty(boundFn, 'prototype'));
  boundFn.prototype = OfflineAudioContext.prototype;
  console.log(boundFn.hasOwnProperty(boundFn, 'prototype'));
})();
```
返回了错误
```
Uncaught TypeError: Cannot assign to read only property 'prototype' of function 'function () { [native code] }'
    at <anonymous>:6:21
    at <anonymous>:8:3
```
错误告诉我们尝试给一个`readonly`属性赋值，但是`boundFn`上不存在`prototype`。   
对象属性赋值的基本逻辑：
1. 对象不存在该属性 -> 创建一个自有属性并赋值
2. 对象存在该属性 -> 修改该属性的值 -> 触发属性上的`data descriptor`(writable) / `accessor descriptor`(setter)   
上述代码应该
# 资料
[ES 拾遗之赋值操作与原型链查找](https://zhuanlan.zhihu.com/p/368587471)