class People {
  constructor(name) {
    this.tasks = [];
    this.name = name;
    setTimeout(() => {
      this.then();
    });
  }
  sayHello() {
    this.tasks.push(() => {
      console.log(`大家好我是${this.name}`);
      this.then();
    });
    return this;
  }
  movement(text) {
    this.tasks.push(() => {
      console.log(text);
      this.then();
    });
    return this;
  }
  wait(time) {
    this.tasks.push(() => {
      setTimeout(() => {
        console.log(`wait ${time * 1000}ms`);
        this.then();
      }, time * 1000);
    });
    return this;
  }
  waitFirst(time) {
    this.tasks.unshift(() => {
      setTimeout(() => {
        console.log(`wait first ${time * 1000}ms`);
        this.then();
      }, time * 1000);
    });
    return this;
  }
  then() {
    const task = this.tasks.shift();
    task && task();
    return this;
  }
}
const p = new People("Louis");
p.sayHello().movement("我要宣布个事").wait(3).waitFirst(1).movement("我是伞兵");
