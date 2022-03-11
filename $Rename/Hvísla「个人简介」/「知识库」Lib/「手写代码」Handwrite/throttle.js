function throttle(fn, time) {
  let flag = true;
  return function (...args) {
      if (!flag) return;
      flag = false;
      const context = this;
      setTimeout(() => {
          fn.apply(context, args);
          flag = true;
      }, time)
  }
}


const div = document.createElement('div');
div.style = 'height: 300vh;width: 100px;border: 1px solid #000';
document.body.appendChild(div);
document.body.onscroll = throttle((e) => {
  console.log('scroll', e);
}, 1000)

