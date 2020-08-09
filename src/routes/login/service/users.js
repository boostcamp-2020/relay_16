const express = require('express');
const router = express.Router();
const db = require('../../../sequelize/models/index');
//const db = require('../../module/pool.js');
//access token 검증 후 사용자 목록 불러오기  
router.get('/', async (req, res,next) => {
    try{
        db.user.findOne({where : {id: res.user_id}})
        .then( user =>{
           res.status(200).json({nickname : user.nickname});
        })
        .catch(err => {
            res.status(400).send(err);
        })
    }catch(err){
        next(err);
    }
});
module.exports = router;