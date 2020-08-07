
require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

require('./routes')(app)
app.set("view engine","ejs")
app.set("views","../front")
app.engine('html', require('ejs').renderFile);

app.use(express.static('../front'));

app.get('/',function(req,res){
    res.render('login.html')
})
app.get('/chat.html',function(req,res){
    res.render('chat.html')
})
module.exports = app;
