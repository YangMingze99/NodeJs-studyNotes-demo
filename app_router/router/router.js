const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require('path');

// const upload = multer({dest: 'upload'});
let app = express.Router();

//bodyParser 配套使用
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.render('index');
});


//磁盘存储引擎 (DiskStorage)   磁盘存储引擎可以让你控制文件的存储。
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/');
    },
    filename: function (req, file, cb) {
        let extName = path.extname(file.originalname);  //获取后缀名
        let baseName = path.parse(file.originalname).name;  //获取文件名
        cb(null, baseName+'_'+req.body.usename+'_'+req.body.password+extName);
    }
})


const storage_temp = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload_temp/');
    },
    filename: function (req, file, cb) {
        let extName = path.extname(file.originalname);  //获取后缀名
        let baseName = path.parse(file.originalname).name;  //获取文件名
        cb(null, baseName+'_'+Date.now()+extName);
    }
})


const upload = multer({ storage: storage })
const upload_temp = multer({ storage: storage_temp })

app.post('/preview',upload_temp.single('file'),function (require,response) { 

    response.end(require.file.path);
})
app.post('/test',(req,res)=>{
    res.end("kandaole");
})

app.post('/postData', upload.single('file'), function (require, response) {
    
     console.log(require.body);
    // console.log(require.file); 
    //console.log(require.file.path);  //文件上传后保存的路径位置
    //response.render("show",{srcPath:require.file.path});渲染图片到show.html
    response.end("<script>alert('添加成功')</script>")
})
module.exports = app;