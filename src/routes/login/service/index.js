var express = require('express');
var router = express.Router();

//로그인
const signin = require('./signin');
router.use('/signin',signin);

//토큰 검증
const getUser = require('./users');
const verifyToken = require('../../../middlewares/token').verifyToken;
router.use('/getUser', verifyToken,getUser);

//사용자 정보 가져오기
//const users = require('./users');
//router.use('/users', users);

module.exports = router;