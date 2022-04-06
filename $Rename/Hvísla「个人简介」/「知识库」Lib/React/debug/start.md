# 调试环境
[Github | debug-react-source-code](https://github.com/Terry-Su/debug-react-source-code)
## 调试代码
```
function App() {
  debugger;
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    console.log('effect');
  }, [])
  return (
    <div>
      <div>Hello, React Source Code!</div>
      <div>Number: {count}</div>
      <button onClick={() => setCount((v) => v + 1)}>Increment</button>
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector("#app"));

```
## 初次渲染
- useState
  - mountHookTypesDev
  - mountState
    - mountWorkInProgressHook
    创建新的hook数据并挂在到`currentlyRenderingFiber$1.memoizedState`
    > `ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher`
    ```
    var hook = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    ```
    - 维护dispatcher
    ```
    var queue = hook.queue = {
      pending: null,
      dispatch: null,
      lastRenderedReducer: basicStateReducer,
      lastRenderedState: initialState
    };
    ```
    - dispatchAction(fiber, queue, action)
      - ...todos
    - 返回[initialState, dispatchAction.bind(null, currentlyRenderingFiber$1, queue)]