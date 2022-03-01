function debounce (fn, wait) {
  // 通过闭包缓存定时器
  let timer = null;
  return function (...args) {
    // 将this保存到context中
    const context = this;
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  }
}