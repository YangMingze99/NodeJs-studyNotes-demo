环境变量是否配置了Node.js，点击开始=》运行=》输入"cmd" => 输入命令"path"

环境变量中已经包含了C:\Program Files\nodejs\

#### 测试是否安装成功

打开任意一个**小黑窗**，输入`node  -v`能够看到Nodejs版本号即为安装成功。

- cmd窗口(window+R, --->运行-->录入cmd,回车)

- powershell（window10操作系统）

  

### 在node环境下运行js代码

我们前面的学习中，js代码都是在浏览器中运行的，现在开始学习nodejs后，我们有了第二个环境中可以运行js代码。

有两种方式可以运行js代码：

- 在nodejs 提供的repl中环境
- 单独执行外部的js文件

#### 方法1：在 REPL中运行

REPL(Read Eval Print Loop:交互式解释器) 表示一个电脑的环境，类似 Window 系统的终端或 Unix/Linux shell，我们可以在终端中输入命令，并接收系统的响应。

Node 自带了交互式解释器，可以执行以下任务：

- **读取** - 读取用户输入，解析输入了Javascript 数据结构并存储在内存中。
- **执行** - 执行输入的数据结构
- **打印** - 输出结果
- **循环** - 循环操作以上步骤直到用户两次按下 **ctrl-c** 按钮退出。

具体操作：

1. 在任意控制台中输入node 并回车确定，即可进行入node自带的REPL环境。
2. 此时，你可以正常写入js代码，并执行。
3. 如果要退出，连续按下两次ctrl+c

![](./assets/repl-node.gif)

#### 方法2：执行一个JS文件

1. 请事先准备好一个js文件。
   - 例设这的路径是：e:/index.js
   - 具体内容是

```javascript
var a = 1;
console.info(a + 2);
```

2. 打开小黑窗，进入到这个文件的目录
   - 技巧，在资源管理器中按下shift，同时点击鼠标右键，可以选择在此处打开powershall窗口。
   - cd 命令可以用来切换当前目录。
3. 接下来 通过  ` node `  `js文件的路径 的格式来执行这个js文件。

```javascript
node index.js
```

注意:

- 执行js文件时，如果当前命令行目录和js文件**不在**同一个盘符下，要先切换盘符
- 执行js文件时，如果当前命令行目录和js文件**在**同一个盘符中，则可以使用相对路径找到js文件并执行

### nodejs的helloworld程序

下面，我们来通过一个最基本的http服务器程序来见识nodejs的作用。

第一步：新建一个文件，名为  `d:/http.js`( 文件名及路径名可以自行设置，建议均不使用中文字符)

第二步：在文件中录入如下代码。

```javascript
// 引入http模块
const http = require('http');

// 创建服务
const server = http.createServer(function(req, res) {
  console.log(`来自${req.connection.remoteAddress}的客户端在${new Date().toLocaleTimeString()}访问了本服务器`);
  res.end('<h1>hello world! very good!!</h1> <p>' + req.connection.remoteAddress + '</p>');
});
// 启动服务
server.listen(8081, function() {
  console.log('服务器启动成功，请在http://localhost:8081中访问....');
});
```

第三步：在小黑窗中进入到d盘根目录，键入命令 `node http.js`

第四步：打开一个浏览器容器，输入'http://localhost:8081'，观察效果

第五步：把localhost改成你自己电脑的ip地址，再把这个路径发你的同学来访问。

- 如果不能访问，有可能你需要手动关闭你自己计算机的防火墙。

## node.js基本介绍

### node.js是什么

> Node.js® is a JavaScript runtime built on [Chrome's V8 JavaScript engine](https://v8.dev/).
>
> ------
>
> Node.js® 是一个基于 [Chrome V8 引擎](https://v8.dev/) 的 JavaScript 运行时

- Node全名是Node.js，但它不是一个js文件，而是一个软件
- Node.js是一个基于Chrome V8引擎的ECMAScript的运行环境，在这个环境中可以执行js代码
- Node.js提供了大量的工具（API），能够让我们完成文件读写、Web服务器创建等功能。

### nodejs和浏览器和javascript的关系

#### nodejs和浏览器的关系

相同之处：

- 都可以运行js(严格来讲是ECMAScript)代码

不同之处：

- 安装了浏览器这个软件，它不但可以执行ECMAScript，浏览器这个软件内置了window对象，所以浏览器有处理DOM和BOM的能力。
- 安装了NodeJs这个软件，它不但可以执行ECMAScript，NodeJS这个软件也内置了一些东西，包括全局成员和模块系统，同时还可以载入第三方模块来完成更强大的功能。



#### nodejs和javascript的区别？

- nodejs是一个容器（不是一个新语言），ECAMScript程序可以在这个容器中运行。
  - 不能在nodejs使用window对象，也不能在nodejs使用dom操作。因为nodejs中并不包含这个对象。
- javascript是由三个部分组成：ECAMScrtipt,Bom,Dom

### 学习Nodejs的意义

在我们熟悉的浏览器上执行JS不是很好吗？为什么要学习Nodejs呢？主要原因：

- 大前端必备技能
- 使得JS能够和操作系统 “互动” （读取文件，写入文件等，管理进程）
- 为JavaScript提供了服务端编程的能力
  - 文件IO
  - 网络IO
  - 数据库
- 了解接口开发，进一步理解Web开发，了解后端同学的工作内容



## node中的模块化

在项目的开发过程中，随着功能的不断增强，代码量，文件数量也急剧增加，我们需要把一个大函数拆成小函数，把一个大文件拆成小文件，把一个大功能拆成若干个小功能。这里很自然地就涉及到模块化的想法：一个复杂的系统分成几个子系统，体现在几个小的文件在一起组成一个大的文件，集成强大的功能。



遗憾的是es5不支持模块化：就是在一个js文件内不能引入其他js文件。不能通过一个大文件去集成若干个小文件。（不是说一个html文件中不能包含多个js文件）。

这样就会带来多个问题：

1. 文件的加载先后顺序
2. 不同的文件内部定义的变量共享

### 模块化

一个js文件中可以引入其他的js文件，能使用引入的js文件的中的变量、数据，这种特性就称为模块化。使用模块化开发可以很好的解决变量、函数名冲突问题，也能灵活的解决文件依赖问题。

- 以前

  es5不支持模块化，让前端人员很为难。为了让支持模块化，我们一般会借用第三方库来实现：

  - sea.js. https://www.zhangxinxu.com/sp/seajs/
  - require.js. https://requirejs.org/

- 现在
  - es6原生语法也支持模块化
  - Nodejs内部也支持模块化（与es6的模块化有些不同之处），具体的语法在后面来介绍

### nodejs中的模块

每个模块都是一个独立的文件。每个模块都可以完成特定的功能，我们需要时就去引入它们，并调用。不需要时也不需要要管它。（理解于浏览器的js中的Math对象）

nodejs模块的分类

- 核心模块
  - 就是nodejs自带的模块，在安装完nodejs之后，就可以随意使用啦。相当于学习js时使用的Array对象。
  - 全部模块的源代码 https://github.com/nodejs/node/tree/master/lib
- 自定义模块
  - 程序员自己写的模块。就相当于我们在学习js时的自定义函数。
- 第三方模块
  - 其他程序员写好的模块。nodejs生态提供了一个专门的工具来管理第三方模块，后面我们会专门讲到。
  - 相当于别人写好的函数或者库。例如我们前面学习的JQuery库，arttemplate等。

#### 核心模块

> 官网文档 https://nodejs.org/dist/latest-v10.x/docs/api/
>
> 中文文档 http://nodejs.cn/api/
>
> 学会查 API，远远比会几个 API 更重要

- 核心模块就是 Node 内置的模块，需要通过唯一的标识名称来进行获取。
- 每一个核心模块基本上都是暴露了一个对象，里面包含一些方法供我们使用
- 一般在加载核心模块的时候，变量的起名最好就和核心模块的标识名同名即可
  - 例如：`const fs = require('fs')`

示例：用fs模块读取文件

```javascript
const fs = require('fs');
let htmlStr = fs.readFileSync( 'index.html')).toString();
console.log(htmlStr)
```

注意：require()中直接写模块的名字

- 不要加.js
- 不要加其它路径



#### 第三方模块

所谓第三方模块，顾名思义，就是别人写的模块（不是自己写的，也不是nodejs自带的）。在浏览器环境中使用第三方函数或者是库是很自然的，一般有两步：

1. 去官网下载js文件。或者使用DSN外链。
2. 在自己的html页面中引入

以jquery为例

1. 去jquery官网中下载jquery.js文件。
2. 在html页面中使用 script link标签引入这个js文件
3. 开始使用啦

这个过程中很容易，我们也慢慢习惯了，但这种使用方式是有问题的：

- 随着引入的第三方库越来越多，你得每一个库都去他们各自的官网上下载。引入10个库，都得下载10次
- 各个库的版本号在升级更新时，你也无法准确得知。

在node中，我们通过npm来解决下载、使用、管理第三方模块的问题。

 

## fs模块

fs模块是文件操作模块。fs是 FileSystem的简写。它用来对文件，文件夹进行操作。

手册：http://nodejs.cn/api/fs.html

```js
// 引入模块。
// 可以使用var、let，但是建议使用const，因为我们不希望它被改变
const fs = require('fs');
```

fs模块中操作文件(或者文件夹)的方法，大多都提供了两种选择：

- 同步版本的
- 异步版本的

### 文件内容读取 - readFile

#### 异步格式

```js
fs.readFile('文件路径'[,选项], (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

说明：

- 第一个参数：文件路径。 相对路径和绝对路径均可。
- 第二个参数： 配置项，可选参数。主要用来配置字符集。一般可设置为'utf8'

​      如果不设置该参数，文件内容会以二进制形式返回。

- 参数3: 读取完成后触发的回调函数。有两个参数 --- err 和 data

  - 读取成功

    - err: null

    - data: 文件内容，如果不设置参数2,则返回二进制数据。可以使用 toString() 方法将二进制数据

      转为正常字符串

  - 读取失败

    - err: 错误对象
    - data: undefined

示例：

```javascript
const fs = require("fs")
fs.readFile('文件路径',"utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});
```

#### 同步格式

与异步格式不同在于：

- api的名字后面有Sync
- 不是通过回调函数来获取值，而是像一个普通的函数调用一样，直接获取返回值

```javascript
const fs = require("fs")
let rs = fs.readFileSync('文件路径',"utf8");
console.log(rs)
```



### 文件写入 

#### 覆盖写入 writeFile

功能：向指定文件中写入字符串（覆盖写入）， 如果没有该文件则尝试创建该文件。它把把文件中的内容全部删除，再填入新的内容。

格式：`fs.writeFile(var1, var2, var3, var4);`

参数1: 要写入的文件路径 --- 相对路径和绝对路径均可，推荐使用绝对路径

参数2: 要写入文件的字符串

参数3: 配置项，设置写入的字符集，默认utf-8

参数4: 写入完成后触发的回调函数，有一个参数 --- err （错误对象）

```javascript
const fs = require('fs')
fs.writeFile('./a.txt', 'hello world nah \n asfsdf', err => {
  if (err) {
    console.info(err)
    throw err
  }
})
```



#### 文件追加 appendFile

功能 ：向指定文件中写入字符串（追加写入）， 如果没有该文件则尝试创建该文件

格式：`fs.appendFile(var1, var2, var3, var4);`

参数1: 要写入的文件路径 --- 相对路径和绝对路径均可，推荐使用绝对路径

参数2: 要写入文件的字符串

参数3: 配置项，设置写入的字符集，默认utf-8

参数4: 写入完成后触发的回调函数，有一个参数 --- err （错误对象）

```javascript
const fs = require('fs')

fs.appendFile('./a.txt', '\n 为天地立命', err => {
  if (err) {
    console.info(err)
    throw err
  }
})
```



### 路径问题

在读取文件时，写相对路径是容易出问题的。下面我们来看会出什么问题。

假设有如下两个文件，它们所处的目录及文件名如下所示：

```
day01/js/fs.js
day01/js/text.txt
```

fs.js代码的作用是读出text.txt中的内容，并显示出来。

```javascript
const fs = require('fs');
fs.readfilesync("./text.txt",'utf8'); 
//注意这里对text.txt的访问使用的是相对"fs.js" 本身的路径
```



现在，我们想要运行fs.js这个文件有两种方式：

- 如果终端中的路径定位在`js目录`下，则通过`node fs.js`

- 如果终端中的路径定位在`day01目录`下，则通过：`node js/fs.js` 

  此时就不能正确找到文件了。



原因是：我们在fs中读取文件时，使用的是相对路径，而相对路径的参考点是运行这个js文件的小黑窗的路径。而这个路径我们是可以通过cd命名来调整的。

解决方法，就是在操作文件时，使用**绝对路径**来定位文件。

#### \__dirname, __filename 获取绝对路径

绝对路径： 从磁盘根目录开始到指定文件的路径。

相对路径：是以某个文件的位置为起点，相对于这个位置来找另一个文件。

nodejs中提供了两个全局变量来获取获取绝对路径：

- __dirname：获取当前被执行的文件的文件夹所处的绝对路径
- __filename：获取当前被执行的文件的绝对路径

#### path模块

http://nodejs.cn/api/path.html#path_path

它是一个核心模块，用来处理路径问题：拼接，分析，取后缀名。

- path.basename（路径）获取
- path.join()
- path.parse(path) 转成一个对象

```javascript
path.basename('/foo/bar/baz/asdf/quux.html');// 返回: 'quux.html'
path.basename('/foo/bar/baz/asdf/quux.html', '.html');// 返回: 'quux'
path.dirname('/foo/bar/baz/asdf/quux');// 返回: '/foo/bar/baz/asdf'
path.extname('index.html');// 返回: '.html'
```



### 附：fs模块中的常用方法

| API                                         | 作用              | 备注           |
| ------------------------------------------- | ----------------- | -------------- |
| fs.access(path, callback)                   | 判断路径是否存在  |                |
| fs.appendFile(file, data, callback)         | 向文件中追加内容  |                |
| fs.copyFile(src, callback)                  | 复制文件          |                |
| fs.mkdir(path, callback)                    | 创建目录          |                |
| fs.readDir(path, callback)                  | 读取目录列表      |                |
| fs.rename(oldPath, newPath, callback)       | 重命名文件/目录   |                |
| fs.rmdir(path, callback)                    | 删除目录          | 只能删除空目录 |
| fs.stat(path, callback)                     | 获取文件/目录信息 |                |
| fs.unlink(path, callback)                   | 删除文件          |                |
| fs.watch(filename[, options]\[, listener])  | 监视文件/目录     |                |
| fs.watchFile(filename[, options], listener) | 监视文件          |                |
| fs.existsSync(absolutePath)                 | 判断路径是否存在  |                |

### 附：path模块其它方法列表

| 方法                       | 作用                               |
| -------------------------- | ---------------------------------- |
| path.basename(path[, ext]) | 获取返回 path 的最后一部分(文件名) |
| path.dirname(path)         | 返回目录名                         |
| path.extname(path)         | 返回路径中文件的扩展名(包含.)      |
| path.format(pathObject)    | 将一个对象格式化为一个路径字符串   |
| path.join([...paths])      | 拼接路径                           |
| path.parse(path)           | 把路径字符串解析成对象的格式       |
| path.resolve([...paths])   | 基于当前**工作目录**拼接路径       |





## http模块-基本使用

http是nodejs的核心模块，让我们能够通过简单的代码创建一个Web服务器，处理http请求。

### 快速搭建Web服务器

1. 新建文件，写入如下代码。

```js
// http.js
// 引入核心模块http
const http = require('http');

// 创建服务
const server = http.createServer(function(req, res) {
  console.log(req.connection.remoteAddress);
  res.end('hello world');
});
// 启动服务
server.listen(8081, function() {
  console.log('success');
});
```

2. 运行代码, `node http.js`
3. 在浏览器地址栏中输入：localhost:8081 观察效果。

说明

1. 把localhost改成本机ip地址，让同一局域网的同学访问。

2. 如果你修改了代码，必须先停止服务，然后再启动。这样才能生效。

   ctrl+c 停止服务。

3. 更改res.end()的内容，`重启`后，再次观察。

   - 获取ip，返回给浏览器



### 理解请求与响应

在上面的代码中，我们通过http.createServer方法创建一个http服务。

```javascript
// 创建服务
const server = http.createServer((req, res) => {
  console.log(req.connection.remoteAddress);
  res.end('hello world');
});
```

其中的参数是一个函数，这个函数是一个匿名函数，这个函数充当回调函数的角色，当有http请求时，它会自动被调用。



这个回调函数有它有两个参数。这两个参数非常重要，也非常复杂.

- 第一个参数表示`来自客户端浏览器的请求`，第二个参数用来`设置对本次请求的响应`。它们的形参名并不重要，但是，一般第一个参数名使用req或者request表示，第二个参数使用res或者resposne表示。

- 当某个客户端来请求这个服务器时，这个函数会自动调用，同时会自动给这两个参数赋值。第一个参数中包括本次请求的信息。
  - req：请求
    - req.url。本次请求的地址
    - req.method。   获取请求行中的请求方法
    - req.headers。    获取请求头
  
- 第二个参数用来设置本服务器对这次请求的处理。

  - 这个参数一般命名是res，它是一个对象，其中有很多方法和属性。

  - res.end() 

    - 把把本次的处理结果返回给客户端浏览器
    - 如果不写这一句，则客户端浏览器永远收不到响应。

  - res.setHeader()  设置响应头，比如设置响应体的编码

    `res.setHeader('content-type', 'text/html;charset=utf-8');`

  - res.statusCode 设置状态码



### 根据不同 url 地址处理不同请求

前面已经可以对浏览器的请求做出响应了，但是响应的内容总是一样的。能不能根据url的不同，做出合适的响应呢？当然可以，那么首先就需要知道浏览器请求的url是什么。

涉及到和请求相关的信息，都是通过请求响应处理函数的第一个参数完成的。代码示例

```javascript
// http.js
// 引入核心模块http
const http = require('http');

// 创建服务
const server = http.createServer(function(req, res) {
  if(req.url === "/a.html"){
      // 读出文件内容
      // 通过res.end()返回
  }
  else if(req.url === "/b.html"){
      
  }
    else{
        res.end("");
    }
});
// 启动服务
server.listen(8081, function() {
  console.log('success');
});
```

res.setHeader('content-type', 'text/html;charset=utf-8');



## HTTP 协议

### HTTP 协议是什么

- HTTP(HyperText Transfer Protocol) 超文本传输协议。
- 协议双方： 浏览器与web服务器都要遵守的协议
- 请求通常是由像浏览器这样的接受方发起的
- HTTP 协议中明确规定了`请求数据`和`响应数据`的格式(**报文**)
  - 浏览器 请求 资源 要遵守 http 协议：  请求报文
  - 服务器 返回 资源 要遵守 http 协议：  响应报文

### 请求报文

http协议规定了浏览器向服务器发请求时的格式。

- 它由三个部分组成

1. 请求行
2. 请求头
3. 请求体（可能是空）

- 可以使用 chrome network面板来查看请求。



#### 请求行

格式： `请求方法  请求路径 协议及版本`

示例：

```http
GET / HTTP/1.1
GET /index.html HTTP/1.1
GET /common/get?id=123&name=jake HTTP/1.1
```



在http模块中，我们可以通过req.method来获取本次请求的方法。请求路径会在保存在req.url属性中。

```javascript
const server = http.createServer(function(req, res) {
  console.log(req.method);
  console.log(req.url)
});
```



#### 请求头

- 浏览器在向服务器发送请求的时候自动携带的信息，一般不需要主动去设置；
- 信息是由键值对组成
- 如果需要设置请求头，使用setRequestHeader方法来设置
- [参考链接](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)

| 键              | 值                                      |
| --------------- | --------------------------------------- |
| Host            | 请求的主机                              |
| Cache-Control   | 控制缓存（例如：max-age=60 缓存 60 秒） |
| Accept          | 客户端期望接收的文件的类型，逗号分隔    |
| User-Agent      | 标识什么客户端发送的这次请求            |
| Referer         | 这次请求的来源                          |
| Accept-Encoding | 可以接受的压缩编码                      |
| content-type    | 设置传递给服务器的请求体的格式          |

##### User-Agent

在服务器端，我们可以通过req.headers来获取所有的请求头信息。

在通过浏览器向web服务器发http请求时，会在请求头中自动附加上一些字段，例如：user-agent字段。这个字段中会记录该浏览器所在的设备的基本信息。例如，这个浏览器是在什么操作系统上运行，版本是什么，等等。 这个请求头到了服务器端之后，我们可以通过`req.headers['user-agent']`来拿到这个值。分析从这个值中保存的信息再进行后续的处理，例如：

- 对用户进行画像
- 统计有多少人，使用平板还是手机来访问这个网部
- 根据不同的设置进行页面跳转等。

```javascript
let userAgent = req.headers['user-agent'];
  if (userAgent.includes('Windows')) {
    console.log('你在使用window，pc端！！');
  } else if (userAgent.includes('iPad')) {
    console.log('你在使用iPad端！！');
  } else if (userAgent.includes('iPhone')) {
    console.log('你在使用iPhone！！');
  }
```

上面的代码对信息的分析比较粗略：只是根据是否包含了某些关键字来区分操作系统，更详细的分析可以参考：[zepto.js中对于用户设备的检测](https://github.com/madrobby/zepto/blob/master/src/detect.js#files)



#### 请求体

在向http服务器发请求时，我们会附加上一些数据，例如做用户登陆验证时，我们发post请求会附上用户名和密码，这里的用户名和密码就是通过请求体来发送的。

值得注意的是，get类型的请求没有请求体，它的参数是通过附在url地址后面传递的 。

POST 请求有请求体，请求体就是发送给服务器的数据。



### 响应报文

http协议规定了服务器向浏览器返回数据时的格式。

- 它由三个部分组成

1. 响应行
2. 响应头
3. 响应体

#### 响应行

格式：  协议及版本 状态码  说明

```
-	状态码 ： 用来告诉浏览器服务器处理本次请求的结果。 不同的状态码对应不同的结果。
```

示例：

```js
HTTP/1.1 200 OK
HTTP/1.1 404 Not Found 
// 状态码：
// - 描述了请求过程中所发生的情况
// - 每个状态码的第一位数字都用于描述状态的一般类别("成功"、"出错"等)
// - 常见状态码及含义
//   - 200 - 成功
//   - 302 - 重定向
//   - 304 - 读取缓存
//   - 404 - 请求的资源不存在
//   - 500 - 服务器内部错误
// 
```

可以通过res.statusCode 来设置响应码。

```
res.statusCode
```

参考链接 https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status

#### 响应头

- 服务器返回响应的时候携带了附加信息
- 由键值对组成
- 每个请求的响应头可能都不一样：它完全取决于服务器；

几个常见的响应头

| 键               | 值               |
| ---------------- | ---------------- |
| Date             | 响应时间         |
| Server           | 服务器信息       |
| **Content-Type** | 响应体的内容类型 |
| Content-Length   | 响应的内容大小   |

可以通过如下代码来模拟

格式是：

`res.setHeaders('键','值');`

示例

```javascript
const server = http.createServer(function(req, res) {
  res.setHeaders('content-type','text/html;charset=utf8')
});
```

#### 响应体

本次请求返回的主体内容。根据请求的不同，返回的内容也不同：

- 如果请求的是网页返回网页的内容
- 如果请求的是css返回样式文件的内容
- 如果请求的是图片返回图片的内容
- ......

在代码中，响应体的内容体现在res.end()中的内容上。

```
res.end(响应体)
```



## 使用 nodemon来自动重启http服务

我们每次修改了代码，都需要重启http服务器:

1. 进入控制台
2. 按下ctrl+c，停止已有http服务器。
3. 手动运行：node index.js 来重启服务器。

这会很麻烦。

有没有一个工具会自动检测到我们的修改并自动重新运行我们的代码呢？

有，它叫nodemon。https://www.npmjs.com/package/nodemon

### 安装 nodemon

通过npm包管理工具来进行安装。任意打开一个小黑窗，输入如下命令

```bash
npm install -g nodemon
```

此操作`需要联网`，根据网络速度所耗时间不同。

- npm是一个工具。用来管理node代码中要使用的第三方模块。它是随着node的安装而自动安装的：如果你安装node，则npm也已经安装过了，你可以直接使用。


### 使用nodemon

等待安装成功之后，使用方法也非常简单：在命令中，使用nodemon来代替node。

例如，

```bash
node server.js  // 
// 改成 nodemon server.js
nodemon server.js
```

它的好处在于会自动监听server.js这个文件的变化，如果变化了，就会重新自动再去运行。相当于是：

```bash
while(server.js 变化了){
  node server.js
}
```

说明：

- 它是一个第三方的包（其它程序员写的工具），我们这里是通过全局安装的方式进行。

## http模块-处理静态资源

静态资源指的是html文件中链接的外部资源，如css、js、image文件等等。

### 处理二次请求

从服务器获取html文件之后，如果这个html文件中还引用了其它的外部资源（图片，样式文件等），则浏览器会重新再发请求。

假设在index.html中还引入了 style.css 1.png 或者 .js文件，则：

浏览器请求localhost:index.html之后，得到的从服务器反馈的内容，解析的过程中还发现有外部的资源，所以浏览器会再次发出第二次请求，再去请求相应的资源。

一个最朴素的想法是根据不同的请求来返回不同的文件。

```javascript
const http = require('http');
const fs = require('fs');
const path = require('path');

//创建服务器
const app = http.createServer((req, res) => {

  if (req.url === '/index.html') {
    let htmlString = fs.readFileSync(path.join(__dirname, 'index.html'));
    res.end(htmlString);
  }
  else if (req.url === '/style.css') {
    let cssString = fs.readFileSync(path.join(__dirname, 'style.css'));
    res.setHeader('content-type', 'text/css');
    res.end(cssString);
  } else if (req.url === '/1.png') {
    let pngString = fs.readFileSync(path.join(__dirname, '/1.png'));
    res.end(pngString);
  } else {
    res.setHeader('content-type', 'text/html;charset=utf-8');
    res.statusCode = 404;
    res.end('<h2>可惜了, 找不到你要的资源' + req.url + '</h2>');
  }
}); 
//启动服务器，监听8082端口
app.listen(8082, () => {
  console.log('8082端口启动');
});
```

### 为不同的文件类型设置不同的 Content-Type

通过使用res对象中的setHeader方法，我们可以设置content-type这个响应头。这个响应头的作用是告诉浏览器，本次响应的内容是什么格式的内容。以方便浏览器进行处理。

常见的几中文件类型及content-type如下。

- .html：` res.setHeader('content-type', 'text/html;charset=utf-8') `
- .css：`res.setHeader('content-type', 'text/css;charset=utf-8')`
- .js：`res.setHeader('content-type', 'application/javascript') `
- .png：`res.setHeader('content-type', 'image/png')`

其它类型，参考这里：https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types

### 批量处理请求

由于我们不法事先得知一个.html文件中会引用多少个静态资源，所以，我们不能像处理某个页面一样去处理它们。我们的解决办法有两大类是：

1. 把这类静态资源连同所有的.html文件全放在固定的文件夹中。在用户请求时，当判断当前的req.url是在这个文件夹下就是直接读内容，并返回。

```javascript
// 创建服务器

const fs = require('fs');

// 1. 加载http
const http = require('http');
// 2. 创建server对象
const server = http.createServer((req, res) => {
    // 浏览器请求的是 /message.html
    console.log(req.url);


    fs.readFile('./public' + req.url, (err, data) => {
        if (err) return console.log(err);
        // 没有错误，将读取的结果响应给浏览器
        res.end(data);
    });

    /* if (req.url === '/message.html') {
        fs.readFile('./public/message.html', (err, data) => {
            if (err) return console.log(err);
            // 没有错误，将读取的结果响应给浏览器
            res.end(data);
        });
    } else if (req.url === '/assets/bootstrap.css') {
        fs.readFile('./public/assets/bootstrap.css', (err, data) => {
            if (err) return console.log(err);
            // 没有错误，将读取的结果响应给浏览器
            res.end(data);
        });
    } else if (req.url === '/assets/avatar.png') {
        fs.readFile('./public/assets/avatar.png', (err, data) => {
            if (err) return console.log(err);
            // 没有错误，将读取的结果响应给浏览器
            res.end(data);
        });
    } */
});
// 3. 监听端口，开启服务
server.listen(4000, () => console.log('开始监听 4000'));
```

- 2. 分析后缀名，如果是允许的，就直接返回

```javascript
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
//创建服务器
const app = http.createServer((req, res) => {
  //实现静态web服务器的效果
  // 对于每一个请求，如果它的req.url是.html,.css,.png 这类资源
  // 1. 判断一个url的后缀是不是.html,css。。
  //    获取后缀;
  //    判断
  // 2.我们就直接读入文件，并返回
  console.log(req.url);

  let urlObj = url.parse(req.url);
  let extName = path.extname(urlObj.pathname);
  if (extName === '.html' || extName === '.css' || extName === '.png' || extName === '.bmp') {
    // 拼接绝对路径;
    // console.log(path.join(__dirname, req.url));
    let absolutePath = path.join(__dirname, urlObj.pathname);
    // 如果这个文件存在，就读出并返回
    if (fs.existsSync(absolutePath)) {
      let str = fs.readFileSync(absolutePath);
      res.end(str);
    } else {
      res.statusCode = 404;
      res.end(urlObj.pathname + ' not found!');
    }
  } else {
    res.statusCode = 404;
    res.end(urlObj.pathname + ' not found!');
  }
});
//启动服务器，监听8082端口
app.listen(8082, () => {
  console.log('8082端口启动');
});
```

#### 前端jsonp get请求数据 模板渲染

- 前端页面

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    
</head>

<body>
    <table border="1" width="500">
        <thead>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>AGE</th>
                <th>GENDER</th>
                <th>ACTION</th>
            </tr>
        </thead>
        <tbody>

        </tbody>
    </table>
</body>
<script src="./js/jquery.js"></script>
<script>
    $.ajax({
        url: "http://localhost:8081/list",
        method: 'get',
        dataType: 'jsonp',
        success: function (data) {
            var html = '';
            data.forEach(function (d) {
                html += `
                        <tr>
                            <td>${d.id}</td>
                            <td>${d.name}</td>
                            <td>${d.age}</td>
                            <td>${d.gender}</td>
                            <td><a href='http://localhost:8080/?edi=${d.id}'>edit</a>/<a href='http://localhost:8080/?del=${d.id}'>delete</a></td>
                        </tr>
                    `;
            });
            $('tbody').html(html);
        }
    });
</script>
</html>
```

- 后台app.JS

```javascript
// 单一入口
const fs = require("fs");
const http = require("http");
const path = require('path');
const url = require('url');
const data = require('./data/data.json');
const ROOT = __dirname;

const app = http.createServer(function (request , response) { 
    let urlObj = url.parse(request.url, true);//转为对象
    let pathName = url.parse(request.url).pathname;
    let extName = path.parse(pathName).ext;
    if(pathName == '/list'){
    //返回应是jquery对应的对象
        return response.end(urlObj.query.callback + '('+JSON.stringify(data)+')');
    }
    if(pathName == '/del'){
		console.log(urlObj.query);
		response.end("<script>location.href='index.html'</script>");
	}
 })
 app.listen(8081,function () { 
     console.log("running.............");
  })
```



## npm命令

npm install 安装模块

```npm
本地安装（local）
npm install <name>@<version>

全局安装（global）,使用 -g 或 --global
npm install <name>@<version> -g

-save 安装包信息将加入到dependencies（生产阶段的依赖）
npm install gulp --save 或 npm install gulp -S
package.json 文件的 dependencies 字段：
"dependencies": {
    "gulp": "^3.9.1"
}

-D, --save-dev 安装包信息将加入到devDependencies（开发阶段的依赖），所以开发阶段一般使用它
npm install gulp --save-dev 或 npm install gulp -D

模块的依赖都被写入了package.json文件后，他人打开项目的根目录（项目开源、内部团队合作），使用npm install命令可以根据dependencies配置安装所有的依赖包
npm install

```

npm uninstall 卸载模块 

```npm
基础语法
npm uninstall [<@scope>/]<pkg>[@<version>]... [-S|--save|-D|--save-dev|-O|--save-optional]
aliases: remove, rm, r, un, unlink

如卸载开发版本的模块
npm uninstall gulp --save-dev
```

npm update 更新模块

```npm
基础语法
npm update [-g] [<pkg>...]
```

npm ls 查看安装的模块

```
基础语法
npm ls [[<@scope>/]<pkg> ...]
aliases: list, la, ll
```

```
查看全局安装的模块及依赖 
npm ls -g 
```

npm init 在项目中引导创建一个package.json文件

```
npm init [-f|--force|-y|--yes]
```

npm version 查看模块版本

```
基础语法
npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git]

'npm [-v | --version]' to print npm version
'npm view <pkg> version' to view a package's published version
'npm ls' to inspect current package/dependency versions
```

### nrm的作用与安装使用

#### **一、nrm是什么？**

这是官方的原话：

　　开发的npm registry 管理工具 [nrm](https://github.com/Pana/nrm), 能够查看和切换当前使用的registry, 最近NPM经常 down 掉, 这个还是很有用的哈哈

#### 二、nrm的安装

*$* npm install -g nrm

#### 三、nrm命令

- *$* nrm ls　　// 查看所有的支持源（有*号的表示当前所使用的源,以下[name]表示源的名称）

- $ nrm use [name]　　// 将npm下载源切换成指定的源

- $ nrm help　　// 查看nrm帮助

- $ nrm home [name]　　// 跳转到指定源的官网

-   如果在你的网络不太理想或者在不能FQ的情况下，又或者收到其他网络限制导致不能使用npm原本的源进行下载时nrm就非常有用了，只需要

  $ nrm ls



## Node.js GET/POST请求

#### 获取GET请求内容

由于GET请求直接被嵌入在路径中，URL是完整的请求路径，包括了?后面的部分，因此你可以手动解析后面的内容作为GET请求的参数。

node.js 中 url 模块中的 parse 函数提供了这个功能。

```javascript
var http = require('http');
var url = require('url');
var util = require('util');
 
http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end(util.inspect(url.parse(req.url, true))); //可打印url的所有参数
}).listen(3000);
```



#### 获取 POST 请求内容

POST 请求的内容全部的都在请求体中，http.ServerRequest 并没有一个属性内容为请求体，原因是等待请求体传输可能是一件耗时的工作。恶意的POST请求会大大消耗服务器的资源，所以 node.js 默认是不会解析请求体的，需要的时候，需要手动来做。

```javascript
//基本语法结构
var http = require('http');
var querystring = require('querystring');
var util = require('util');
 
http.createServer(function(req, res){
    // 定义了一个post变量，用于暂存请求体的信息
    var post = '';     
    // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    req.on('data', function(chunk){    
        post += chunk;
    });
    // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
    req.on('end', function(){    
        post = querystring.parse(post);
        res.end(util.inspect(post));
    });
}).listen(3000);
```

```javascript
//表单提交 POST
var http = require('http');
var querystring = require('querystring');
var postHTML = 
  '<html><head><meta charset="utf-8"><title>菜鸟教程 Node.js 实例</title></head>' +
  '<body>' +
  '<form method="post">' +
  '网站名： <input name="name"><br>' +
  '网站 URL： <input name="url"><br>' +
  '<input type="submit">' +
  '</form>' +
  '</body></html>';
 
http.createServer(function (req, res) {
  var body = "";
  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    // 解析参数
    body = querystring.parse(body);
    // 设置响应头部信息及编码
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
 
    if(body.name && body.url) { // 输出提交的数据
        res.write("网站名：" + body.name);
        res.write("<br>");
        res.write("网站 URL：" + body.url);
    } else {  // 输出表单
        res.write(postHTML);
    }
    res.end();
  });
}).listen(3000);
```



