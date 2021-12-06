# 跨域CORS
(跨资源共享访问Cross-origin resource sharing)
由同源策略(same origin policy)限制请求的场景。
## 同源策略
**同源策略**限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的重要安全机制。
> 1. 协议相同
> 2. 域名相同
> 3. 端口相同
同源策略限制以下行为
> 1. Cookie、LocalStorage和IndexDB无法读取
> 2. DOM和JS对象无法获得
> 3. AJAX请求不能发送
---
# 解决跨域的方案
## 1. jsonp跨域
### 原理：
为了减轻web服务器的负载，浏览器可以通过相应的标签从不同的域名下加载静态资源。*通过动态创建标签，实现跨域*
### 实现：
```
const script = document.createElement('script');
script.type = 'type/javascript';
script.src = 'http://www.xxx.com/test?type=normal&callback=handlerCallback';
document.head.appendChild(script);

function handlerCallback(){
  console.log(JSON.stringify(res));
}
```
### 缺点：
只能实现get请求
--- 
## 2. document.domain + iframe
### 原理：
通过JS强制设置`document.domain`为基础主域，实现同域
### 实现：
+ 父窗口：(http://www.domain.com/a.html)
```
<iframe id="iframe" src="http://child.domain.com/b.html"></iframe>
<script>
  //document.domain => www.domain.com
  document.domain = 'domain.com';
  var params = 'hello';
</scirpt>
```
+ 子窗口：(http://child.domain.com/b.html)
```
<script>
  document.domain = 'domain.com';
  console.log(window.parent.parmas);
</script>
```
### 缺点：
限制只能主域相同，子域不同的跨域场景
> http://www.domain.com/a.js
> http://dev.domain.com/a.js
> http://domain.com/a.js

## 3. location.hash + iframe 
## 4. window.name + iframe
## 5. poastMessage
### 原理：
HTML5 XMLHttpRequest Level 2中的API。
解决：
+ 页面和其打开的新窗口的数据传递
+ 多窗口之间消息传递
+ 页面与嵌套的iframe消息传递
+ 上面三个场景的跨域数据传递
postMessage(data, origin)
+ data：支持任意基本类型和可复制的对象，避免浏览器兼容问题，尽量使用JSON.stringify()序列化  
+ origin：协议 + 主机 + 端口号，也可以设置成"*"，表示可以传递到任意窗口，如果要指定和当前窗口同源则设置"/"


参考
[前端常见跨域解决方案（全）](https://segmentfault.com/a/1190000011145364)