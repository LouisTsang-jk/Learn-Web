# Fiber
React的协程，用于React的任务调度算法

## 背景
因为React的本质就是：`View = F(data)`，函数一旦开始就不能中断。
Fiber实质就是任务调度器，实现暂停/重启任务，还可以对任务进行优先级分配。

## 流程
- Scheduler(调度器)
对任务进行排序，让优先级高的任务先进行reconcil(协调)
- Reconciler(调度器)
找出哪个节点发生了改变，并打上不同的Flags(expirationTime)
- Renderer(渲染器)
将Reconciler中打好标签的节点渲染到视图上


## 概念
- 双缓存
指内存中同时存在两颗Fiber Tree
1. Current Fiber：当前呈现的dom树
2. workInProgress Fiber：正在更新的树