// 超类方法不能复用
function SuperType (name) {
  this.name = name;
}
SuperType.prototype.callName = function () { console.log('callname:', this.name) }

function SubType (name, age) {
  SuperType.call(this, name);
  this.age = age;
}

const i1 = new SubType('jack', 18);
console.log('i1', i1);
i1.callName(); // 应该报错