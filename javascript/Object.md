# Object 
## Properies
+ .prototype.constructor
## Methods
+ .assign()
将所有可枚举属性的值从一个或多个源对象复制到目标对象。
*被覆盖对象的属性中有相同的键，则属性将被源对象中的属性覆盖。*  
该方法只会拷贝源对象自身的并且可枚举的属性到目标对象。*会调用源对象的[[`Get`]]和目标对象的[[Set]]*   
> `aasign`方法执行的是浅拷贝   
`浅克隆(不克隆继承值)`   
```
function clone (obj) {
  return Object.assign({}, obj)
}
```
`浅克隆(克隆继承值)`
```
function clone (obj) {
  const objProto = Object.getPrototypeOf(obj);
  return Object.assign(Object.create(objProto), obj);
}
```
`合并对象`    
```
const obj1 = { a: 1 };
const obj2 = { b: 2 };
const obj3 = Object.assign(obj1, obj2)
// => { a:1, b:2 }
// !important
// obj1 => { a:1, b:2 }
obj1 === obj3
// => true
```
+ .create()
创建一个新对象，使用现有的对象来提供新创建的对象的`__proto__`，实现类式继承
```
const person1 = {
  father: 'louis tsang'
}
const person2 = Object.create(person1)
person2.father // => louis tsang
```
+ .defineProperties()
直接在一个对象上定义新的属性或修改现有属性，并返回该对象。
+ .defineProperty()
直接在一个对象上定义新的属性或修改现有属性，并返回该对象。
+ .entries()
返回一个给定对象自身可枚举属性的键值对数组，其排列与使用`for...in`循环遍历对象的顺序一致*(`for...in`)会枚举原型链中的属性*
+ .freeze()
冻结一个对象，该对象再也无法修改，无法添加新属性和删除已有属性及修改该对象已有属性的可枚举性、可配置型、可写性甚至`原型`也无法修改。*注意这个方法不会显式报错*
+ .fromEntries()
把键值对列表转换为一个对象。是`entries`的反转
```
const entries = new Map([
  ['foo', 'bar'],
  ['baz', 42]
])
const obj = Object.fromEntries(entries);
// => {foo: "bar", baz: 42}
```
+ .getOwnPropertyDescriptor()
+ .getOwnPropertyDescriptors()
+ .getOwnPropertyNames()
返回一个由指定对象的所有自身属性的属性名(包括不可枚举属性但不包括Symbol值作为名称的属性)组成的`数组`。
```
var arr = ['a', 'b', 'c'];
console.log(Objcet.getOwnPropertyNames(arr).sort());
// => ['0', '1', '2' ,'lenght']
```
+ .getOwnProertySymbols()
+ .getPrototypeOf()
返回其原型的对象。
```
const prototype1 = {};
const obj1 = Object.create(prototype1);
console.log(Object.getPrototypeOf(obj1) === prototype1);
// => true
```
+ .is()
判断两个值是否相同。
+ 两个值都是`undefined`
+ 两个值都是`null`
+ 两个值都是相同的布尔值
+ 两个值都是相同个数的字符按照相同的顺序组成的字符串
+ 两个值指向同个对象
+ 两个值同为`+0`、`-0`、`NaN`、其余相同数字
*与`===``判定方式不一样，在`===`中正负零相等*，还有`Number.NaN`和`NaN`不相等
+ .isExtensible()
判断是一个对象是否可扩展。(即往上面添加新属性)
不可扩展性可以通过：
+ `Object.preventExtensions`
+ `Object.seal`
+ `Object.freeze`  
+ .isFrozen()
判断对象是否被冻结。
冻结是指：
+ 不可扩展
+ 属性不可配置
+ 数据属性不可写(getter或setter的访问器属性不可写)
+ .isSealed()
+ .keys()
返回一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用`for...in`循环遍历该对象时返回的顺序一致。
*返回一个所有元素为`字符串`的数组*。   
如果想获取一个对象的所有属性，甚至包括不可枚举的，可以使用`Object.getOwnPropertyNames`
+ .preventExtensions()
让一个对象变的不可扩展，即永远不能再添加新的属性。该方法会使得目标对象的[[prototype]]不可变；任何重新赋值[[prototype]]操作都会抛出`TypeError`。
```
var fixed = Object.preventExtensions({});
fixed.__proto__ = { hello: 'world' };
// Throw Error
fixed.str = 'This is String';
// -> fixed => {}
```
+ .hasOwnProperty()
返回布尔值，判断对象自身属性中是否具有指定的属性，*该方法会忽略掉原型链上继承到的属性。*
```
let obj = Object.assign(Object.create({length:2}),{a:1,b:2});
obj.hasOwnProperty('length'); // false
'length' in obj; // true
```
+ .isPrototypeOf()
+ .propertyIsEnumerable()
+ .toLocaleString()
+ .toString()
+ .valueOf()
返回值为该对象的原始值
+ .seal()
+ .setPrototypeOf()
+ .values()