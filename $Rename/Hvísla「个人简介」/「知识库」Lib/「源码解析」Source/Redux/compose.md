# compose

```
function compose (...funcs) {
  // 边界处理
  ...
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
// 假如来了a,b,c,d四个函数
function a (text) {
  return text + 'o'
}
function b (text) {
  return text + 'l'
}
function c (text) {
  return text + 'l'
}
function d (text) {
  return text + 'e'
}
function e (text) {
  return text + 'h'
}
const fn = compose(a,b,c,d,e)
fn('') // -> hello
// e(d(c(b(a))))
```
