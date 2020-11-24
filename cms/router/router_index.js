const { request, response } = require("express");
const express = require("express");
const conn = require("../data/databaseConfig.js");
const md5tool = require("../tools/md5.js");
const randomtool = require("../tools/random_number.js");
const checkLogin = require("../middleware/chkSession.js");
const multer = require("multer");
const path = require("path");

let indexRouter = express.Router();
indexRouter.use(checkLogin());
indexRouter.get('/trans.html', (request, response) => {
    response.render('trans')
})


//渲染首页
indexRouter.get('/index.html', (request, response) => {
    let admin_name = request.session.name;
    let sqlStr = `select admin_icon from user where admin_name = '${admin_name}'`;
    conn.query(sqlStr, (error, result, field) => {
        let typeStr = `select * from types where parent_id = 0`;
        conn.query(typeStr, (err, resu) => {
            if (!error && !err) {
                response.render("index", {
                    title: "主页",
                    name: admin_name,
                    src: result[0].admin_icon,
                    typelist: resu
                });
            } else {
                console.log(error);
            }
        })
    })


});

//渲染iframe 首页
indexRouter.get('/main.html', (request, response) => {
    response.render("main", { title: "主页" });
});

//渲染修改密码页面
indexRouter.get('/editpassword.html', (request, response) => {
    response.render("editpassword", { title: "修改密码" });
});

//提交修改密码
indexRouter.post('/edit', (request, response) => {
    let oldpassword = request.body.oldpassword;
    let newPassword = request.body.newPassword;
    let currentUser = request.session.name;
    let sqlStr = `select * from user where admin_name = '${currentUser}'`;
    conn.query(sqlStr, (error, result, field) => {
        if (!error) {
            let currentUserId = result[0].id;
            let oldpassword_salt = result[0].admin_salt;
            let oldpassword_database = result[0].admin_password;
            if (oldpassword_database == md5tool.getMd5(oldpassword, oldpassword_salt)) {
                let newsalt = randomtool.getRandomNumber();
                let newMd5newPassword = md5tool.getMd5(newPassword, newsalt);
                let sqlStr2 = `update user set admin_password= '${newMd5newPassword}' , admin_salt= ${newsalt} where id = ${currentUserId}`;
                conn.query(sqlStr2, (error, result, field) => {
                    if (!error) {
                        request.session.destroy();
                        response.send("<script>alert('修改成功 重新登录！'); top.location.href = '/login';</script>")
                    }
                })
            } else {
                response.send("<script>alert('原密码错误！请核对'); history.back();</script>");
            }
        }
    })
});

//文件存储引擎
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/');
    },
    filename: function (req, file, cb) {
        let extName = path.extname(file.originalname);  //获取后缀名
        let baseName = path.parse(file.originalname).name;  //获取文件名
        let random = randomtool.getRandomNumber();
        cb(null, baseName + '_' + md5tool.getMd5(baseName, random) + extName);
    }
})
const upload = multer({ storage: storage });

const storage_temp = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images_temp/');
    },
    filename: function (req, file, cb) {
        let extName = path.extname(file.originalname);  //获取后缀名
        let baseName = path.parse(file.originalname).name;  //获取文件名
        let random = randomtool.getRandomNumber();
        cb(null, baseName + '_' + md5tool.getMd5(baseName, random) + extName);
    }
})
const upload_temp = multer({ storage: storage_temp });


//渲染添加用户界面
indexRouter.get('/adduser.html', (request, response) => {
    response.render("adduser", { title: "添加新用户" });
});

//预览头像
indexRouter.post('/preview', upload_temp.single('usericon'), (request, response) => {
    response.end(request.file.filename);
});

//处理添加
indexRouter.post('/adduser', upload.single('usericon'), (request, response) => {
    //    console.log(request);
    let newName = request.body.username;
    let newPassword = request.body.password;
    let newRole = request.body.role;
    let newsalt = randomtool.getRandomNumber();
    let newPasswordMd5 = md5tool.getMd5(newPassword, newsalt);
    let iconSrc = '/images/' + request.file.filename;
    let sqlStr = `insert into user (admin_name , admin_password , admin_salt , admin_role , admin_icon , create_time) values ('${newName}',
     '${newPasswordMd5}' , '${newsalt}' , '${newRole}' , '${iconSrc}' , now())`;
    conn.query(sqlStr, (error, result) => {
        if (!error) {
            response.send("<script>alert('添加工具人成功');location.href = '/index/userlist.html';</script>");
        } else {
            console.log(error);
        }
    })
});



//渲染用户列表
indexRouter.get('/userlist.html', (request, response) => {
    let sqlStr = "select * from user";
    conn.query(sqlStr, (error, result, field) => {
        if (!error) {
            response.render("userlist", {
                title: "用户列表",
                list: result,
                user: request.session.name,
                role: request.session.role
            });
        }
    })
})

//渲染编辑页面
indexRouter.get('/editInfo.html', (request, response) => {
    let sqlStr = `select * from user where id = ${request.query.id}`;
    conn.query(sqlStr, (error, result) => {
        response.render('editInfo', {
            title: '修改用户信息',
            datalist: result,
        });
    })

});

//保存编辑页
indexRouter.post('/edituser', upload.single('usericon'), (request, response) => {
    let id = request.body.id;
    let newName = request.body.username;
    let newRole = request.body.role;
    let iconSrc = request.file ? '/images/' + request.file.filename : request.body.oldicon;
    //    let iconSrc = '/images/' + request.file.filename;
    let sqlStr = `update user set admin_name = '${newName}' , admin_role = '${newRole}' , admin_icon = '${iconSrc}' where id = ${id}`;
    conn.query(sqlStr, (error, result) => {
        if (!error) {
            response.send("<script>alert('修改工具人信息成功');location.href = '/index/userlist.html';</script>")
        } else {
            console.log(error);
        }
    })
});


//删除用户
indexRouter.get('/deleteInfo', (request, response) => {
    let currentId = request.query.id;
    let sqlStr = `delete from user where id = ${currentId}`;
    conn.query(sqlStr, (error, result, field) => {
        if (!error) {
            response.send("<script>alert('删除数据成功');location.href = '/index/userlist.html';</script>")
        } else {
            console.log(error);
        }
    })
})


//注销
indexRouter.get('/del', (request, response) => {
    request.session.destroy();
    response.send("<script>alert('注销登录成功!');location.href = '/login';</script>")
});

module.exports = indexRouter;