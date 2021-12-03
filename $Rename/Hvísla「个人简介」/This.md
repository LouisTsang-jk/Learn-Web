# This
- 默认绑定
  区分客户端(浏览器)还是服务端(Node)。

  - Node: 没有window，返回undefined
  - Browser: 指向window

- 隐式绑定

  ```
  window.name = 'Global';
  function say () {
  	return this.name;
  }
  const person1 = {
  	name: 'Louis',
  	say
  }
  say(); // Global
  person1.say(); // Louis
  ```

  `A.say()`调用的时候会使用`A`的上下文，隐式绑定会将`this`绑定到`A`。

  > 即使中间嵌套了很多层，只需关注最后一层即可。

  ```javascript
  const person2 = {
  	name: 'Rose',
  	friend: person1
  }
  person2.friend.say();
  ```

  回调函数会丢失隐式绑定

  ```javascript
  person1.say(); // Global
  setTimeout(person1.say, 100); // Global
  setTimeout(function () {
  	person1.say();
  }, 0); // Louis
  ```

- 硬绑定

  通过`bind`,`call`,`apply`

  ```javascript
  person1.say.call(person2); // Rose
  ```

  

- new绑定

## 参考

[嗨，你真的懂this吗？｜掘金](https://juejin.cn/post/6844903805587619854) 

