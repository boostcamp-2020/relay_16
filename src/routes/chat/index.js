const express = require('express');
const router = express.Router();
// /* Node.js 기본 내장 모듈 불러오기 */
 const fs = require('fs')

router.get('/', function(req,res){
    res.render('chat.html');
    // fs.readFile('/Users/yeeun/github/relay_16/front/chatTest.ejs', function(err, data) {
    //     if(err) {
    //         res.send(err);
    //     } else {
    //         console.log('실행..?');
    //         res.writeHead(200, {'Content-Type':'text/html'})
    //         res.write(data)
    //         res.end()
    //     }
    // })
});
module.exports = router;