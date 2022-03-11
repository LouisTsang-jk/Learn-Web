function debounce(fn, time) {
  let timer;
  return function (...args) {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, time);
  };
}


const div = document.createElement('div');
div.style = 'height: 300vh;width: 100px;border: 1px solid #000';
document.body.appendChild(div);

document.body.onclick = debounce(function (e) {
    console.log('e', e) // e
    console.log('this', this); // body
}, 1000)
