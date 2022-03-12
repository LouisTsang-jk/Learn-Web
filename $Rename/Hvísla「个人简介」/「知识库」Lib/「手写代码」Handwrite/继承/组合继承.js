// 超类构造函数会调用两次
function SuperType (name) {
    this.name = name;
}
SuperType.prototype.callName = function () { console.log('callname:', this.name) }

function SubType (name, age) {
    // 继承属性
    SuperType.call(this, name);
    this.age = age;
}
// 继承方法
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
const i1 = new SubType('Jack', 18);
console.log('i1', i1);
i1.callName();