function chksession() {
    return function (requset, response, next) {
        if (requset.url == '/login' || requset.url == '/loginchk') {
            next();
        } else {
            if (!requset.session.name) {
                return response.send("<script>alert('请先登录！'); top.location.href = '/login';</script>");
            }
        }
        next();
    }
}
module.exports = chksession;