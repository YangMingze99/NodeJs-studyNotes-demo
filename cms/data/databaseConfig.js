const mysql = require("mysql");

let conn = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'root',
    database:'taeyeon',
    timezone:"SYSTEM"
})

conn.connect((err)=>{
    if(err){
        console.log(err);
    }
})

module.exports = conn;