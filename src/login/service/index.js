var express = require('express');
var router = express.Router();

//로그인
const signin = require('./signin');
router.use('/signin',signin);

//토큰 검증
const verifyToken = require('./verifyToken');
router.use('/verifyToken', verifyToken);

//사용자 정보 가져오기
const userInfo = require('./userInfo');
router.use('/userInfo', userInfo);

module.exports = router;