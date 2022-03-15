class Notifier {
  constructor() {
    this.observerList = []; // 观察者
  }
  add(observer) {
    this.observerList.push(observer);
  }
  remove(observer) {
    const index = this.observerList.findIndex((o) => observer === o);
    if (index !== -1) this.observerList.splice(observer, 1);
  }
  notify() {
    this.observerList.forEach((o) => o.update());
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }
  update() {
    console.log(`${this.name}收到通知`);
  }
}
