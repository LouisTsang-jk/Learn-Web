// const urlSearchParams = new URLSearchParams(url);
// const params = Object.fromEntries(urlSearchParams.entries());

const url = `http://www.nowcoder.com?key=1&key=2&key=3&name=tom#hash`;
const params = {
  key: [1, 2, 3],
  name: 'tom'
}
function getUrlParam(url) {
  const res = {};
  let paramsStr = url.split('?')?.[1];
  if (paramsStr) {
    const paramStr = paramsStr.split('&');
    paramStr
  }
}
const res = getUrlParam(url);
console.log(res);
