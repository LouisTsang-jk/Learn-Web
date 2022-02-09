# 暂时性死区(Temporal Dead Zone)
`let`语句声明一个块级作用域的本地变量，并且可选的将其初始化为一个值。  
`let`声明的变量只能在其声明的块或自块中可用。 
`var`声明的变量的作用域是整个封闭函数。 
*`let`、`const`、`var`都存在提升*  
## 定义  
在代码块中，使用`let`命令声明之前，该变量都不可用。

## 本质  
只要一进入当前作用域，所要使用的变量已经存在，但是不可获取，只有执行到声明变量，才可以获取和使用。

## 解析
```
typeof apple; => undefined
```
other code
```
typeof apple;
let apple; => Uncaught ReferenceError: apple is not defined
```


[Hoisting in Modern JavaScript — let, const, and var](https://blog.bitsrc.io/hoisting-in-modern-javascript-let-const-and-var-b290405adfda?gif=true)