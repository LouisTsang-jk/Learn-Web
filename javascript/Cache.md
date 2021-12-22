# Cache
浏览器的缓存机制其实就是HTTP缓存机制。

## HTTP报文
1. Request
报文格式：
请求行 + HTTP头(通用信息头 + 请求头 + 实体头) + 请求报文主体(POST才有报文主体)
2. Response
报文格式：
状态行 + HTTP头(通用信息头 + 响应头 + 实体头) + 响应报文主体

## 缓存过程
浏览器和服务器通信方式为应答模式，即：浏览器发起HTTP请求 - 服务器响应请求。浏览器第一次向服务器发起请求之后拿到请求结果，会根据响应报文中HTTP头的*缓存标识*，决定是否缓存结果，时则将请求结果和缓存标识

## 缓存机制
1. 浏览器在加载资源的时候会根据这个资源的http header判断是否命中强缓存，如果命中则直接从本地缓存中读取资源(不会请求服务器)。
2. 如果没有命中强缓存的时候，浏览器会发送一个请求到服务器，服务器根据http header验证这个资源是否命中协商缓存，如果命中则将这个请求返回，告诉浏览器可以直接从缓存中加载这个资源。
3. 当上述缓存都没命中，则直接从服务器加载资源数据。
## 类型
### 强缓存
表示缓存期间不需要请求，通过设置`HTTP Header`实现：
+ `Expires`
资源在**指定时间**之后失效，需要重新请求*受限本地时间*
+ `Cache-Control`
  - max-age
  - public
  - private
  - no-cache(使用缓存之前重新请求)
  - no-store(禁用缓存)
优先级比`Expires`高，资源在**相对时间**之后失效。
```
// 10s后失效
res.setHeader('Cache-control', 'max-age=10')
```
### 协商缓存
1. 浏览器第一次跟服务器请求资源，服务器在返回的header上加`Last-Modified`表示这个资源在服务器最后修改时间。
2. 浏览器再次请求该资源时，在header上加上`if-Modified-Since`。
3. 如果服务器发现`if-Modified-Since`与该资源最后一次修改时间一致，则返回`304 Not Modified`。如果不一致就正常返回资源。
  -  ETag(if-none-match)
  HTTP响应头是资源的特定版本的标识符。这可以让缓存更高效，并节省带宽，因为如果内容没有改变，Web服务器不需要发送完整的响应。而如果内容发生了变化，使用ETag有助于防止资源的同时更新相互覆盖（“空中碰撞”）。
  > 在ETag和 If-Match 头部的帮助下，您可以检测到"空中碰撞"的编辑冲突。
  > 根据`If-Match`检查ETag是否一致，不一致则说明不是最新版本
  > Etag与Last-Modified相似，但是Etag更加准确。(可能存在资源有变化，但是修改时间没有变化的情况)


[彻底理解浏览器的缓存机制](https://heyingye.github.io/2018/04/16/%E5%BD%BB%E5%BA%95%E7%90%86%E8%A7%A3%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9A%84%E7%BC%93%E5%AD%98%E6%9C%BA%E5%88%B6/)
[Etag](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/ETag)

[缓存](https://github.com/amandakelake/blog/issues/41)