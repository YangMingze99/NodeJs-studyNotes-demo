const express = require("express");
const bodyParser = require("body-parser");
const router = require("./router/router.js");
const cor = require("./router/cors.js");
let app = express();
app.use('/public',express.static('./public'));
app.use('/upload',express.static('./upload'));
app.use('/upload_temp',express.static('./upload_temp'));
app.use(cor());
app.use('/bootstrap/', express.static('./node_modules/bootstrap3/dist/'));
app.use('/jquery/', express.static('./node_modules/jQuery/dist/'));
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json())
app.use(router);//使用路由   加载

//设置模板引擎
app.engine('html',require("express-art-template"));
app.set('view engine','html');        //设置默认后缀
//app.set('views','xixixi');     //可修改指向

app.listen(8081,function () { 
    console.log("running.....");
 })