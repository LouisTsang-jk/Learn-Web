# 单行文字超过省略

# 多行文字超过省略

# 边界折叠(margin collapsing)
以下三种情况会形成外边距重叠：
+ 同一层相邻元素之间
相邻两个元素之间的外边距重叠，除非后一个元素加上clear-fix清除浮动
+ 没有内容将父元素和后代元素分开
没有border、padding、content、BFC、clear-fix、max-height、min-height来分开一个块级元素的上/下边界，则会出现父块元素和其内后代块元素外边界重叠，重叠部分最终会溢出到父级块元素外面。
+ 空的块级元素

## 解决方案

# 去除inline-block元素间间距
元素间留白间距出现的原因是标签端之间的空格
1. 取消空格
```
<div>
  <a href="##">hello</a
  ><a href="##">hello</a>
</div>
```
2. 使用负值margin
具体数值根据上下文的字体和字体大小有关(不推荐)
3. 无闭合标签
```
<div>
  <a href="##">Hello
  <a href="##">Hello</a>
</div>
```
4. font-size:0
考虑chrome默认最小字体大小限制，可能需要添加-webkit-text-size-adjust:none;
5. letter-spacing
6. word-spacing
[张鑫旭](https://www.zhangxinxu.com/wordpress/2012/04/inline-block-space-remove-%e5%8e%bb%e9%99%a4%e9%97%b4%e8%b7%9d/)

# 禁止input调用原生软键盘
添加readonly

# iphone6,7,8出现不换行的问题
1. `white-space: normal`
2. `word-break: break-all`


# 页面出现滚动条出现跳动
```
.outside {
  margin-left: calc(100vw - 100%);
  // or padding
}
```
