class SuperType {
  constructor() {
    this.type = "super";
  }
}

class Cenozoic extends SuperType {
  constructor() {
    super();
    this.cover = "constructor cover";
  }
  #privateVar = "privateVar";
  static staticFn = () => {
    console.log("static fn");
  };
  getPrivate() {
    console.log(this.#privateVar);
  }
  cover = "out cover";
}

const c = new Cenozoic();

console.log(c.cover); // constructor cover
console.log(c.getPrivate()); // 获取私有属性: privateVar
console.log(Cenozoic.staticFn()); // 静态方法: 构造函数可以访问 static fn
// console.log(c.staticFn()); // 静态方法: 实例无法访问
console.log(c.type); // 继承: super

// - - - - - - - - - - -
function SuperType() {
  this.type = "super";
}

function Classic() {
  const prototype = Object.create(SuperType.prototype);
  prototype.constructor = Classic;
  Classic.prototype = prototype;
  SuperType.call(this);
  const privateVar = "privateVar";
  this.getPrivate = function () {
    return privateVar;
  };
  this.cover = "out cover";
  this.cover = "constructor cover";
}
Classic.staticFn = () => {
  console.log("static fn");
};

const c = new Classic();

console.log(c.cover); // constructor cover
console.log(c.getPrivate()); // 获取私有属性: privateVar
console.log(Classic.staticFn()); // 静态方法: 构造函数可以访问 static fn
// console.log(c.staticFn()); // 静态方法: 实例无法访问
console.log(c.type); // 继承: super
