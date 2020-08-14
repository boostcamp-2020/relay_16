
require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();

app.use(express.json({
    limit : "50mb"
}));
app.use(express.urlencoded({ limit : "50mb", extended: false }));
app.use(cookieParser());

require('./routes')(app)

//rendering
app.set("view engine","ejs")
app.set("views","../front")
app.engine('html', require('ejs').renderFile);

app.use(express.static('../front'));

app.get('/',function(req,res){
    res.render('login.html')
})

// app.get('/register', function(req, res){
//     res.render('register.html')
// })

// 채팅서버 작업부분
app.use('/css', express.static('../front/css'))
app.use('/js', express.static('../front/js'))
const chat = require('./routes/chat/index');
app.use('/chat', chat);

/* Node.js 기본 내장 모듈 불러오기 */
const http = require('http')
var server = http.createServer(app);

var io = require('socket.io')(server);  // 8080포트에 소켓 연동
server.listen(8080, function() {
    console.log('서버 실행 중..')
})

require('./modules/socketConnection')(io);

module.exports = app;
