function chk() { 
    return function(req ,res ,next){
        if(!req.session.views){
            res.send("<script>alert('你没有权限这么做 请在首页登录嘻嘻嘻!');location.href = '/index';</script>");
            return ;
        }
        next();
    }
 }
 module.exports = chk;