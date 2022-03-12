// 无法自定义类型
function SuperType (name) {
  this.name = name;
}
SuperType.prototype.callName = function () { console.log('callname:', this.name) }

function createAnother(SubType) {
  const clone = Object.create(SubType);
  return clone;
}
const n1 = createAnother(new SuperType('jack'));
n1.age = 18;
console.log('n1:', n1);