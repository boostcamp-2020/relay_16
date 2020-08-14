const express = require('express');
const router = express.Router();
//const crypto = require('crypto-promise');
const db = require('../../../sequelize/models/index');


router.post('/', async (req, res, next) => {
    try {
        let { 키값 } = req.body;
        if (!user_id || !user_pwd || '키값') throw Error();

        //todo OCR로 전송 후 값 일치 확인
        
        db.user.create({id: user_id})
        .then( user =>{
            res.send(user)
        })
        .catch( err => {
            console.log("ERR = " + err)
            res.sendStatus(500)
        })

    } catch (err) {
        res.status(400).json(null);
    }
});

module.exports = router;