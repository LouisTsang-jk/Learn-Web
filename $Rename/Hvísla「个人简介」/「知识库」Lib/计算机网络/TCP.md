# TCP

面向连接、可靠的、字节流的基于传输层网络协议

- 可靠
  - 有状态
  在一次TCP连接中，每一次数据交换都和上一次紧密相关的，TCP报文存在ACK字段用于确认上次接收的报文，并且TCP在建立连接时交换了很多连接配置信息（收/发缓存大小、报文序号）
  > HTTP虽然基于TCP但是HTTP是无状态，[详情](http://xieli.leanote.com/post/6.HTTP%E6%98%AF%E5%9F%BA%E4%BA%8ETCP%E7%9A%84%EF%BC%8C%E4%B8%BA%E4%BB%80%E4%B9%88%E6%98%AF%E6%97%A0%E7%8A%B6%E6%80%81%EF%BC%9F?from=from_parent_mindnote)
  - 可控制
  当丢包或者网络环境不佳，TCP会根据具体情况调整自己的行为，控制发送速度或者重发，对于数据报丢失的情况，TCP提供重传机制

## 头格式

## 状态机

## 三次握手
### 常见问题
- 为什么TCP连接的时候是3次，关闭确是4次
- 为什么客户端发出第四次挥手的确认报文之后还需要等2MSL的时间才能释放TCP连接
> MSL: 报文最大生存时间(Maximum Segment Lifetime)



## 四次挥手

## 滑动窗口

## 重传机制

## SACK

## 重复收到数据的问题(Duplicate SACK)
