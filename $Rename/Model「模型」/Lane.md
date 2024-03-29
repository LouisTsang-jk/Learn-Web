# Lane
用于`React 17`的任务优先级模型。
`Lane`用来替换原有的`expirationTime`，给任务划分优先级。
## Expiration Time
任务过期时间距离目前很近，表示任务优先级很高。
### 存在缺陷
1. 无法处理任务交割(当一个页面有多个更新任务或者多个调度器)
2. 时间重合很难用数字描述
## 具体实现
使用数字进行位运算，将数字当成状态机，节约大量关于状态机的代码。   
Lane的本意是车道，就类似赛车一样，当任务获取优先级时总会抢占内圈的赛道，以及Lane表示的优先级有几个特点：
1. 可以表示不同批次的优先级
每个优先级都是31位的二进制数字。1表示该位置可用，0则表示这个位置不能用，从第一个优先级`NoLanes`到`OffscreenLane`优先级是降低的，*优先级越低则1的个数也越多*。
2. 优先级的计算性能高

## 高优先级插队
在Lane模型中如果一个低优先级的任务执行，并且还在调度的时候触发了一个高优先级的任务，则高优先级的任务会打断低优先级的任务。   
由于此时低优先级的任务可能已经进行了一段时间，Fiber树已经构建了一部分，所以需要将Fiber树还原。

## 饥饿问题
在调度优先级的过程中，会遍历pendingLanes(未执行的任务包含的lane)，如果没过期时间就计算一个过期时间，如果过期就加入root.expiredLanes中，然后下次调用getNextLane函数的时候会优先返回expiredLanes。
> 随着时间推移，低优先级的任务被插队，最后也会变成高优先级的任务