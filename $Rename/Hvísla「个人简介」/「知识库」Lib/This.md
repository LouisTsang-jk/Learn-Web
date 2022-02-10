# This
当前执行上下文（global、function 或 eval）的一个属性
## 绑定
### 显式绑定
1. call(Apply Pattern)
2. apply(Apply Pattern)
3. bind
### 隐式绑定
1. 全局上下文
默认指向`window`，严格模式指向`undefined`
2. 直接调用函数(Function Invocation Pattern)
`this`相当于全局上下文的情况
3. 对象.方法的形式调用(Method Invocation Pattern)
指向这个对象
4. DOM事件绑定
`onclick`和`addEventerListener`中`this`默认指向绑定事件的元素
5. new构造函数绑定(Constructor Pattern)
构造函数中的`this`指向实例对象
6. 箭头函数
箭头函数没有`this`，因此不能绑定。`this`会指向当前最近的非箭头函数的`this`，找不到则`window`(严格模式是`undefined`)

优先级：
new > call/apply/bind > 对象.方法 > 直接调用

## Example
1. 
```
const foo = {
    bar: 10,
    fn: function () {
        console.log(this);
        console.log(this.bar);
    }
}
var fn1 = foo.fn;
fn1()
```
这里的`this`仍然指向`window`。虽然`fn`函数在`foo`对象中作为方法被引用，但是在赋值给`fn1`之后，`fn1`的执行仍然是`window`的全局环境中。
2. 
```
const foo = {
    bar: 10,
    fn: function () {
        console.log(this);
        console.log(this.bar);
    }
}
foo.fn();
```
输出:
```
{bar: 10, fn: ƒ}
10
```
这时候`this`的指向是最后调用它的对象，在`foo.fn()`语句中`this`指向`foo`对象。

3. 
```
const o1 = {
    text: 'o1',
    fn: function () {
        return this.text;
    }
}
const o2 = {
    text: 'o2',
    fn: function () {
        return o1.fn();
    }
}
const o3 = {
    text: 'o3',
    fn: function () {
        var fn = o1.fn;
        return fn();
    }
}
console.log(o1.fn());
console.log(o2.fn());
console.log(o3.fn());
```
// o1
// o1
// undefined
第二个实际还是执行的是`o1.fn()`所以跟第一个输出一致。
第三个进行了`var fn = o1.fn`，其实就是直接调用，所以`this`指向`window`，所以答案为`undefined`
- - - 
4. 
```
function Foo () {
    this.user = 'Lucas';
    const o = {};
    return o;
}
const instance = new Foo();
console.log(instance.user);
```
这里输出`undefined`，此时`instance`返回空对象`o`。
```
function Foo () {
    this.user = 'Lucas';
    return 1;
}
const instance = new Foo();
console.log(instance.user);
```
这里输出`Lucas`，此时`instance`返回目标对象实例`this`。
> 如果构造函数显式返回一个值，且返回一个对象，那么`this`指向返回的这个对象；如果返回不是一个对象，那么`this`仍然指向实例。
- - -
5. 
```
const foo = {
    fn: function () {
        setTimeout(function () {
            console.log(this);
        })
    }
}
console.log(foo.fn());
```
`this`出现在`setTimeout()`中的匿名函数理，因此`this`指向`window`对象
```
const foo = {
    fn: function () {
        setTimeout(() => {
            console.log(this);
        })
    }
}
console.log(foo.fn());
```
此时`this`指向`foo`
# 参考
[JavaScript 的 this 原理是什么？](https://www.zhihu.com/question/353757734/answer/883998953)