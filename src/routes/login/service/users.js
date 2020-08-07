const express = require('express');
const { NotExtended } = require('http-errors');
const router = express.Router();

//const db = require('../../module/pool.js');


//access token 검증 후 사용자 목록 불러오기  
router.get('/', async (req, res,next) => {
    try{
        const user = {"user_id" : res.locals.user_id};
        res.json(user);
    }catch(err){
        next(err);
    }
});
module.exports = router;