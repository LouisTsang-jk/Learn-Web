# React
1. 什么是虚拟DOM
#### VitrualDOM
React先将代码转换成JavaScript对象，再将这个JavaScript对象转换成真实DOM。这个JavaScript对象就是虚拟DOM。
#### 优点：
1. 将精力更多放在业务逻辑而不是DOM操作，提高开发效率。
2. 跨浏览器兼容
3. 跨平台(React Native)
#### 防止XSS
ReactElement对象有一个`$$typeof`的`Symbol`类型的属性。用来标记该对象是一个`ReactElement`。   
React在进行渲染前会通过此属性进行校验，原因是`Symbol`类型经过JSON转换之后会丢失，无法在前后端进行传输。因此用户提交了特殊的children也无法进行渲染，利用此特性防止存储型的XSS攻击。
#### 批处理和事务




#### Fiber
> Fiber reconciler在React 16中替换了React 15中原有的Stack reconsiler
1. 能够把可中断的任务切片处理。
2. 能够调整优先级，重置并复用任务。
3. 能够在父元素与子元素之间交错处理，以支持 React 中的布局。
4. 能够在 render() 中返回多个元素。
5. 更好地支持错误边界。

#### Fiber
工作原理
> Fiber节点可以保存对应的DOM节点。Fiber节点构建对应的DOM树。
- 双缓存
React中最多同时存在两棵Fiber树。当前显示内容对应`current Fiber树`，在内存构建中的称为`workInProgress Fiber树`。两棵树之间的Fiber节点通过`alternate`属性连接。
```
crrentFiber.
```
- 
## 问题
1. 有时候连续setState只有一次生效？
- 直接传递对象的setState会被合并成一次
- 使用函数传递state不会被合并

# 参考
[](https://segmentfault.com/a/1190000018891454)