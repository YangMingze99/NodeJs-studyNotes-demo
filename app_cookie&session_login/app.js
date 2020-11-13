const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const indexRouter = require("./router/router_index.js");
const loginRouter = require("./router/router_login.js");

let app = express();
app.engine('html', require("express-art-template"));
app.use(cookieParser());
//session中间件
app.use(session({
    name : 'session_teayeon',
    secret: 'keyboard cat', //加密字符串
    resave: false,          //更改之后是否重新保存
    saveUninitialized: true, //没有初始化是否保存
    cookie: {                //存储session id的cookie
    },
//    rolling:true;                  //每次请求重新设置有效时间   默认：false
}))
//bodyParser 配套使用
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.set('view engine', 'html');        //设置默认后缀
app.use('/index', indexRouter);
app.use('/login', loginRouter);
app.listen(8081, function () {
    console.log("running.......");
});