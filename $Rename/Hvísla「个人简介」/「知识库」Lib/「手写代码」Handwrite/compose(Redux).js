function compose(funcs) {
  return funcs.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );
}

function A(...args) {
  console.log("A:args:", args);
  return args;
}

function B(...args) {
  console.log("B:args:", args);
  return args;
}

const funcs = compose([A, B]);
funcs(1, 2);

// 从内往外执行，上一个执行函数的返回会作为下一个执行函数的参数