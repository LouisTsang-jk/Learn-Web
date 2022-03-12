// 完美
function SuperType (name) {
  this.name = name;
}
SuperType.prototype.callName = function () { console.log('callname:', this.name) }

function inheritPrototype(SubType, SuperType) {
  const prototype = Object.create(SuperType.prototype);
  prototype.constructor = SubType;
  SubType.prototype = prototype;
  return SubType;
}
  
function SubType (name, age) {
  SuperType.call(this, name);
  this.age = age;
}

SubType = inheritPrototype(SubType, SuperType);
const n1 = new SubType('Jack', 18);
console.log('n1', n1);