const express = require("express");
const checkAccess = require("../middleware/chk.js");
const myRender = require("../middleware/render.js");

let routerIndex = express.Router();
let cookiename = '';
routerIndex.get('/', (request, response) => {
 //   console.log(request.session);
 //   console.log(request.session.userInfo);
   cookiename = request.session.views ? request.session.userInfo.name : '';  //session方式
//    cookiename = request.cookies.name ? request.cookies.name : '';
    response.render('index', { name: cookiename });
});
routerIndex.use(checkAccess());
routerIndex.use(myRender(routerIndex,'/one'));
routerIndex.use(myRender(routerIndex,'/two'));
routerIndex.use(myRender(routerIndex,'/three'));
routerIndex.use(myRender(routerIndex,'/four'));
module.exports = routerIndex;