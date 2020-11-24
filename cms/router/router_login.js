const { request, response } = require("express");
const express = require("express");
const conn = require("../data/databaseConfig.js");
const md5tool = require("../tools/md5.js");

let loginRouter = express.Router();
//==============渲染登录页面====================
loginRouter.get('/', (request, response) => {
    if ( request.session.name) {
        console.log(request.cookies["session_teayeon"]);
        response.send("<script>alert('免密登录成功！'); window.location.href = '/index/index.html'</script>");
    } else {
        response.render("login", { title: '登录界面' });
    }
});

//=============处理登录验证=====================
loginRouter.post('/loginchk', (request, response) => {
    let post_admin_name = request.body.username;
    let post_admin_password = request.body.password;
    let day = request.body.livetime;
    let sqlStr = `select * from user where admin_name = '${post_admin_name}'`;
    conn.query(sqlStr, (error, result, field) => {
        if (error) {
            response.end(error);
        } else if (result.length == 0) {
            response.send("<script>alert('用户名或密码错误！'); top.history.back();</script>");
        } else {
            if (md5tool.getMd5(post_admin_password, result[0].admin_salt) == result[0].admin_password) {
                request.session.name = result[0].admin_name;
                request.session.role = result[0].admin_role;
                request.session.cookie.maxAge = day * 1000 * 60 * 60 * 24;
                if(day){
                    
                }
                response.send("<script>alert('登录成功！'); top.location.href = '/index/index.html'</script>");
            } else {
                response.send("<script>alert('用户名或密码错误！'); top.history.back();</script>");
            }
        }
    })
})



module.exports = loginRouter;