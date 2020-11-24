const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const loginRouter = require("./router/router_login.js");
const indexRouter = require("./router/router_index.js");
const typeRouter = require("./router/router_types.js");
const newsRouter = require("./router/router_news.js");
const myeditor = require("./middleware/myueditor.js");

const conn = require("./data/databaseConfig.js");
const tools = require('./tools/md5.js');

const app = express();
app.use('/bootstrap/', express.static('./node_modules/bootstrap/dist/'));
app.use('/jquery/', express.static('./node_modules/jQuery/dist/'));
app.use('/ueditor/',express.static('./node_modules/ueditor/example/public/ueditor/'));
app.use('/images/', express.static('./images/'));
app.use('/images_temp/', express.static('./images_temp/'));
app.use('/newspicture/',express.static('./images/newspicture/'));
app.engine('html', require("express-art-template"));
app.use(myeditor);
app.use(cookieParser());
let options = {};
let sessionStore = new MySQLStore(options/* session store options */, conn);
app.use(session({
    name : 'session_teayeon',
    store:sessionStore,  //session代理存储  
    secret: 'keyboard cat', //加密字符串
    resave: false,          //更改之后是否重新保存
    saveUninitialized: true, //没有初始化是否保存
    cookie: {                //存储session id的cookie
    },
//    rolling:true;                  //每次请求重新设置有效时间   默认：false
}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'html');       

app.use('/login',loginRouter);
app.use('/index',indexRouter);
app.use('/type',typeRouter);
app.use('/news',newsRouter);


app.listen(8081,function(){
    console.log("running.......");
})