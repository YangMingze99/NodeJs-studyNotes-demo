const express = require("express");
let routerLogin = express.Router();

routerLogin.get('/', function (request, response) {
    if (request.session.views) {
        //       console.log(request.session);
        //    if(request.cookies.name){    //cookie方式
        //        response.send('<script>alert("免登录成功! 用户:'+request.cookies.name+'" );location.href = "/index";</script>');
        response.send('<script>alert("免登录成功(获取到session)! 用户:' + request.session.userInfo.name + '" );location.href = "/index";</script>');
    } else {
        response.render('login');
    }
});

routerLogin.post('/logincheck', function (request, response) {
    //console.log(requset.body);
    //判断用户名正确性
    if (request.body.username == "admin") {
        let day = 1;
        if (request.body.ttlTime) {
            day = request.body.ttlTime;
        }
        request.session.views = 1;
 //       console.log(request.session);
        request.session.userInfo = {
            'name': request.body.username
        };
        request.session.cookie.maxAge = day * 1000 * 60 * 60 * 24;
        //        response.cookie('name', request.body.username, { maxAge: 1000 * 60 * 60 * 24 * day });
        response.send("<script>alert('登录成功!');location.href = '/index';</script>")
    } else {
        request.session.views = 0;
        response.send("<script>alert('登录失败请检查输入的用户名和密码!');history.back();</script>");
    }
});

routerLogin.get('/logout', function (req, res) {
    //   res.clearCookie("name");
    req.session.destroy();     //req.session.cookie.maxAge = 0
 //   console.log(req.session);
    res.send("<script>alert('注销登录成功!');location.href = '/index';</script>")
})
module.exports = routerLogin;