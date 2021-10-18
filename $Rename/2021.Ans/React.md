# React

1. 什么是虚拟 DOM

#### VitrualDOM

React 先将代码转换成 JavaScript 对象，再将这个 JavaScript 对象转换成真实 DOM。这个 JavaScript 对象就是虚拟 DOM。

#### 优点：

1. 将精力更多放在业务逻辑而不是 DOM 操作，提高开发效率。
2. 跨浏览器兼容
3. 跨平台(React Native)

#### 防止 XSS

ReactElement 对象有一个`$$typeof`的`Symbol`类型的属性。用来标记该对象是一个`ReactElement`。  
React 在进行渲染前会通过此属性进行校验，原因是`Symbol`类型经过 JSON 转换之后会丢失，无法在前后端进行传输。因此用户提交了特殊的 children 也无法进行渲染，利用此特性防止存储型的 XSS 攻击。

#### 批处理和事务

#### Fiber

实现原理

```
// 指向父级Fiber节点
this.return = null;
// 指向子级Fiber节点
this.child = null;
// 指向右边第一个兄弟Fiber节点
this.sibling = null;
```

工作原理

> Fiber 节点可以保存对应的 DOM 节点。Fiber 节点构建对应的 DOM 树。

- 双缓存
  React 中最多同时存在两棵 Fiber 树。当前显示内容对应`current Fiber树`，在内存构建中的称为`workInProgress Fiber树`。两棵树之间的 Fiber 节点通过`alternate`属性连接。

```
crrentFiber.alternate === workInprogressFiber;
workInProgressFiber.alternate === currentFiber;
```

当`workInProgress Fiber`树构建完成之后通过改变应用根节点的`current`指针指向完成渲染。此时`workInProgress Fiber`树变为`current Fiber`树。

-

## 问题

1. 有时候连续 setState 只有一次生效？

- 直接传递对象的 setState 会被合并成一次
- 使用函数传递 state 不会被合并

# 参考

[](https://segmentfault.com/a/1190000018891454)
