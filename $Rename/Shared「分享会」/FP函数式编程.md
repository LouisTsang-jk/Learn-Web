# FP 函数式编程

## 函数输入

- 实参 `arguments`
  输入的值
- 形参 `parameters`
  函数中的命名变量

```
function foo ( x, y ) { // <- parameters
  // ...
}
const a = 3;
foo(a, a * 2); // <- arguments
```

- Arity
函数声明的形参数量
```
function foo (x, y, z) {
  // ...
}
foo.length; // 3
```
