const express = require("express");
const conn = require("../data/databaseConfig.js");
const md5tool = require("../tools/md5.js");
const randomtool = require("../tools/random_number.js");
const checkLogin = require("../middleware/chkSession.js");
const multer = require("multer");
const path = require("path");
const { render } = require("art-template");
const { response } = require("express");
const { request } = require("http");
const { count } = require("console");

let newsRouter = express.Router();
newsRouter.use(checkLogin());

newsRouter.get('/addnews.html', (request, response) => {
    let sql = `select * from types`;
    conn.query(sql, (error, result) => {
        response.render("addnews", {
            typelist: result
        });
    })

});

newsRouter.post('/saveaddnews', (request, response) => {
    console.log(request.body);
    let title = request.body.title;
    let author = request.body.author;
    let keyword = request.body.keyword;
    let newstype = request.body.newstype;
    let content = request.body.editorValue;

    let sqlStr = `insert into new ( title , author , keyword , tid , content , create_time ) values ('${title}' , '${author}' , '${keyword}' , '${newstype}' , '${content}' , now())`;
    conn.query(sqlStr, (error, result) => {
        if (!error) {
            response.send("<script>alert('添加成功！');location.href = '/news/addnews.html';</script>")
        }
    })
})

newsRouter.get('/newslist.html/:page', (request, response) => {
    var page = request.params.page;    //当前在第几页
    let num = 2;    //每页条数
    var total;  //总数据数 
    var page_views = '';

    let str = `select * from new left join types on new.tid = types.tid limit ${(page - 1) * num} ,${num}`;
    let sqlStr_page = `select count(id) from new`;
    conn.query(sqlStr_page, (error, result) => {
        total = result[0]['count(id)'];
    })
    conn.query(str, (error, result) => {
        let pages = Math.ceil(total / num);         //总页数
        for (var i = 1; i <= pages; i++) {
            if (i == page) {
                page_views += `<li class='page-item active'><a class='page-link ' aria-current='page' href='/news/newslist.html/${i}'>${i}<span class="sr-only">(current)</span></a></li>`
            } else {
                page_views += `<li class='page-item'><a class='page-link' href='/news/newslist.html/${i}'>${i}</a></li>`
            }
        }
        response.type('html');
        response.render('newslist', {
            totalPage : pages,
            page_views: page_views,
            newslist: result,
            page: page
        })
    })
})

newsRouter.get('/editnews.html/:id', (request, response) => {
    //    console.log(request.params);
    let current_id = request.params.id;
    let sqlStr = `select * from new where id = ` + current_id;
    let sqlStr_type = `select * from types`;
    conn.query(sqlStr, (error, result) => {
        conn.query(sqlStr_type, (error_type, result_type) => {
            response.render("editnews", {
                typelist: result_type,
                news: result
            })
        })
    })
})

newsRouter.post('/saveeditnews', (request, response) => {
    let id = request.body.id;
    let title = request.body.title;
    let author = request.body.author;
    let keyword = request.body.keyword;
    let time = request.body.time;
    let count = request.body.count;
    let top = request.body.top;
    let newstype = request.body.newstype;
    let content = request.body.editorValue;
    let sqlStr_update = `update new set title = '${title}' , author = '${author}' , keyword = '${keyword}' , count = ${count} , top = ${top} , tid = ${newstype} , content = '${content}' , create_time = '${time}' where id = ${id}`;
    conn.query(sqlStr_update, (error, result) => {
        if (!error) {
            response.send("<script>alert('修改成功！'); location.href = '/news/newslist.html'</script>")
        }
    })
})



module.exports = newsRouter;