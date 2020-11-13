//跨域

function cors() { 
    return function (req,res,next) { 
        res.setHeader("Access-Control-Allow-Origin",'*');
        next();
     } 
 }

module.exports = cors;