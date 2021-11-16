# Npx
运行npx命令的时候会在`node_modules/.bin`路径和环境变量`$PATH`里面，检查命令是否存在。由于npx会检查环境变量`$PATH`，所以系统命令也能调用。

## 功能
`create-react-app`使用`npx`运行会将`create-react-app`下载到临时目录，使用完后会自动删除。

## 参数
### --no-install
强制使用本地模块而不查找远程模块。如果本地不存在则报错。

### --ignore-existing
与`--no-install`相反，忽略本地模块，仅使用远程模块。

### -p
指定安装命令运行前所需的模。
```
npx -p node@15.0.0 node -v
// -> v15.0.0
```

### -c
...


# 参考
[阮一峰-NPX](https://www.ruanyifeng.com/blog/2019/02/npx.html)