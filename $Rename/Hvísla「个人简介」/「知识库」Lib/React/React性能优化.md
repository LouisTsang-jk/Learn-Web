# React性能优化
- shouldComponentUpdate规避冗余的更新逻辑
- PureComponent + Immutable.js
> PureComponent将会在`shouldComponentUpdate`中对组件更新前后的props和state进行`浅比较`并根据浅比较的结果决定是否需要更新流程
> Immutable.js是为了解决PureComponent浅比较带来的问题(可能重复渲染或者漏渲染)
- React.memo与useMemo
  - React.memo
  控制是否需要重渲染一个组件，只比较props
  - useMemo
  控制是否需要重复执行某一段逻辑，实现更加精细的memo管控，同时也弥补React.memo无法感知函数内部状态(state)的问题