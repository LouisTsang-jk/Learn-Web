# Router
## 动机
> SPA允许页面在不刷新的情况下更新页面内容
SPA不会记录操作，同时对SEO不友好
## 概念
### 路由(Route)
负责定义路径与组件之间的映射关系
### 导航(Link)
负责触发路径改变
### 路由器
根据Route定义出来的映射关系为新的路径匹配对应的逻辑
> 路由器负责感知路由的变化并作出反应
- BrowserRouter
 使用HTML5的history API控制路由跳转
 > `go`、`forward`、`back`等方法调用确实会触发popstate，但是`pushState`和`replaceState`不会
 ```
window.addEventListener('popstate', function (event) {
  // 根据state变化更新内容
})
```
- HashRouter
 使用URL的hash属性来控制路由
```
window.addEventListener('hashchange', function (event) {
  // 根据hash变化更新内容
}, false)
```