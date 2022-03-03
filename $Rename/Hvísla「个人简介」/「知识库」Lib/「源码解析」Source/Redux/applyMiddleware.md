# applyMiddleware
> 下面代码经过简化
```
function applyMiddleware (...middlewares) {
  return createStore => (reducer, preloadedState) => {
    // 创建Store
    const store = createStore(reducer, preloadedState)
    // 避免中间件链的串联过程中，dispatch被调用
    let dispatch: Dispatch = () => {
      throw new Error(...)
    }
    // 中间件的参数
    const middlewareAPI: MiddlewareAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args)
    }
    // 这里需要注意所有中间件middleware都是HOC函数(外层函数)
    // 外层函数的主要作用是获取 dispatch、getState
    // 这里最终获取内层函数数组
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    // 改写dispatch，面向切面(AOP)
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}
```