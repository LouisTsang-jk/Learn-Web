fn main () {
  let logical:bool = true;
  let a_float: f64 = 1.0;
  let an_integer = 5i32;
  let default_float = 3.0;
  // 可变变量(mutalbe)
  let mut default_integer = 7;
  // default_integer = 8;
  let ys: [i32; 500] = [0; 500];
  println!("{0}-{1}-{2}-{3}-{4}-{5}", logical, a_float ,an_integer ,default_float ,default_integer, ys);
}