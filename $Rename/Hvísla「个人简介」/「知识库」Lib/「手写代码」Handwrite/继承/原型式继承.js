// 创建子类的时候不能向父类传参
// 引用值共享
function SuperType (name) {
  this.name = name;
  this.colors = ['red'];
}
SuperType.prototype.callName = function () { console.log('callname:', this.name) }
const i1 = new SuperType('tom');
// const i2 = Object.create(i1);
function SubType () {}
SubType.prototype = i1; // 继承方法
const i2 = new SubType();
i2.name = 'jack';
i2.colors.push('blue');
console.log('i1', i1);
console.log('i2', i2);
console.log('i1.colors:', i1.colors); // 此处共享了引用
console.log('i2.colors:', i2.colors);
i1.callName();
i2.callName();