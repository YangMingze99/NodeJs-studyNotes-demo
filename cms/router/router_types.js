const { request, response } = require("express");
const express = require("express");
const conn = require("../data/databaseConfig.js");
const md5tool = require("../tools/md5.js");
const randomtool = require("../tools/random_number.js");
const checkLogin = require("../middleware/chkSession.js");
const multer = require("multer");
const path = require("path");
const { render } = require("art-template");

let typeRouter = express.Router();
typeRouter.use(checkLogin());

//递归查询
function getTree(data , pid){
    let result = [];
    if(data && typeof data == "object"){
        for(var index in data){
 //           console.log(data[index]);
            if(data[index].parent_id == pid){
                result.push(data[index]);
                result = result.concat(getTree(data , data[index].tid));
            }
        }
    }
    return result;
}

typeRouter.get('/typelist.html', (request, response) => {
    let sqlStr = `select * from types`;
    conn.query(sqlStr,(error , result)=>{
        let list_data = getTree(result,0);
        response.render("typelist",{
            list:list_data
        })
    })
});



module.exports = typeRouter;