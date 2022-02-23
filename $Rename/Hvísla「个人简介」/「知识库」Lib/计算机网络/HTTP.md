# HTTP

## Method

| 方法    | 描述                                                  | 幂等 |
| ------- | ----------------------------------------------------- | ---- |
| GET     | 查询操作，对应数据库`select`操作                      | 是   |
| PUT     | 所有信息更新，对于数据库`update`                      | 是   |
| DELETE  | 更新操作，对于数据库`delete`操作                      | 是   |
| POST    | 新增操作，对应数据库`insert`操作                      | 否   |
| HEAD    | 用于返回一个资源对象的"元数据"，或者探测 API 是否健康 | 是   |
| PATCH   | 用于局部信息的更新，对应数据库`update操作`            | 否   |
| OPTIONS | 获取 API 相关信息                                     | 是   |

> 不要机械地通过数据库的 CRUD 来对应这些动词，很多时候，还是要分析一下业务语义。如登录接口应该是 POST(新增 session)，登出是 DELETE

> 幂等性: 就是用户对于同一操作发起的一次请求或者多次请求的结果是一致的，不会因为多次点击而产生了副作用

## Content-Length
服务端告诉客户端body的大小，但是有时候服务端并不能准备提前告知body有多大。
  1. 服务端需要先写header再写body
  2. body动态生成，如果等生成完再写header会占用额外的开销  

所以有三种情况去获取资源大小：
  1. `服务器知道资源大小，直接通过Content-Length`
  2. `回复报文的Header添加Transfer-Encoding: chunked`   
    表明分块传输，每一块都使用固定的格式，前面是块的大小，后面是数据；最后一块的大小为0，此时客户端解析的时候需要去掉一些无用字段
  3. `没有content-length、transfer-encoding  `
    这种情况只能使用短连接，以连接结束来标示数据传输结束，当传输结束的时候就知道大小了。


## Content-Type
- form表单
  1. application/x-www-form-urlencoded
      form表单数据被编码为key/value格式发送到服务器(表单默认提交格式)
      ```
        Name=John+Smith&Age=23
      ```
  2. multipart/form-data
      需要在表单中进行文件上传，可能有批量上传，为了区分数据，用Boundary参数进行分割
  3. text/plain
      纯文本格式
- 其他
  - application/json
      返回JSON格式
    ```
      {"Name": "John Smith", "Age": 23}
    ```
  - text/x-json
    实验性，非官方MIME类型


## CORS-preflight
面对跨域的非简单请求(复杂请求)会发起预检，浏览器会先询问服务器(OPTION请求)，当前域名是否在服务器许可名单前，以及可以使用哪些HTTP头信息字段，只有通过才会正式发起AJAX请求。

## Keep-alive
  - `TCP(keepalive)`    
    TCP层实现，称之TCP保活机制，意图是心跳、检测连接错误。
  > 原理就是通过计时器发送TCP探测包
  - `HTTP(Keep-Alive)`    
  应用层实现，称之为HTTP长连接，意图是连接复用。
  > 原理就是HTTP服务器不会在每次响应后关闭TCP连接，而是等待一段时间，如果其他HTTP请求也可以通过，一段时间后，它无论如何都会关闭它。   

  > 这个维护是通过HTTP守护进程的timeout，时间过期则关闭
  
    那HTTP的Keep-Alive基于TCP的keepalive吗？

    不需要，如果客户端发送请求，它将得到响应，如果客户端没有通过TCP发送任何请求(可能连接已死)，那么超时将关闭连接；客户端可以感知并在需要的时候重新建立另外一个TCP连接发送请求。    

    我个人理解HTTP的Keep-Alive里把HTTP请求当作心跳包，所以不需要基于TCP的keepalive


## 长连接
  - TCP的长连接
  具备双端连续收发报文的能力；
  - HTTP的长连接
  开启keep-alive的HTTP连接也是一种长连接，但是由于协议本身的限制，服务端无法主动发起应用报文

## 队头阻塞(Head-Of-Line Blocking)(HOL)
  - HTTP队头阻塞
    - 0.9版本，使用串行连接，需要等待上一个请求完成，才能执行下一个请求
    - 1.0版本，使用并行连接，浏览器限制并行连接通常为4个，只能缓解队头阻塞
    - 
  - TCP队头阻塞
    TCP收到数据之后不会直接发送，而是将数据切割成MSS(Maximum Segment Size最大报文长度)大小，由于IP层不保证数据的可靠性和有序性，所以接收端可能会先收到窗口末端的数据，这时候TCP是不会向上层应用交付数据的，必须等待前面的数据都接收，这就是TCP的队头阻塞。

## 简单请求/非简单请求(复杂请求)
- `简单请求`    
普通HTML Form可以发出的请求(method方法、enctype编码)，且Form表单发出的请求不会触发同源策略，因为submit之后是没有返回的。
- `非简单请求`    
除了简单请求就是非简单请求了，**需要注意跨域情况下会走`CORS-preflight机制`**

## 常见问题

- `一个 TCP 连接可以同时发送几个 HTTP 请求`
- `浏览器 HTTP 请求的并发性是如何体现的？并发请求的数量是否有限制？`

- `keep-alive和pipeling的区别？`
  - `keep-alive`   
    请求结束之后不断开连接，省去下次的三次握手四次挥手
  - `pipeling`    
    可以并行发出多个请求，不需要等待上个请求的返回，但是服务器响应必须按次序返回，所以导致pipeling没有什么浏览器使用
## 版本历史

### 0.9(1991)

只有 GET 请求，并且只能传输文本 html 格式，返回的内容是 ASCII 字符串流

### 1.0(1996)

#### `新增`
  - 二进制文件传输(视频音频图片)
  - 请求头/响应头信息(原来只需要传输数据)
  - 状态码(status code)
  - 多字符集支持
  - 缓存(cache)
  - 新增 POST 和 HEAD 等请求方法
  - 非标准的长链接  
    请求头添加`Connection: keep-alive`，默认不开启
  - 内容编码(content encoding)
  - 多部分发送(multi-part type)
#### `局限`
  - 连接无法复用
  - 队头阻塞

### 1.1(1997)
#### 新增
  - 管道机制(pipeling)
  - 默认开启`keep-alive`
  - 头信息`Content-Length`
  - 更多的请求方式，如PUT、PATCH、OPTIONS、DELETE等
  - 头信息Host
  - 支持断点续传
  - 24个错误状态响应码
#### 局限
  - header信息太大
  - 客户端可以并行发送多个请求，但是服务器响应必须按次序返回，所以导致pipeling没有什么浏览器使用

### 2.0(2015)
基于SPDY(发音同`speedy`)协议，主要解决HTTP1.1效率不高的问题。
#### 新增
  - `二进制分帧`    
    将一个TCP连接分为若干个流(Stream)，每个流中可以传输若干消息(Message)，每个消息由若干最小的二进制帧(Frame)组成。每个用户的操作行为会分配一个流编号(Stream ID)，表明用户与服务端之间创建了一个TCP通道；   
    协议将每个请求分割为二进制的控制帧和数据帧。

    | HTTP1.x   | HTTP2.0   |
    | --------- | --------- |
    | StartLine | Length    |
    | Header    | Type      |
    | Body      | Flags     |
    |           | Stream ID |
    |           | Payload   |



  - `多路复用(Multiplexing)`    
    比起HTTP1.1，HTTP2的多路复用不需要先入先出
  - `请求头压缩`   
    HPACK算法基于霍夫曼编码
  - `请求优先级`    
    设置Stream改变其优先级(Priority)和依赖(Dependency)，优先级高的会有限返回，stream还能依赖其他sub streams。两个属性都是可以动态调整的。
  - `服务端推送(Server Push)`    
    即服务端向客户端发送比客户端请求更多的数据，允许服务器直接提供浏览器渲染页面所需资源，而不需要浏览器收到、解析页面之后再发起一轮请求
### 3.0
QUIC(Quick UDP Internet Connection)协议
## HTTPS

## 概念

### TLS/SSL
# 参考
[合并 HTTP 请求是否真的有意义？](https://www.zhihu.com/question/34401250/answer/58746920)
[彻底理解CORS跨域原理 
](https://www.cnblogs.com/qiujianmei/p/11649905.html)