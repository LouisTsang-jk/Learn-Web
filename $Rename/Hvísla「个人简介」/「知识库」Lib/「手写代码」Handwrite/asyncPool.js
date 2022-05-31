async function asyncPool(poolLimit, array, iteratorFn) {
  const ret = []; // 存储所有的异步任务
  const executing = []; // 存储正在执行的异步任务
  for (const item of array) {
    // 调用iteratorFn函数创建异步任务
    const p = Promise.resolve().then(() => iteratorFn(item));
    ret.push(p); // 保存新的异步任务

    // 当poolLimit值小于或等于总任务个数时，进行并发控制
    if (poolLimit <= array.length) {
      // 当任务完成后，从正在执行的任务数组中移除已完成的任务
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e); // 保存正  在执行的异步任务
      if (executing.length >= poolLimit) {
        await Promise.race(executing); // 等待较快的任务执行完成
      }
    }
  }
  return Promise.all(ret);
}

const timeout = (i) =>
  new Promise((resolve) => {
    console.log("开始执行任务", i);
    setTimeout(() => {
      console.log(i + "任务执行完毕");
      resolve(i);
    }, i);
  });

(async function run() {
  console.log("开始执行任务");
  const res = await asyncPool(2, [1000, 5000, 3000, 2000], timeout);
  console.log("res:", res);
})();
