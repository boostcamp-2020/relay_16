const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    console.log('채팅 라우터 ');
    res.render('chat.html');
});
module.exports = router;


// const {Router} = require('express');

// const router = Router();
// const service = require('./service/index');

// router.get('/chat',service);

// module.exports = router;