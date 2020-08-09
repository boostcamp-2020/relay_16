const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    console.log('채팅 라우터 ');
    res.render('chat.html');
});
module.exports = router;