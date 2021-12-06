# JavaScript运行机制
为了避免复杂性，JavaScript这门语言被设计成*单线程*。  
> HTML5新特性Web Worker可以创建多线程。  
数据交换:
1. postMessage
2. onMessage
## 任务队列
单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。

## 任务
### 1. 同步任务(sync hronous)
主线程上排队执行的任务，只有当一个任务执行完毕，才能执行后面一个任务。
### 2. 异步任务(async hronous)
不进入主线程、进入“任务队列”的任务，先在event table中注册函数，当满足触发条件之后才进入“任务队列”。

只有在“任务队列”通知主线程，某个异步任务可以执行，该任务才进入主线程执行
#### 具体异步任务执行机制
1. 所有同步任务都在主线程上执行，形成*执行栈(execution context stack)*
2. 主线程外，还有一个*任务队列(task queue)*。只要异步任务有运行结果，就在*任务队列*中放置一个事件
3. 一旦*执行栈*中的所有同步任务执行完毕，系统就会读取“任务队列”，*看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。*
4. 主线程不断重复上面三个步骤

## 事件和回调函数
![pic](https://developer.mozilla.org/files/4617/default.svg) 
### 栈 stack
函数调用形成一个栈帧
> + 基本数据类型
> + 函数执行时的运行空间

### 堆 heap
对象被分配在一个堆中，以表示一块非结构化的内存区域
> + 已声明object类型的数据

### 队列 queue
JavaScript运行时包含了一个待处理的消息队列。每一个消息都关联着一个用以处理这个消息的函数。

> 运行时处理最先进入队列的消息，此时消息会移除队列，*作为输入参数调用与之关联的函数*。(调用函数创建新的栈帧)

## 宏任务和微任务
同时异步任务又分为宏任务和微任务。
> 当执行栈中的任务(*宏任务*)清空，主线程会先检查*微任务*队列中是否有任务，有就依次执行直到微任务队列为空，在检查*宏任务*队列中是否有任务，如果有就取出*第一个宏任务*到执行栈中，之后在清空执行栈，然后再次检查微任务，开始循环…
**同一次事件循环中，微任务永远在宏任务之前执行**

### 宏任务
+ setTimeout 
+ setInterval 
+ setImmediate 
+ I/O 
+ UI Event
+ requestAnimationFrame

### 微任务
+ process.nextTick
+ Promise.then()

> node和浏览器行为不完全一致，
> - 浏览器环境每次执行一个宏任务，再去检查微任务
> - node会清空当前所处阶段的队列，即执行所有task，再去检查微任务
## 进程和线程

### 进程
*资源分配的最小单位*
应用程序的执行实例，每一个进程都是由私有的虚拟地址空间、代码、数据和其他系统资源所组成。
> 进程拥有独立的栈堆空间和数据段，每启动一个新的进程必须分配独立的地址空间，建立众多的数据表来维护代码段、堆栈段和数据段。

### 线程
*程序执行的最小单位*
线程是进程内的一个独立执行单位，在不同的线程之间是可以共享进程资源的。
> 线程拥有独立的堆栈空间，但是共享数据段，彼此之间使用相同的地址空间，共享大部分数据，比进程开销更小，切换速度也比进程快，效率更高。

# demo
## 1.
```
setTimeout(function(){
  console.log('a');
});
new Promise(function(resolve){
  console.log('b');
  for(var i = 0;i < 10000;i++){
    i == 99 && resolve();
  }
}).then(function(){
  console.log('c');
})
console.log('d');
```
> 1. 执行script下的*宏任务*，遇到setTimeout，将其放入*宏任务队列*
> 2. 遇到Promise,new Promise直接执行，打印b
> 3. 遇到then方法，是*微任务*，放入*微任务队列*
> 4. 遇到console.log('d')，直接打印
> 5. 本轮*宏任务*执行完毕，查看*微任务*，发现then方法里面的函数，打印c
> 6. 本轮event loop全部完成
> 7. 下一轮循环，先执行*宏任务*，发现*宏任务队列*中还有一个setTimeout，打印a  
> // -> b,d,c,a
---
2.
```
console.log('a');

setTimeout(function() {
    console.log('b');
    process.nextTick(function() {
        console.log('c');
    })
    new Promise(function(resolve) {
        console.log('d');
        resolve();
    }).then(function() {
        console.log('e')
    })
})
process.nextTick(function() {
    console.log('f');
})
new Promise(function(resolve) {
    console.log('g');
    resolve();
}).then(function() {
    console.log('h')
})

setTimeout(function() {
    console.log('i');
    process.nextTick(function() {
        console.log('j');
    })
    new Promise(function(resolve) {
        console.log('k');
        resolve();
    }).then(function() {
        console.log('l')
    })
})
```
> a、g、f、h、b、d、c、e、i、k、j、l
---
3.
```
Promise.resolve().then(()=>{
console.log('1')
setTimeout(()=>{
  console.log('2')
},0)
})

setTimeout(()=>{
console.log('3')
Promise.resolve().then(()=>{
  console.log('4')
})
},0)
```
> 1、3、4、2

[参考阮一峰的JavaScript运行机制详解:再谈Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)  
[知乎.饿了么前端 Event Loop这个循环你晓得么？](https://zhuanlan.zhihu.com/p/41543963)  
[知乎.童欧巴 如何解释Event Loop面试官才满意？](https://zhuanlan.zhihu.com/p/72507900)  