function compose(middleware) {
  return function (context, next) {
    let index = -1;
    return dispatch(0);
    function dispatch(i) {
      if (i <= index)
        return Promise.reject(new Error("next() called multiple times"));
      index = i;
      let fn = middleware[i];
      if (i === middleware.length) fn = next;
      if (!fn) return Promise.resolve();
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    }
  };
}

//
const middlewareA = (ctx, next) => {
  console.log("A:before");
  next();
  console.log("A:after");
};

const middlewareB = (ctx, next) => {
  console.log("B:before");
  next();
  console.log("B:after");
};
const funcs = compose([middlewareA, middlewareB]);
