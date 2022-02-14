1. 简单请求/复杂请求
   简单请求满足以下两个条件：

- 请求方法是 HEAD/GET/POST
- HTTP 头信息不超出以下几个字段 - Accept - Accept-Language - Content-Language - Last-Event-ID - Content-Type 只能是三值其一 - application/x-www-form-urlencoded - multipart/form-data - text/plain
  除简单请求外的请求都是复杂请求，其中 Axios 都是复杂请求
  > 复杂请求在正式请求之前都会有预检请求，在浏览器中都能看到有 OPTIONS 请求，用于向服务器请求权限信息

2. 缓存中 no-store 和 no-cache 区别
   `no-store`: 禁用缓存
   `no-cache`: 使用缓存之前重新请求
3. 常见 深克隆/浅克隆方式

- 浅克隆
  创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址，所以如果其中一个对象改变了这个地址，就会影响另外一个对象。
  1. 运算扩展符
  ```
    const obj = {props: 'demo'};
    const cloneObj = {...obj};
  ```
  2. `Object.assign`
  ```
    const obj = {props: 'demo'};
    const cloneObj = Object.assign({}, obj);
  ```
  3. for in
  ```
    const obj = {props: 'demo'};
    const cloneObj = {};
    for (const key in obj) {
      // for in会遍历原型上的方法，所以要阻止遍历原型
      if (!obj.hasOwnProperty(key)) break;
      cloneObj[key] = obj[key];
    }
  ```
  4. `Object.keys`
- 深克隆
  将一个对象从内存中完整的拷贝一份出来，从堆内存中开辟一个新的区域存放新对象，且修改新对象不会影响原对象。

  1. JSON.parse(JSON.stringify());
     缺点：

     - 拷贝引用类型
     - 函数
     - 循环引用

  2. 递归
     操作比较复杂，需要进行很多判断：

     - 数组，如果是数组则直接创建数组
     - 循环引用，需要额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，当需要拷贝当前对象的时候就去存储空间中查找；一般我们可以选择 WeakMap 这种数据结构，因为 Map 的话对象间可能存在强引用关系，导致内存无法被释放
     - function
     - null
     - Symbol

4. 常见 Hook

- useState
- useEffect
- useContext
- useReducer
- useCallback
- useMemo
- useRef
- useImperativeHandle
- useLayoutEffect
- useDebugValue

5. let 和 var 的区别

- 作用域不同。var 是函数作用域，let 是块作用域
- let 有暂时性死区
- let 不能被重新定义，var 可以

6. 观察者模式和发布订阅模式的区别
   观察者具有高内聚的特点，适合同模块或者同一组件内使用；
   当需要监听的对象和执行动作不在同一模块或者组件中，使用发布订阅模式可以做到很好的解耦的同时不会破坏封装。
   > 在发布订阅模式里，发布者不会直接通知订阅者，换句话说这两者互补认识，即两者完全解耦。
   > 简单来说发布订阅模式中多了个中转的函数。
7. 对称加密和非对称加密
   `对称加密`: 加密解密都是一个密钥
   `非对称加密`: 加密解密是两个密钥
8. 除了 bind、call、apply 还有什么更改 this 指向的方法
   使用 new 也能改变 this 的指向
9. jsx 的本质
   React.createElement
10. React.createElement 参数
   参数：
  1. HTML 标签名称。e.g.: ul、li
  2. 属性。e.g.: className
  3. 子节点。
11. React 事件合成
   [React 事件合成](/$Rename/Hvísla「个人简介」/「知识库」Lib/React事件合成.md)
12. useEffect 如何监听页面销毁
  - componentDidMount
  ```
  useEffect(() => { ... }, [])
  ```
  - componentDidUpdate
  没有第二个参数代表监听所有的属性更新
  ```
  useEffect(() => { ... })
  ```
  监听多个属性
  ```
  useEffect(() => { ... }, [n, m])
  ```
  - componentWillUnmount
  通常组件卸载时需要清除effect创建的订阅或者计时器ID等资源
  ```
  useEffect(() => {
    const timer = setTimeout(() => { ... }, 1000);
    return () => {
      clearTimerout(timer);
    }
  })
  ```
  > useEffect函数返回的函数可以表示组件销毁执行
13. Class 组件和 Hook 组件区别
14. cdn 原理
15. DNS 过程
16. 为什么 React 和 Vue 都需要虚拟 DOM
17. React 数据流/组件间通信
18. Vue 数据流/组件间通信
19. Vue 和 React 的区别
20. Hook 内部实现原理
21. qiankun 的微应用如何判断当前应用在基座上还是独立运行
22. 如何实现类似 Keep-alive 的效果？(类似两个应用同时运行)
23. umi 框架设计中，有哪些部分是值得借鉴的？
24. 新项目需求，会从哪几个方面考虑使用什么技术栈?
25. React 和 Vue 的 diff 算法上的区别
26. 如果一个游戏应用在部分机型上出现卡顿，从哪几个点上去分析？
27. 事件循环，微任务后面再碰到一个微任务的话，是会将这个微任务加在原来队列上，还是下一次循环？
28. 重绘(页面刷新)是宏任务还是微任务？如果不是的话在哪个任务的前面还是后面？（请补充代码解释）
29. GPU 加速如何开启？是否需要一直开启，理由？
30. 原型链的应用
31. 组合寄生继承、寄生继承等继承方式的优缺点
32. 300kb 的资源在正常网络请求下返回的时间大概是？
33. 打包的优化手段
34. webpack 的 hash 模式有哪几种？
35. 删除构造函数的原型对象会发生什么？
36. 移动端除了 REM 以外还有其他解决响应式页面的方案吗？
37. LocalStorage 实现一定的时间后过期
38. 有开发过什么比较难或者印象比较深刻的项目吗？
39. 有了解过 pnpm 吗？
40. 正则的贪婪如何写？
41. TS 的高级类型有哪些？
- 

42. 使用 Hook 有什么坑或者注意的地方？
   - 要在React函数内
   - 不能在循环体或者条件语句里
   - 闭包
43. react17 的新特性有了解吗？
  - 事件合成的三处改动

44. 为什么数组的插入比链表复杂？
45. interface 和 type 的区别？

- interface 可以 extends, type 不允许 extends，不过可以通过交叉类型实现。
-

46. webpack 的生命周期
47. Proxy 和 Reflect
48. 为什么需要 Map
49. TCP 滑动窗口
50. 判断链表是否有环
  - hash
  - 快慢指针
51. DPI/PPI/设备像素/独立像素
52. postCSS 的 REM 处理流程
53. vue3 中为什么使用`Proxy`替换原来的`Object.defineProperties`
54. 请描述一下 vue3 的静态标记和事件监听器缓存(cacheHandlers)
55. 如何将闭包中泄漏的内存进行释放？
56. Symbol.for
> 场景：重新使用同一个`Symbol`
方法会根据给定的键 key，来从运行时的 symbol 注册表中找到对应的 symbol，如果找到了，则返回它，否则，新建一个与该键关联的 symbol，并放入全局 symbol 注册表中。
57. 如何用代码去体现 Map 和 WeakMap 区别？
58. 对React ref的理解和原理
59. useReduces的dispatch的作用是什么，为什么需要dispatch
60. useEffect依赖链比较长如何处理
  - 将声明放入useEffect内(官方建议)
  - 使用useReducer
61. useEffect返回函数的执行时机
62. 为什么需要useImperativeHandel
> 子组件利用useImperativeHandle可以让父组件输出任意数据。
我们都知道父组件可以利用ref可以访问子组件实例或者DOM元素，这其实相当于子组件向父组件输出本身实例或者DOM元素。而利用useImperativeHandle子组件可以向父组件输出任意数据。
63. monorepo的优点和其他解决方案
  - 抽离多个重复配置文件
    一份配置文件就可以用来构建所有的包
  - 轻松拉去所有最新的代码
    一个拉取请求就可以拉去所有最新的代码内容
  - 更加简单的NPM发布
    可以利用Lerna、Yarn Workspaces等工具更加自动化处理依赖包之间的构建和发布
  - 更容易的依赖管理
    多个项目相同的依赖在项目的根依赖中进行管理，可以大大缩小项目依赖在硬盘上占据的空间。
  - 更好的逻辑复用方案
    独立出不同应用之间的逻辑同时可以更清晰地复用其他模块。
64. 为什么说React是声明式？
相对的命令式代码告诉JavaScript如何执行每个步骤；
声明式的代码由我们告诉JavaScript希望实现什么结果，让JavaScript处理每个步骤

65. 箭头函数有argument吗
箭头函数没有自己的this、arguments、super、new
66. 错误拦截的方法
67. 为什么js是单线程的，有什么优点和缺点？
68. 事件执行栈是什么
69. 如何自定义原生事件
70. 最近chrome限制的same-site是怎么回事
71. setState是同步还是异步
`isBatchingUpdates`决定是否异步，默认为false表示不会让setState异步执行。
> 简单来说就是经过React处理的事件是不会同步更新；通过addEventListener || setTimeout / setInterval
72. 