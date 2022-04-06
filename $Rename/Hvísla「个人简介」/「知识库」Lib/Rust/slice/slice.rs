use std::mem;

fn analyze_slice(slice: &[i32]) {
    println!("first element of the slice: {}", slice[0]);
    println!("the slice has {} elements", slice.len());
}

fn main() {
  // 定长数组（类型标记是多余的）
  let xs: [i32; 5] = [1, 2, 3, 4, 5];

  // 所有元素可以初始化成相同的值
  let ys: [i32; 500] = [0; 500];
  println!("borrow a section of the array as a slice");
  analyze_slice(&xs[1 .. 3]);
}
