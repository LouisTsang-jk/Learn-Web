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
      - 循环引用，需要额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，当需要拷贝当前对象的时候就去存储空间中查找；一般我们可以选择WeakMap这种数据结构，因为Map的话对象间可能存在强引用关系，导致内存无法被释放
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
6. 观察者模式和订阅发布模式的区别
7. 对称加密和非对称加密
   `对称加密`: 加密解密都是一个密钥
   `非对称加密`: 加密解密是两个密钥
8. 除了 bind、call、apply 还有什么更改 this 指向的方法
   使用 new 也能改变 this 的指向
9. jsx 的本质
   React.createElement
10. React.createElement 参数
    参数：
11. HTML 标签名称。e.g.: ul、li
12. 属性。e.g.: className
13. 子节点。
14. React 事件合成
    [React 事件合成](/$Rename/Hvísla「个人简介」/「知识库」Lib/React事件合成.md)
15. useEffect 如何监听页面销毁
16. Class 组件和 Hook 组件区别
17. cdn 原理
18. DNS 过程
19. 为什么 React 和 Vue 都需要虚拟 DOM
20. React 数据流/组件间通信
21. Vue 数据流/组件间通信
22. Vue 和 React 的区别
23. Hook 内部实现原理
24. qiankun 的微应用如何判断当前应用在基座上还是独立运行
25. 如何实现类似 Keep-alive 的效果？(类似两个应用同时运行)
26. umi 框架设计中，有哪些部分是值得借鉴的？
27. 新项目需求，会从哪几个方面考虑使用什么技术栈?
28. React 和 Vue 的 diff 算法上的区别
29. 如果一个游戏应用在部分机型上出现卡顿，从哪几个点上去分析？
30. 事件循环，微任务后面再碰到一个微任务的话，是会将这个微任务加在原来队列上，还是下一次循环？
31. 重绘(页面刷新)是宏任务还是微任务？如果不是的话在哪个任务的前面还是后面？（请补充代码解释）
32. GPU 加速如何开启？是否需要一直开启，理由？
33. 原型链的应用
34. 组合寄生继承、寄生继承等继承方式的优缺点
35. 300kb 的资源在正常网络请求下返回的时间大概是？
36. 打包的优化手段
37. webpack 的 hash 模式有哪几种？
38. 删除构造函数的原型对象会发生什么？
39. 移动端除了 REM 以外还有其他解决响应式页面的方案吗？
40. LocalStorage 实现一定的时间后过期
41. 有开发过什么比较难或者印象比较深刻的项目吗？
42. 有了解过 pnpm 吗？
43. 正则的贪婪如何写？
44. TS 的高级类型有哪些？

-

42. 使用 Hook 有什么坑或者注意的地方？
43. react17 的新特性有了解吗？
44. 为什么数组的插入比链表复杂？
45. interface 和 type 的区别？

- interface 可以 extends, type 不允许 extends，不过可以通过交叉类型实现。
-

46. webpack 的生命周期
47. Proxy 和 Reflect
48. 为什么需要 Map
49. TCP 滑动窗口
50. 判断链表是否有环
51. DPI/PPI/设备像素/独立像素
52. postCSS 的 REM 处理流程
53. vue3 中为什么使用`Proxy`替换原来的`Object.defineProperties`
54. 请描述一下 vue3 的静态标记和事件监听器缓存(cacheHandlers)
55. 如何将闭包中泄漏的内存进行释放？
56. Symbol for
57. 如何用代码去体现 Map 和 WeakMap 区别？
