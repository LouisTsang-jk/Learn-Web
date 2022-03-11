function debounce(fn, time) {
  let timer;
  return function (...args) {
    timer && clearTimeout(timer);
    const context = this;
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, time);
  };
}

const div = document.createElement("div");
div.style = "height: 300vh;width: 100px;border: 1px solid #000";
document.body.appendChild(div);
document.body.onscroll = debounce((e) => {
  console.log("scroll", e);
}, 1000);
