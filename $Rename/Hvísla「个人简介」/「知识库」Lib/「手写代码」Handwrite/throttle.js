function throttle(fn, time) {
  let flag = true;
  return function (...args) {
      if (!flag) return;
      flag = false;
      setTimeout(() => {
          fn.apply(this, args);
          flag = true;
      }, time)
  }
}


const div = document.createElement('div');
div.style = 'height: 300vh;width: 100px;border: 1px solid #000';
document.body.appendChild(div);
document.body.onclick = throttle(function(e) {
  console.log('e', e); // e
  console.log('this', this) // body
}, 1000)

