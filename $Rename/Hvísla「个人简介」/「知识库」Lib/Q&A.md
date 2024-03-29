1. `简单请求/复杂请求`   
  简单请求满足以下两个条件：
  - 请求方法是 HEAD/GET/POST
  - HTTP 头信息不超出以下几个字段
    - Accept
    - Accept-Language
    - Content-Language
    - Last-Event-ID
    - Content-Type 只能是三值其一
      - application/x-www-form-urlencoded
      - multipart/form-data
      - text/plain
    除简单请求外的请求都是复杂请求，其中 Axios 都是复杂请求
    > 复杂请求在正式请求之前都会有预检请求，在浏览器中都能看到有 OPTIONS 请求，用于向服务器请求权限信息
---
2. 缓存中 no-store 和 no-cache 区别
   `no-store`: 禁用缓存
   `no-cache`: 使用缓存之前重新请求
---
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
---
  4. `Object.keys`
  - 深克隆
    将一个对象从内存中完整的拷贝一份出来，从堆内存中开辟一个新的区域存放新对象，且修改新对象不会影响原对象。

    1. `JSON.parse(JSON.stringify())`   
      > 缺点：
      > - 拷贝引用类型
      > - 函数
      > - 循环引用

    2. `递归`   
      > 操作比较复杂，需要进行很多判断：
      > - 数组，如果是数组则直接创建数组
      > - 循环引用，需要额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，当需要拷贝当前对象的时候就去存储空间中查找；一般我们可以选择 WeakMap 这种数据结构，因为 Map 的话对象间可能存在强引用关系，导致内存无法被释放
      > - function
      > - null
      > - Symbol
---

4. 常见 Hook及问题
  - useState
  > 实现一个简易的useState
  >```
  > let state;
  > function useState(initialState){
    state = state || initialState;
  }
  >
  >```
  - useEffect
  useEffect第一个参数的函数返回可以返回一个对象进行副作用销毁
  - useContext
  - useReducer
  - useCallback
  - useMemo
  - useRef
  - useImperativeHandle
  - useLayoutEffect
  - useDebugValue
---

5. let 和 var 的区别

- 作用域不同。var 是函数作用域，let 是块作用域
- let 有暂时性死区
- let 不能被重新定义，var 可以
---
6. 观察者模式和发布订阅模式的区别
   观察者具有高内聚的特点，适合同模块或者同一组件内使用；
   当需要监听的对象和执行动作不在同一模块或者组件中，使用发布订阅模式可以做到很好的解耦的同时不会破坏封装。
   > 在发布订阅模式里，发布者不会直接通知订阅者，换句话说这两者互补认识，即两者完全解耦。
   > 简单来说发布订阅模式中多了个中转的函数。
---
7. 对称加密和非对称加密
   `对称加密`: 加密解密都是一个密钥
   `非对称加密`: 加密解密是两个密钥
---
8. 除了 bind、call、apply 还有什么更改 this 指向的方法
   使用 new 也能改变 this 的指向
---
9. jsx 的本质
   React.createElement
---
10. React.createElement 参数
  > 参数：
  > 1. HTML 标签名称。e.g.: ul、li
  > 2. 属性。e.g.: className
  > 3. 子节点。
---
11. React 事件合成
   [React 事件合成](/$Rename/Hvísla「个人简介」/「知识库」Lib/React事件合成.md)
---
12. useEffect 模拟生命周期
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
    const timer = setTimeout((=> { ... }, 1000);
    return () => {
      clearTimerout(timer);
    }
  })
  ```
  > useEffect函数返回的函数可以表示组件销毁执行
---
13. Class 组件和 Hook 组件区别
  - Hook
    - 写法更加简洁
    - 业务代码更加聚合：有时候写业务会忘记清理计时器造成内存泄漏
    - 逻辑更加方便
    - 没有统一的错误处理。而 Class Component 中有 componentDidCatch 和 getDerivedStateFromError
  - Class
    - Class可以拿到中间状态
    - 不容易发生内存泄漏
  > 为什么需要Hook
  > 1. 告别难以理解的Class(this、生命周期)
  > 2. 解决业务逻辑难以拆分的问题(Class组件逻辑与生命周期耦合在一起-一个生命周期内有多个业务逻辑)
  > 3. 使状态逻辑复用变得简单可行(原来HOC和Render Props的组件设计模式有着嵌套地狱的问题)
  > 4. 函数组件从设计思想上来看更加契合React的理念
---
14. cdn 原理
---
15. DNS 过程
---
16. 为什么 React 和 Vue 都需要虚拟 DOM
  - 减少操作DOM，任何页面的变化都是用虚拟DOM进行对比，
  - 组件高度抽象化
  - 实现SSR/同构渲染
  - 框架跨平台
---
17. React 数据流/组件间通信
 - 父 -> 子:props
 - 子 -> 父: 回调函数
 > 父组件传递给子组件的是一个绑定了自身上下文的函数，那么子组件在调用这个函数的时候，就可以将想要交给父组件的数据以函数入参的形式给出去。
 - 跨级组件: 逐层props/context
 - redux
 - ref
---
18. Vue 数据流/组件间通信
  1. props/$emit
  2. ref
  3. $parent
  4. $attrs
  5. $listeners
  6. provide/inject
  7. $bus
  8. vuex
---
19. Vue 和 React 的区别
  - Vue双向数据流，React单向数据流
  - Vue渲染template，React渲染JSX
  - Vue更新自动绑定依赖，React开发者setState
---
20. Hook 内部实现原理
---
21. qiankun 的微应用如何判断当前应用在基座上还是独立运行
window.__POWERED_BY_QIANKUN__可以判断是否在qiankun框架内
---
22. 如何实现类似 Keep-alive 的效果？(类似两个应用同时运行)
---
配置activeRule使两个应用处于激活状态
23. umi 框架设计中，有哪些部分是值得借鉴的？
  - 脏代码文件放.umi里面处理，不需要用户自己关注
  - 约定式路由，新建文件夹就创建了路由
  - 插件系统，umi暴露生命周期来实现插件，本身也是自带多个插件
---
24. 新项目需求，会从哪几个方面考虑使用什么技术栈?
  - 从团队技术栈上分析
  - 从尺寸大小，React相对更大
---
25. React 和 Vue 的 diff 算法上的区别
  - React Diff
    - 若两个组件属于同一个类型，他们将拥有相同的DOM树形结构
    - 处于同一层级的一组子节点，课用通过设置key作为唯一标识从而维持各个节点在不同渲染过程中的稳定性
---
26. 如果一个游戏应用在部分机型上出现卡顿，从哪几个点上去分析？
---
27. 事件循环，微任务后面再碰到一个微任务的话，是会将这个微任务加在原来队列上，还是下一次循环？
---
28. 重绘(页面刷新)是宏任务还是微任务？如果不是的话在哪个任务的前面还是后面？（请补充代码解释）
---
29. GPU 加速如何开启？是否需要一直开启，理由？
- 使用transform: translateZ(0)
- will-change
不需要一直开启，因为移动端上耗电高，有些场景使用CPU处理更快
---
30. 原型链的应用
  - 扩展数组的方法
  - Vue2
31. 组合寄生继承、寄生继承等继承方式的优缺点
---
32. 300kb 的资源在正常网络请求下返回的时间大概是？
200毫秒
33. 打包的优化手段
---
34. webpack 的 hash 模式有哪几种？
  - hash
  其中一个文件修改了，所以其他的文件的hash也会跟着修改
  - chunk hash
  chunk hash根据不同的入口文件(Entry)进行依赖解析并构建对应的chunk和hash
  - content hash
  文件内容级别，只有文件内容变了才会更新相应文件的hash
---
35. 删除构造函数的原型对象会发生什么？
---
36. 移动端除了 REM 以外还有其他解决响应式页面的方案吗？
---
37. LocalStorage 实现一定的时间后过期
跟Expire一样设置过期时间即可
---
38. 有开发过什么比较难或者印象比较深刻的项目吗？
---
39. 有了解过 pnpm 吗？
---
40. 正则的贪婪如何写？
---
41. TS 的高级类型有哪些？
- `Partial<Type>`
将类型定义的所有属性都修改为可选
```
type Partial<T> = {
  [P in keyof T]?: T[P];
}
```
- `Readonly<Type>`
将类型定义的所有属性都修改为可读
```
type Readonly<T> = {
  readonly [P in keyof T]: T[P]; 
}
```
- `Pick<Type, Keys>`
从中选一组属性Keys
```
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
}
```
- `Record<Keys, Type>`
```
// 将K中的每个属性都转换为T类型
// keyof any => string | number | symbol
type Record<K extends keyof any, T> = {
  [P in K]: T;
}
```
- `Omit<Type,Keys>`
Type通过从中选择所有属性然后删除Keys
- `Required<Type>`
- `Exclude<UnionType, ExcludedMembers>`
- `Extract<Type, Union>`
- `ReturnType<Type>`
- `NonNullable<Type>`
- `Parameters<Type>`
- `ConstructorParameters<Type>`
- `InstanceType<Type>`
- `ThisParameterType<Type>`
- `OmitThisParameter<Type>`
- `ThisType<Type>`
42. 使用 Hook 有什么坑或者注意的地方？
   - 要在React函数内
   - 不能在循环体或者条件语句里(确保Hooks在每次渲染时都保持同样的执行顺序)
   - 闭包导致渲染旧值，可以用ref处理
---
43. react17 的新特性有了解吗？
  - 事件合成的三处改动
---
44. 为什么数组的插入比链表复杂？
---
45. interface 和 type 的区别？

- interface 可以 extends, type 不允许 extends，不过可以通过交叉类型实现。
- type 可以声明基本类型别名，联合类型，元组等类型
- type 语句中还可以使用 typeof 获取实例的 类型进行赋值
- interface 能够声明合并
---
46. webpack 的生命周期
> 常用就这两个
  - **compile**
  - **compilation**
47. Proxy 和 Reflect

48. 为什么需要 Map
对象的key只能是字符串或者数字，Map的key可以是任意值。
49. TCP 滑动窗口
50. 判断链表是否有环
  - hash
  - 快慢指针
51. DPI/PPI/设备像素/独立像素
52. postCSS 的 pxtorem 处理流程
以设计稿宽度作为最理想的基准屏幕宽度，假设设计稿宽度是750px，那么基准屏幕宽度就是750px，宽度大于750px的屏幕，就等同于比例放大的页面，小于750px的屏幕等同于比例小了页面。  
把设计稿750px十等分，每份75px，我们可以把这个75px当作1个rem单位，那么750px宽度等于10rem。   
设置html的font-size: 75px，即1rem，也就是rem的基准是75px。
设计稿上的元素换算公式： 原始px/rem基准px；例如`240px * 120px`，其实就是`3.2rem * 1.6rem`。
53. vue3 中为什么使用`Proxy`替换原来的`Object.defineProperties`
  Proxy可以对整个对象进行代理，可以监听对象某个属性值的变化，还能监听对象属性的新增和删除。defineProperties只能对已存在的属性添加对应的getter和setter，并不能监听对象的新增和删除。
---
54. 请描述一下 vue3 的静态标记和事件监听器缓存(cacheHandlers)
55. 如何将闭包中泄漏的内存进行释放？
对内存泄漏的变量进行null赋值
56. Symbol.for
> 场景：重新使用同一个`Symbol`
和 Symbol() 不同的是，用 Symbol.for() 方法创建的的 symbol 会被放入一个全局 symbol 注册表中。Symbol.for() 并不是每次都会创建一个新的 symbol，它会首先检查给定的 key 是否已经在注册表中了。假如是，则会直接返回上次存储的那个。否则，它会再新建一个。
57. 如何用代码去体现 Map 和 WeakMap 区别？
```
let map = new Map();
let key = new Array(5 * 1024 * 1024);
map.set(key, 1);
map.delete(key);
key = null; // 如果使用WeakMap不需要置空
```
可以用`node --expose-gc`进行手动gc(`global.gc()`)，`process.memoryUsage()`通过观察内存大小来判断是否清理了内存
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
66. 前端异常/错误拦截的方法
  - Promise没有进行Catch
    监听unhandledrejection
  - 语法错误
  监听window.onerror事件
  - 资源加载错误
  在资源标签上使用onerror监听
  - 页面崩溃
  使用Worker
  - 框架自身带有错误处理
  Vue的errorHandler
  - AJAX

67. 为什么js是单线程的，有什么优点和缺点？
优点：
  - 多线程会有复杂的同步问题：线程A在某个节点上新增内容，线程B删除了该节点
缺点：
68. 事件执行栈是什么
所有的任务分为同步任务和异步任务。    
同步任务在主线程上排队执行(形成一个执行栈)，异步任务不进入主线程、而进入任务队列，当任务队列通知主线程，某个异步任务可以执行，该任务才会进入主线程执行。
  - 执行栈 
  所有的js都在执行上下文中进行的(全局执行上下文/函数执行上下文/Eval执行上下文)，当引擎第一次遇到js代码就会产生一个全局执行上下文并压入执行栈；每遇到一个函数调用就往栈中压入一个新的上下文。引擎执行栈顶的函数，执行完毕弹出当前执行上下文。
  - 调用栈
  ```
  const second = () => {
    console.log('Hello there!')
  }
  const first = () => {
    console.log('Hi there!');
    second();
    console.log('The End');
  }
  first();
  ```
  - main()
  - main() <- first()
  - main() <- first() <- console.log('Hi there!')
  - main() <- first() <- second() <- console.log('Hello there!') 
  - main() <- first() <- second() <- console.log('The End');
  - main() <- first() <- second()
  - main() <- first()
  - main()
69. 如何自定义原生事件
```
var event = new Event('build');

// Listen for the event.
elem.addEventListener('build', function (e) { ... }, false);

// Dispatch the event.
elem.dispatchEvent(event);
```
70. 最近chrome限制的same-site是怎么回事
chrome80会默认(SameSite: lax)在跨域请求的情况下不允许携带cookie给后端，导致所有跨域场景下使用cookie进行鉴权的服务都会受到影响。    
网站可以选择显式关闭SameSite属性，并将其设为None，不过前提是设置Secure属性(Cookie只能通过HTTPS协议发送)
71. setState是同步还是异步
`isBatchingUpdates`决定是否异步，默认为false表示不会让setState异步执行。
> 简单来说就是经过React处理的事件是不会同步更新；通过addEventListener || setTimeout / setInterval
72. Symbol的作用是什么，为什么需要？
73. new的执行过程
74. Object.is和===区别
  基本一致，但是Object.is下:
  1. +0不等于-0
  2. NaN相等

75. 流程编辑器，节点连线的时候，靠近节点的一段需要做一个吸附的效果，如何实现？如果节点数量很多，如何优化？
- ROI算法
- 数据结构转换成二叉树，加快搜索速度
76. URL/URI/URN

77. webpack的module、chunk、bundle是什么？
其实是同一份代码在不同场景下的名字
- module
开发者手写的代码
- chunk
webpack处理的代码
- bundle
浏览器执行的代码

---
78. for...in遍历顺序
整数属性排序先遍历，其他属性按照创建顺序出现

79. package.json里面browser/module/main这几个字段的作用
都是定义npm包的入口文件
- main: browser环境和node环境均可使用
- module: ESM规范的入口文件，browser环境和node环境均可使用
- browser: browser环境下的入口文件

80. 什么是canvas污染
81. canvas如何进行性能分析
82. canvas常见的渲染优化
- 离屏预渲染(双缓存)
- 避免浮点坐标
- 使用多层画布
- 减少ctx的状态机(多次移动线段，但是只有一次stroke)

83. 100 * 100的Canvas占内存多少？
一个像素包括rgba，里面都是0~255，即2^8 = 1Byte
所以100 * 100 * 4byte = 40000byte

84. CDN命中率低
原因可能如下：    
- HTTP Header设置不当
- 动态资源过多，CDN主要加速对象为静态资源
- 缓存刷新操作频繁
- head请求不缓存
- 资源访问量较低
85. Webpack工作流程
  1. 初始化参数
  从配置文件和`Shell`语句中读取与合并参数，得出最终的参数
  2. 开始编译
  用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的`run`方法开始执行编译
  3. 确定入口
  根据配置中的`entry`找出所有的入口文件
  4. 编译模块
  从入口文件出发，调用所有配置的`Loader`对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
  5. 完成模块编译
  在经过第4步使用`Loader`翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
  6. 输出资源
  根据入口和模块之间的依赖关系，组装成一个个包含多个模块的`Chunk`，再把每个`Chunk`转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
  7. 输出完成
  在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统
86. CDN plugin
1. 将编译好的文件上传到CDN
2. 生成对应的资源引入链接
3. 刷新缓存
87. 受控组件/非受控组件
- 受控组件
受状态控制的组件，需要与状态进行相应的绑定
 - 必须有onChange事件
 - 可以设置初始值
- 非受控组件
组件控制是通过DOM而不是状态
87. 什么是SSR
服务端渲染 SSR (Server-Side Rendering)，是指在服务端完成页面的html 拼接处理， 然后再发送给浏览器，将不具有交互能力的html结构绑定事件和状态，在客户端展示为具有完整交互能力的应用程序。
88. 什么是预渲染(Prerender)
无需使用web 服务器实时动态编译 HTML，而是使用预渲染方式，在构建时 (build time) 简单地生成针对特定路由的静态 HTML 文件。
如果项目中使用 webpack，你可以使用 prerender-spa-plugin 轻松地添加预渲染，后面将会具体实现。

> 原理是在 Webpack 构建阶段的最后，在本地启动一个 Puppeteer 的服务，访问配置了预渲染的路由，然后将 Puppeteer 中渲染的页面输出到 HTML 文件中，并建立路由对应的目录。

89. SSR的流式渲染
> 一般来说，流式渲染就是把 HTML 分块通过网络传输，然后客户端收到分块后逐步渲染，提升页面打开时的用户体验。通常是利用HTTP/1.1中的分块传输编码（Chunked transfer encoding）机制。
90. 如何理解React Suspense
91. CSS固定高宽比
- padding-bottom/height: 0/position: absolute;
> 垂直方向上的内外边距使用百分比做单位时，是基于包含块的宽度来计算的。
- aspect-ratio
92. 回流和重绘
因为浏览器采用流式布局(Flow Based Layout)，对于render tree的计算只需要一次，但是table及其内部元素可能需要更多次次数的运算。
- 回流
> 当Render Tree中部分或全部元素的尺寸、结构、或某些属性发生改变时，浏览器重新渲染部分或全部文档的过程称为回流。
- 重绘
  - 页面首次渲染
  - 浏览器窗口大小发生改变
  - 元素尺寸或位置发生改变
  - 元素内容变化（文字数量或图片大小等等）
  - 元素字体大小变化
  - 添加或者删除可见的DOM元素
  - 激活CSS伪类（例如：:hover）
  - 查询某些属性或调用某些方法：
    - clientWidth、clientHeight、clientTop、clientLeft
    - offsetWidth、offsetHeight、offsetTop、offsetLeft
    - scrollWidth、scrollHeight、scrollTop、scrollLeft
    - scrollIntoView()、scrollIntoViewIfNeeded()
    - getComputedStyle()
    - getBoundingClientRect()
    - scrollTo()
- 重绘
> 当页面中元素样式的改变并不影响它在文档流中的位置时（例如：color、background-color、visibility等），浏览器会将新样式赋予给元素并重新绘制它，这个过程称为重绘。
93. webpack的tapable架构

94. babel-plugin-import原理
> babel-plugin-import实现组件库的按需加载
  1. 收集依赖
  2. 判断是否被使用，生成新的import语句
  3. 生成引入代码，样式的import语句

95. webpack5的MF是什么？可以做什么？



96. Promise的缺点
1. 当处于pending的时候无法知道当前运行到哪个阶段
2. 无法取消Promise，无法中途取消
3. 不设置回调函数无法获取Promise内部错误

97. 为什么0.1+0.2不等于0.3
JavaScript遵循国际IEEE 754标准，将数字存储为双精度浮点数。
可以用除2法获取0.1的二进制
0.1*2＝0.2……0——整数部分为“0”。整数部分“0”清零后为“0”，用“0.2”接着计算。
0.2*2＝0.4……0——整数部分为“0”。整数部分“0”清零后为“0”，用“0.4”接着计算。
0.4*2＝0.8……0——整数部分为“0”。整数部分“0”清零后为“0”，用“0.8”接着计算。
0.8*2＝1.6……1——整数部分为“1”。整数部分“1”清零后为“0”，用“0.6”接着计算。

98. 为什么tree-shaking依赖ESM
  1. import的模块名只能是字符串常量
  2. 只能在模块顶层的语句出现，不能出现在function里面或者if里面
  3. 不关import的语句出现的位置在哪，在模块初始化的时候所有的import都必须导入完成(ES6 imports are hoisted)
  4. import binding是immutable的，类似const。

99. 为什么Vue3开始支持多根节点
以前Vue2的虚拟DOM基于Snabbdom，为了提高diff性能只有一个根节点。
100. DOM树
- 遇到script标签会停止对DOM解析(避免JS对DOM操作)，直到JS加载完毕并且执行完成
  - async 
  请求该脚本的网络请求是异步的，不会阻塞浏览器解析 HTML，一旦网络请求回来之后，如果此时 HTML 还没有解析完，浏览器会暂停解析，先让 JS 引擎执行代码，执行完毕后再进行解析，
  - defer
  获取该脚本的网络请求也是异步的，不会阻塞浏览器解析 HTML，一旦网络请求回来之后，如果此时 HTML 还没有解析完，浏览器不会暂停解析并执行 JS 代码，而是等待 HTML 解析完毕再执行 JS 代码
  > 在DOMContentLoaded事件调用前执行
- 遇到style，解析CSS转成CSSOM，不会停止解析，但是会停止渲染(避免重复渲染)

100. Symbol.iterator
101. ci/cd流程
102. redux如何驱动react视图更新的