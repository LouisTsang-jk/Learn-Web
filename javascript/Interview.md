# 1. 
实现[…].count(n)，返回数组中出现次数超过n的数。
例如：[1,2,2,3,3,3].count(2)
返回：[2,3]
```
Array.prototype.cal=function(num){
    let count = {};
    let result = [];
    this.forEach((item,index)=>{
        if(count.hasOwnProperty(item)){
            count[item]++;
            if(count[item] >= num && !result.includes(item)){
                result.push(item);
            }
        }else{
            count[item] = 1;
        }
    })
    return result;
}
```

# 2. 页面打开所需要经过的流程
1. DNS Lookup
> 请求DNS服务器对域名进行查询
> 一般进行多次查询,除页面域名查询外，还有加载的JS、CSS、Image、Video等资源
2. 建立TCP请求连接
3. 服务端对请求进行响应
4. 客户端下载、解析、渲染页面
> + 解压gzip
> + 解析HTML头部代码，下载头部中的样式资源文件(CSS)和脚本资源文件(JS)
> + 遍历DOM树和CSSOM树，浏览器计算每个节点大小、坐标、颜色等样式，构造渲染树
> + 根据渲染树完成绘制过程

# 3. JavaScript的基础数据类型
+ Undefined
+ Null 
+ Boolean
+ Number
+ String
+ Symbol
+ BigInt

# 4. in和hasOwnProperty
## in 

## hasOwnProperty

# 5. JavaScript位置不同的影响
## head
初始化页面时就加载JavaScript，阻塞后续代码执行
## body(结尾)
页面初始化完毕才加载

# 6. CSS加载
+ CSS文件是并行下载的
+ CSS文件下载不会阻塞后续JS的*下载*
+ CSS文件下载会阻塞后续JS的*执行*

# 7. CSS引入方式
+ 内联
嵌入HTML标签中
+ 页级
Head中
+ 外联
外部引入

# 8. 变量引用
```
let obj = {};
function changeValue(obj){
  obj.name = 'ConardLi';
  // 这里相当于给obj重新赋予新对象的地址引用
  obj = {name:'code秘密花园'};
}
changeValue(obj);
console.log(obj.name); //-> 'ConardLi'
```


# 9. new的过程
1. 创建新对象
2. 将构造函数的作用域赋给新对象
3. 执行构造函数中的代码
4. 返回新对象
demo
```
function Person(name,age){
    this.name = name;
    this.age = age;
}
Person.prototype.hello = function(){
    return `My name is ${this.name}`;
} 
const tom = new Person('tom',22);
```
process
```
function $new(){
    var obj = {}; //stage 1
    obj.__proto__ = Person.prototype; //stage 2
    obj.name = 'tom'; //stage 3
    obj.age = 22;//stage 3
    obj.hello = function(){ //stage 3
        return 'tom';
    }
    return obj;
}
```
polyfill
```
function $new(){

}
```

# 10. MVC和MVVM
## MVC
业务逻辑、数据、界面分离的设计模式
+ Model 模型
功能的实现、数据库管理，主要负责数据存储
+ View 视图
用户所能看到的界面，主要负责数据展示
+ Controller 控制器
对请求进行处理，连接Model和View

## MVVM
是一种双向绑定的响应式设计模式
+ Model 数据层
+ View 视图层
+ ViewModel 数据视图层

# 11. 优化首屏幕
1. Vue-router异步路由
2. 不打包库文件,外部引入，防止阻塞
3. gzip

# 12. 减少白屏时间
1. Vue-router异步路由
2. webpack打包优化
3. 骨架屏
4. 模版预加载

# 13. Tree-shaking原理
利用ES6模块的静态引入，编译时可以知道实际加载情况，分析变量是否被使用或引用，从而删除代码。
为了达到更高的效果，减少代码的副作用。

# 14. docContentLoad和onLoad区别


# 15. TODO
```
(function() {
    console.log(age);
    console.log(name);
    let name = 'PapaerCrane';
    var age = 24;
})();
```

# 16. TODO
```
const myPromise = () =>
  Promise.resolve('I have resolved')

const firstFunc = () => {
    myPromise().then((res) => {
      console.log(res + ' first');
    });
    console.log('first');
}
async function secondFunc() {
    console.log(await myPromise());
    console.log('second');
}
firstFunc();
secondFunc();
```

# 17. 在一个字符串中找到第一个只出现一次的字符。如输入abaccdefbf，则输出d，找不到则输出false
```
let str = "abaccdefbf";
function firstOne(str){
    let arr = str.split('');
    let repeatPool = [];
    while(arr.length){
        const tempReg = new RegExp(arr[0],'g');
        const tempValue = arr.shift();
        if(repeatPool.includes(tempValue)){
            continue;
        }
      	console.log("Traverse");
      	const temp = [...str.matchAll(tempReg)];
        if([...str.matchAll(tempReg)].length === 1){
          	console.log(temp);
            return tempValue;
        }else{
            repeatPool.push(tempValue)
        }
    }
    return -1;
}
console.log(firstOne(str));
```


# 18. 如何实现图片懒加载
给img标签先链接到一个空白的图片，添加自定义属性`data-src`存放真正图片的src，js监听到该图片进入可视范围的时候，再将`data-src`的值赋予`src`

# 19. 传入数组对象和一个回调函数，将数组顺序打乱，但包含函数返回true的则保持位置不变
- input
```
arr = [
	{
		name: 'A'
	}, {
		name: 'B',
		sticky: true
	}, {
		name: 'C'
	}, {
		name: 'D',
		sticky: true
	}, {
		name: 'E'
	}
]
```
- code
```
/**
 * 打乱数组(可固定)
 * @param {array} arr - 目标数组
 * @param {function} fn - 类似fitler用法，如果返回true则表明改值不参与随机
 */
function shuffleFn (arr, fn) {
	const shuffleArr = []; // -> 需要固定的值
	const stickyIndex = []; // -> 需要固定的值所固定的索引值
	const stickyArr = arr.filter((e, index) => {
		const result = fn(e)
		if (result) {
			stickyIndex.push(index)
		}
		if (!result) {
			shuffleArr.push(e)
		}
		return result
  })
  // 这里用到lodash的随机
	const res = _.shuffle(shuffleArr)
	stickyArr.forEach((e, index) => {
		res.splice(stickyIndex[index], 0, e)
  })
  return res
}
```

# 20. 用reduce实现map
```
Array.prototype.fakeMap = function (processFn) {
    if (processFn) {
        return this.reduce((acc, cur) => {
            return [...acc, processFn(cur)];
        }, [])
    } else {
        return this;
    }
}
```
# 21. 用reduce实现filter
```
Array.prototype.fakeFilter = function (fn) {
    const res = this.reduce((acc, cur) => {
        const temp = fn(cur)
        if (temp) {
            return [...acc, cur]
        } else {
            return acc
        }
    }, [])
    return res
}
```

# 22. 输入URL地址到看到地址
    1. URL解析
    2. 缓存检查
    3. DNS解析
    4. TCP三次握手
    5. 数据传输
    6. TCP四次挥手
    7. 页面渲染

# 23. 匹配域名
```
/(?<=\/\/).+(?=\.)/
```

# 24. 输出
```
const btn = document.createElement('button');
btn.innerHTML = 'CLICK ME!';
document.body.appendChild(btn);
btn.addEventListener('click', () => {
    Promise.resolve().then(() => { console.log('M1') });
    console.log('L1');
})

btn.addEventListener('click', () => {
    Promise.resolve().then(() => { console.log('M2') });
    console.log('L2');
})
btn.click();
```

# 25. 队列同时只处理两个任务
```
function queue(list) {
  for (let i = 0; i < 2; i++) {
    const fn = list.shift()
    fn(finish);
  }
  function finish () {
    if (list.length > 0) {
      const fn = list.shift()
      fn(finish);
    }
  }
}

function task1(next) {
  setTimeout(function () {
    console.log(1);
    next();
  }, 1000)
}

function task2(next) {
  console.log(2)
  next();
}

function task3(next) {
  setTimeout(function () {
    console.log(3);
    next();
  }, 200)
}

function task4(next) {
  setTimeout(function () {
    console.log(4);
    next();
  }, 300)
}


queue([task1, task2, task3, task4])

// 2，3，1
```

# 26. 
```
const btn = document.createElement('button');
btn.innerHTML = 'CLICK ME!';
document.body.appendChild(btn);
btn.addEventListener('click', () => {
    Promise.resolve().then(() => { console.log('M1') });
    console.log('L1');
})

btn.addEventListener('click', () => {
    Promise.resolve().then(() => { console.log('M2') });
    console.log('L2');
})
btn.click();
```
# 27.
```
function* Generator(arg) {
  arg = yield arg + 10;
  arg = yield arg;
}

let g = Generator(10);
let v1 = g.next(10).value;
let v2 = g.next(10).value;
```
求v1和v2
