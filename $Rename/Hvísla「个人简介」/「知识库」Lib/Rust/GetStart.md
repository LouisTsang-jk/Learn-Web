# install
```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

- - - 
```
brew install rustup-init
rustup-init
rustc --version
```

# context
- rustc
编译器
- cargo
包管理工具
- rust-std
Rust标准库
- wasm-pack
将代码转换成wasm

# 原生类型(primitives)
- 标量类型(scalar type)
  - 有符号整数(signed integers)
  i8、i16、i32、i64、i128和isize(指针宽度)
  - 无符号整数(unsigned integers)
  u8、u16、u32、u64、u128和usize(指针宽度)
  - 浮点数(floating point)
  f32、f64
  - 字符(char)
  单个Unicode字符(每个都是4字节)
  - 布尔型(bool)
  true/false
  - 单元类型(unit type)
  其唯一可能的值就是 () 这个空元组
- 复合类型(compound type)
  - 数组(array)
  [1,2,3]
  - 元组(tuple)
  [1, true]