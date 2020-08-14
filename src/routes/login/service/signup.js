const express = require('express');
const router = express.Router();
//const crypto = require('crypto-promise');
const db = require('../../../sequelize/models/index');
//const { password } = require('../../../sequelize/config');


router.post('/', async (req, res, next) => {
    try {
        
        let { userid, nickname, password, mbti, movie, music, location, is_mint, is_boumeok, is_earlybird, like_drink } = req.body;
        console.log("this is signup.js", req)
        if (!userid || !mbti || !movie || !music || !location || !is_mint || !is_boumeok || !is_earlybird || !like_drink) throw Error();

        //todo OCR로 전송 후 값 일치 확인

        db.user.create({
            id : userid,
            nickname : nickname,
            password : password,
        })
        .then( user =>{
            res.send(user)
        })
        .catch( err => {
            console.log("usersERR = " + err)
            res.sendStatus(500)
        })

        db.userservey.create({
            userid : userid,
            mbti : mbti,
            movie : movie,
            music : music, 
            location : location, 
            is_mint : is_mint,
            is_boumeok : is_boumeok,
            is_earlybird : is_earlybird,
            like_drink : like_drink
        })
        .then( user =>{
            res.send(user)
        })
        .catch( err => {
            console.log("usersurveyERR = " + err)
            res.sendStatus(500)
        })

    } catch (err) {
        res.status(400).json(null);
    }
});

module.exports = router;