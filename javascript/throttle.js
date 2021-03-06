function throttle (fn) {
  let timer = true
  return function () {
    if (!timer) return
    timer = false;
    setTimeout(() => {
      fn.call(this.arguments);
      timer = true;
    }, 1000);
  }
}
