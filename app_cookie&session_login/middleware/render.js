function myRender(app,url){
    return function (req ,res , next) { 
        app.get(url,(req ,res)=>{
            cookiename = req.session.userInfo.name ? req.session.userInfo.name : '';                  //session请求
 //           cookiename = req.cookies.name ? req.cookies.name : '';
            res.render(url.substr(1), { name: cookiename });
        })
        next();
     }
}
module.exports = myRender;

// routerIndex.get('/one', function (request, response) {
//     //   response.render('render',{name : request.cookies.name});
//     cookiename = request.cookies.name ? request.cookies.name : '';
//     response.render('one', { name: cookiename });
// });
// routerIndex.get('/two', function (request, response) {
//     //   response.render('render',{name : request.cookies.name});
//     cookiename = request.cookies.name ? request.cookies.name : '';
//     response.render('two', { name: cookiename });
// });
// routerIndex.get('/three', function (request, response) {
//     //   response.render('render',{name : request.cookies.name});
//     cookiename = request.cookies.name ? request.cookies.name : '';
//     response.render('three', { name: cookiename });
// });
// routerIndex.get('/four', function (request, response) {
//     //   response.render('render',{name : request.cookies.name});
//     cookiename = request.cookies.name ? request.cookies.name : '';
//     response.render('four', { name: cookiename });
// });