// 发布订阅
class EventEmitter {
  constructor() {
    this.listeners = Object.create(null);
  }
  // 注册事件
  on = (event, listener) => {
    if (!event || !listener) return;
    if (this.listeners[event]) {
      this.listeners[event].push(listener);
    } else {
      this.listeners[event] = [listener];
    }
  };
  // 只订阅一次
  once = (event, listener) => {
    function one() {
      listener.apply(this, arguments);
      this.off(event, one);
    }
    this.on(event, one);
  };
  // 发布事件
  emit = (event, ...args) => {
    if (!this.hasBind(event)) {
      console.warn(`this event: ${event} don't has bind listener.`);
      return;
    }
    this.listeners[event].forEach((listener) => listener.call(this, ...args));
  };
  // 取消订阅
  off = (event, listener) => {
    if (!this.hasBind(event)) {
      console.warn(`this event: ${event} don't exist.`);
      return;
    }
    // 如果不传入listener就清空全部
    if (!listener) {
      delete this.listeners[event];
      return;
    }
    this.listeners[event] = this.listeners[event].filter(
      (item) => item !== listener
    );
  };
  hasBind = (event) => {
    return this.listeners[event] && this.listeners[event].length;
  };
}

// Test
const baseEvent = new EventEmitter();
function fart(timer) {
  console.log(`放了${timer}屁`);
}
function scream() {
  console.log(`尖叫声`);
}
baseEvent.on("click", fart);
baseEvent.once("click", scream);
baseEvent.emit("click");
