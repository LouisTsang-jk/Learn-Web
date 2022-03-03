# createStore

## 简化代码

```
function createStore (reducer, preloadedState, enhancer) {
  ...
  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer
    [$$observable]: observable
  }
}
```

### 入参

- reducer
- preloadedState
- enhancer

### 返回

### 函数体

> 下面代码经过简化

1. 首先处理如果 preloadedState 是函数且 enhancer 为空，则认为用户传入的 preloadedState 是 enhancer，preloadedState 实际为空

```
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState
    preloadedState = undefined
  }
```

2. enhancer 是函数的话，则将 createStore 作为参数传入
[applyMiddleware分析](../Redux/applyMiddleware.md)
```

if (typeof enhancer === 'function') {
    return enhancer(createStore)(
      reducer,
      preloadedState
    )

}

```

3. 声明变量

- `let currentReducer = reducer`
  记录当前 reducer，`replaceReducer`会改变 reducer 内容
- `let currentState = preloadedState`
  记录当前 state
- `let currentListeners: (() => void)[] | null = []`
  subscribe 订阅的事件
- `let nextListeners = currentListeners`
  当前 currentListeners 快照
- `let isDispatching = false`
  记录当前是否进行 dispatch

4. 生成 currentListeners 的浅拷贝结果，使用 nextListeners 作为调度的临时数组
   > 防止调度过程中发生订阅/取消事件导致消费者的调用错误

```
  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice()
    }
  }
```

5. 获取当前状态

```
  function getState() {
    if (isDispatching) {
      throw new Error(...)
    }

    return currentState
  }
```

6. 订阅事件

```
function subscribe (listener) {
  ...
  1. 判断是否处于dispatching，禁止在reducer中调用subscribe
  2. let isSubscribed = true
  这里上锁，防止多次调用`unsubscribe`函数
  3. 调用ensureCanMutateNextListeners()
  4. nextListeners.push(listener)
  注册监听函数
  5. 返回取消当前订阅的函数`unsubscribe`
}
```

7. 定义 dispatch，用于派发 action

```
function dispatch (action) {
  ...
  1. 检验action合法性，判断是否Plain Object
  2. 判断是否处于dispatch，防止嵌套(isDispatching)
  3. 调用reducer，计算新的state
```

    currentState = currentReducer(currentState, action);

```
4. 解锁(isDispatching)
5. 触发订阅
}
```

8. 定义 replaceReducer，可以更改当前的 reducer

```
function replaceReducer (nextReducer) {
  currentReducer = nextReducer
  dispatch({ type: ActionTypes.REPLACE })
  return store
}
```
9. observable方法
10. `dispatch({ type: ActionTypes.INIT })`
初始化state

## 总结
1. 如果有中间件(enhancer)，则使用中间件包装createStore
2. 定义内部变量
  - 当前值
    - currentReducer
    - currentState
    - currentListeners
  - 锁
    - isDispatching
3. 定义方法
  - ensureCanMutateNextListeners方法确保currentListeners和nextListeners不是同个引用
  - getState方法用来获取当前State
  - subscribe方法用来注册listeners(订阅监听函数)
  - dispatch方法用来派发action、调用reducer并触发订阅
  - replaceReducer方法用来替换reducer
  - 执行dispatch进行状态初始化