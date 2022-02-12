1. 简单请求/复杂请求
简单请求满足以下两个条件：
  - 请求方法是HEAD/GET/POST
  - HTTP头信息不超出以下几个字段
    - Accept
    - Accept-Language
    - Content-Language
    - Last-Event-ID
    - Content-Type只能是三值其一
      - application/x-www-form-urlencoded
      - multipart/form-data
      - text/plain
除简单请求外的请求都是复杂请求，其中Axios都是复杂请求
> 复杂请求在正式请求之前都会有预检请求，在浏览器中都能看到有OPTIONS请求，用于向服务器请求权限信息
2. 缓存中no-store和no-cache区别
`no-store`: 禁用缓存
`no-cache`: 使用缓存之前重新请求
3. 常见 深克隆/浅克隆方式
  - 浅克隆
  创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址，所以如果其中一个对象改变了这个地址，就会影响另外一个对象。
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
      - 循环引用，需要额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，当需要拷贝当前对象的时候就去存储空间中查找；一般我们可以选择WeakMap这种数据结构，因为Map的话对象间可能存在强引用关系，导致内存无法被释放
      - function
      - null
      - Symbol
4. 常见Hook
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
5. let和var的区别
6. 观察者模式和订阅发布模式的区别
7. 对称加密和非对称加密
`对称加密`: 加密解密都是一个密钥
`非对称加密`: 加密解密是两个密钥
8. 除了bind、call、apply还有什么更改this指向的方法
使用new也能改变this的指向
9. jsx的本质
React.createElement
10. React.createElement参数
  参数：   
  1. HTML标签名称。e.g.: ul、li
  2. 属性。e.g.: className
  3. 子节点。
11. React事件合成
React自己实现了一套高效的事件注册，存储，分发和重用逻辑。在DOM事件体系基础上改进，减少了内存消耗，简化事件逻辑，并最大化解决IE等浏览器的不兼容问题。与DOM事件体系相比，有以下特点：   
  1. React组件上声明的事件最终绑定到`document`这个DOM节点上(react17注册到`root`)，而不是React组件对应的DOM节，简化了DOM原生事件，减少了内存开销。
  2. React以队列的方式，从接触事件的组件向父组件回溯，调用在JSX中声明的callback。也就是React自身实现了一套事件冒泡机制。我们没办法使用`event.stopPropagation()`来停止事件传播，而应该使用`event.preventDefault()`。
  3. React有自己一套的合成事件SyntheticEvent，不同类型的事件会构造不同的SyntheticEvent。
  4. React使用对象池来管理合成事件对象的创建和销毁，这样减少了垃圾的生成和新对象内存分配，从而提高性能
  优点：   
  - 分层设计：解决跨平台问题
  - 性能优化：使用事件代理统一接收原生事件的触发，从而使真实DOM上不需要绑定事件
  - 挟持事件：对事件进行归类，可以在事件产生的任务上包含不同的优先级，最终决定对应的更新应该在什么时机进行
  - 提供合成事件对象：抹平浏览器的兼容性差异
  主要整个事件系统分为三部分：   
  1. 事件注册
  2. 事件存储
  3. 事件执行
12. useEffect如何监听页面销毁
13. Class组件和Hook组件区别
14. cdn原理
15. DNS过程
16. 为什么React和Vue都需要虚拟DOM
17. React数据流/组件间通信
19. Vue数据流/组件间通信
18. Vue和React的区别
20. Hook内部实现原理
21. qiankun的微应用如何判断当前应用在基座上还是独立运行
22. 如何实现类似Keep-alive的效果？(类似两个应用同时运行)
23. umi框架设计中，有哪些部分是值得借鉴的？
24. 新项目需求，会从哪几个方面考虑使用什么技术栈?
25. React和Vue的diff算法上的区别
26. 如果一个游戏应用在部分机型上出现卡顿，从哪几个点上去分析？
27. 事件循环，微任务后面再碰到一个微任务的话，是会将这个微任务加在原来队列上，还是下一次循环？
28. 重绘(页面刷新)是宏任务还是微任务？如果不是的话在哪个任务的前面还是后面？
29. GPU加速如何开启？是否需要一直开启，理由？
30. 原型链的应用
31. 组合寄生继承、寄生继承等继承方式的优缺点
32. 300kb的资源在正常网络请求下返回的时间大概是？
33. 打包的优化手段
34. webpack的hash模式有哪几种？
35. 删除构造函数的原型对象会发生什么？
36. 移动端除了REM以外还有其他解决响应式页面的方案吗？
37. LocalStorage实现一定的时间后过期
38. 有开发过什么比较难或者印象比较深刻的项目吗？
39. 有了解过pnpm吗？
40. 正则的贪婪如何写？
41. TS的高级类型有哪些？
  -
42. 使用Hook有什么坑或者注意的地方？
43. react17的新特性有了解吗？
44. 为什么数组的插入比链表复杂？
45. interface和type的区别？
  - interface可以extends, type不允许extends，不过可以通过交叉类型实现。
  - 
46. webpack的生命周期
47. Proxy和Reflect
48. 为什么需要Map
49. TCP滑动窗口
50. 判断链表是否有环
51. DPI/PPI/设备像素/独立像素
52. postCSS的REM处理流程
53. vue3中为什么使用`Proxy`替换原来的`Object.defineProperties`
54. 请描述一下vue3的静态标记和事件监听器缓存(cacheHandlers)
55. 如何将闭包中泄漏的内存进行释放？
56. Symbol for
