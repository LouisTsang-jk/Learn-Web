# React
## 常见面试题目
- React事件机制
在document处监听了所有事件，当事件发生并冒泡到document的时候，React将事件内容封装并交到真正的处理函数运行。可以减少内存消耗，还能在组件挂载/销毁的时候统一订阅和移除事件。
> 冒泡到document上的事件也不是原生事件，是React自己实现的合成事件(SyntheticEvent)。
合成事件  
1. **合成事件抹平了不同浏览器之间的兼容问题，并且提供了跨浏览器开发的能力。**
2. 事件全部存放在一个数组，避免频繁的增删(垃圾回收)
3. 方便react统一管理和事务机制。
4. 原生事件先执行，合成事件后执行。
- React事件和原生HTML事件区别
1. 原生事件`全小写`，React事件采用`小驼峰`
2. 事件函数处理语法，原生事件采用`字符串`，React事件为`函数`
3. React事件不能通过`return false`阻止浏览器的默认行为，而需要使用`preventDefault`来阻止默认行为。
- 什么是React-Fiber，解决了什么问题
React v15在渲染的时候会递归对比VirtualDOM树，找出变动的节点并同步更新。这个阶段React会占据浏览器资源，导致用户触发的事件无法响应，感知到明显的卡顿和掉帧。
React Fiber将这个执行过程改成可以中断，并在适当的时候腾出CPU执行权。
React Fiber优点：
1. 浏览器及时响应用户交互
2. 分批延时对DOM操作，避免一次性操作大量DOM节点
3. 浏览器会对代码进行编译优化(JIT)以及热代码优化，或者对reflow进行修正。
- React Portals
> Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案
可以使组件脱离父组件层级，挂载在DOM树的任何未知。
- React如何避免不必要的render
1. 使用React.memo
- 对React context理解
在某些场景React单向数据流不适用，组件层级比较多的时候需要层层传入prop。
Context提供了一种在组件之间共享此类值的方式。可以将Context理解成特定组件树内共享的store。
- React中什么是受控组件/非受控组件
1. **受控组件**在使用表单收集用户输入的时候，`input`等元素会绑定一个`change`事件，当表单的状态发生变化，就会触发change事件。
> 表单的值都是React组件进行管理，当有多个组件的值需要获取的时候就需要编写事件处理函数。
2. **非受控组件**，如果一个表单组件没有`value props`时，就可以成为非受控组件，非受控组件可以通过一个ref来从DOM获取表单的值
- 类组件和函数组件的区别
    - **相同点**
    1. 都是React可复用的最小代码片段，返回页面中渲染的React元素。
    - **不同点**
    1. 开发心智模型不一致。类组件面向对象(继承/生命周期等概念)。函数组件是函数式编程(immutable/无副作用/引用透明)。
    2. 类组件通过`shouldComponentUpdate`阻断渲染来提升性能，函数组件则依靠`React.memo`缓存渲染结果来提升性能。
    3. 类组件会因为生命周期带来的复杂度导致不易优化。
- React setState调用的原理
    1. 调用`setState`入口函数(分发器)，根据入参不同，分发到不同的功能函数中去。
    ```
        ReactComponent.prototype.setState = function (partialState, callback) {
        this.updater.enqueueSetState(this, partialState);
        if (callback) {
            this.updater.enqueueCallback(this, callback, 'setState');
        }
        };
    ```
    2. `enqueueSetState`方法，将新的`state`放进组件的状态队列里，并调用`enqueueUpdate`来处理要更新的实例对象。
    ```
        enqueueSetState: function (publicInstance, partialState) {
        // 根据 this 拿到对应的组件实例
        var internalInstance = getInternalInstanceReadyForUpdate(publicInstance, 'setState');
        // 这个 queue 对应的就是一个组件实例的 state 数组
        var queue = internalInstance._pendingStateQueue || (internalInstance._pendingStateQueue = []);
        queue.push(partialState);
        //  enqueueUpdate 用来处理当前的组件实例
        enqueueUpdate(internalInstance);
        }
    ```
    3. 在 enqueueUpdate 方法中引出了一个关键的对象——batchingStrategy，该对象所具备的isBatchingUpdates 属性直接决定了当下是要走更新流程，还是应该排队等待；如果轮到执行，就调用 batchedUpdates 方法来直接发起更新流程。由此可以推测，batchingStrategy 或许正是 React 内部专门用于管控批量更新的对象。
    ```
        function enqueueUpdate(component) {
        ensureInjected();
        // 注意这一句是问题的关键，isBatchingUpdates标识着当前是否处于批量创建/更新组件的阶段
        if (!batchingStrategy.isBatchingUpdates) {
            // 若当前没有处于批量创建/更新组件的阶段，则立即更新组件
            batchingStrategy.batchedUpdates(enqueueUpdate, component);
            return;
        }
        // 否则，先把组件塞入 dirtyComponents 队列里，让它“再等等”
        dirtyComponents.push(component);
        if (component._updateBatchNumber == null) {
            component._updateBatchNumber = updateBatchNumber + 1;
        }
        }
    ```
    4. React中的setState批量更新的过程是什么？
      调用`setState`时，组件的`state`并不会立即改变，`setState`只是把要修改的`state`放到一个队列，执行的时候会将多次`setState`的状态修改合并成一次状态修改，最终只产生一次组件及其子组件的重新渲染。

# 参考
[React面试题](https://juejin.cn/post/6941546135827775525)