var express = require("express");
var bodyparser = require("body-parser");
var mysql = require("mysql");
require("dotenv").config();
var app = express();
var util = require("util");

var conn = mysql.createConnection({
    "host":"bv5kfldoyavydgakbbjn-mysql.services.clever-cloud.com",
    "user":"uowopmjd4i4qqchg",
    "password":"fxzvGoGz59wQfieUywtJ",
    "database":"A2Z_SOFTWARE",
    "port":"3306"
});

var exe = util.promisify(conn.query).bind(conn);

app.use(bodyparser.urlencoded({extended:true}));

app.use(express.static("public/"));

app.get("/", async function(req,res){
    var data1 = await exe(`SELECT * FROM student`);
    var data3 = await exe(`SELECT * FROM language`);
    var data5 = await exe(`SELECT * FROM batch`);
    var obj = {"students":data1,"languages":data3,"batches":data5};
    res.render("home.ejs",obj);
});

app.get("/students",async function(req,res){
    var data = await exe(`SELECT * FROM student`);
    var obj = {"students":data};
    res.render("students.ejs",obj);
});

app.get("/languages",async function(req,res){
    var data2 = await exe(`SELECT * FROM language`);
    var obj = {"languages":data2};
    res.render("languages.ejs",obj);
});

app.get("/batches",async function(req,res){
    var data4 = await exe(`SELECT * FROM batch`);
    var obj = {"batches":data4};
    res.render("batches.ejs",obj);
});

app.post("/save_student", async function(req,res){
    var d = req.body;
    var sql = `INSERT INTO student(student_name,student_mobile,student_address) VALUES ('${d.student_name}','${d.student_mobile}','${d.student_address}')`;
    var data = await exe(sql);
    // res.send(data);
    res.redirect("/students");
});

app.post("/save_language", async function(req,res){
    var d = req.body;
    var sql = `INSERT INTO language(language_name,language_duration) VALUES ('${d.language_name}','${d.language_duration}')`;
    var data = await exe(sql);
    // res.send(data);
    res.redirect("/languages");
});

app.post("/save_batch", async function(req,res){
    var d = req.body;
    var sql = `INSERT INTO batch(batch_no,batch_time,batch_mode,batch_start_date) VALUES ('${d.batch_no}','${d.batch_time}','${d.batch_mode}','${d.batch_start_date}')`;
    var data = await exe(sql);
    // res.send(data);
    res.redirect("/batches");
});

app.listen(process.env.PORT || 1000);