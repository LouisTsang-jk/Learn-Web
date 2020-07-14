# v-html
- 预期： 
`any`
- 详细：
根据表达式的值的`truthiness`来有条件地渲染元素。在切换状态时，数据绑定/组件被销毁并重建。如果元素时`<template>`，将提出它的内容作为条件块。
> 当和`v-if`一起使用的时候，`v-for`优先级更高。
- 原理：
调用addIfCondition方法，在生成VNode的时候忽略节点，render过程将不会再渲染这部分。