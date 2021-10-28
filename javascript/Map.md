# Map
Map 对象保存键值对，并且能够记住键的原始插入**顺序**。任何值(对象或者原始值) 都可以作为一个键或一个值。
> size属性获取Map键值个数
> Map是iterable
## 优点
1. 有序
2. 自带键值个数
3. 可迭代
## 缺点
1. 取值时需要遍历所有键
2. 赋值和搜索操作都是O(n)的时间复杂度
3. 数组会一直引用着每个键和值，使得垃圾回收算法不能回收。
# WeakMap
WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是**对象**，而值可以是任意的。
## 优点
1. 每个键对象的若引用，垃圾回收能正常运行
## 缺点
1. key不可枚举

# Object
Object的键必须是一个String或者Symbol

# 应用场景
```
ele.addEventListener('click', handler, false);
```
- - - 
```
const listener = new WeakMap();
listener.set(ele, handler);
ele.addEventListener('click', listener.get(ele), false);
```
这里ele消失，则绑定的监听函数handler也会自动消失。