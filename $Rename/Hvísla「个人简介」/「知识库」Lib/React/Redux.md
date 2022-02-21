# Redux
Redux可以认为是Flux的一种实现形式，因为Redux在实现层面并没有按照Flux的规则来(Flux可以实现多个Store)
## 概念
### Flux
> 核心在于严格的单向数据流下，状态的变化是可预测的
1. View
用户界面
2. Action
视图层发出的消息，触发应用状态的改变
3. Dispatcher
对action进行分发
3. Store
存储应用状态的"仓库"，此外还会定义修改状态的逻辑

### 数据流
```mermaid
graph TD
    E[Action] --> A[Dispatcher] --> B[Store] --> C[View] --> D[Action] --> A
```
## 组成
- Store
单一数据源，只读
- Action
对变化的描述
- Reducer
负责对变化进行分发和处理，最终将新的数据返回给Store 


## 工作
### createStore
```mermaid
graph TD
    A["1. 调用createStore"] --> B["2. 处理没有传入初始状态(前两个入参都为function)的情况"]
    B --> C["3. 若enhancer不为空，则用enhancer包装createStore"]
    C --> D["4. 定义内部变量"]
    D --> E["5. 定义ensureCanMutateNextListeners方法<br />该方法用于确保currentListeners与nextListeners不指向同一个引用"]
    E --> F["6. 定义getState方法，该方法用于获取当前状态"]
    F --> G["7. 定义subscribe方法，该方法用于注册listeners(订阅监听函数)"]
    G --> H["8. 定义dispatch方法，该方法用于派发action、调用reducer并触发订阅"]
    H --> I["9. 定义replaceReducer方法，该方法用于替换reducer"]
    I --> J["10. 执行一次dispatch，完成状态的初始化"]
    J --> K["11. 定义observable方法"]
    K --> L["12. 将步骤6~11定义的方法放进store对象中返回"]
```
---
### dispatch
```mermaid
graph TD
  A["1. 调用dispatch，入参为action对象"] --> B["2. 前置校验"]
  B --> C["3. “上锁”：将isDispatching置为true"]
  C --> D["4. 调用reducer，计算新的state"]
  D --> E["5. “解锁”：将disDispatching置为false"]
  E --> F["6. 触发订阅"]
  F --> G["7. 返回action"]
```
> 这里设置isDispatching是避免开发者在reducer中手动调用dispatch，避免死循环

### subscribe
1. 在store对象创建成功后
通过调用`store.subscribe`来注册监听函数
2. 当`dispatch action`发生时
Redux会在reducer执行完毕后将listeners数组中的监听函数逐个执行

> 为什么需要currentListeners和nextListeners两个listeners数组
> currentListeners: 确保监听函数执行过程的稳定性
> nextListeners: 注册监听/触发订阅/取消监听 都是该数组


### 中间件
```
import { createStore, applyMiddleware } from 'redux';
...
const store = createStore(
  reducer,
  initial_state,
  applyMiddleware(middleware1, middleware2,...);
)
```