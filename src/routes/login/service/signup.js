const express = require('express');
const router = express.Router();
const ocr = require('../../../vision/ocr');
const db = require('../../../sequelize/models/index');

router.post('/', async (req, res) => {
    try {
        
        let { userid, nickname, password, mbti, movie, music, location, is_mint, is_boumeok, is_earlybird, like_drink, schoolname, image } = req.body;
        if (!userid || !mbti || !movie || !music || !location || !is_mint || !is_boumeok || !is_earlybird || !like_drink || !schoolname || !image) throw Error();

        ocr.getTextFromImageData(image)
        .then((result) => {
            const allText = result.images[0].fields.reduce((acc, cur) => {
                return acc + cur.inferText;
            }, "");

            // 데모데이를 위한 주석 처리
            // if (!allText.contain(schoolname)) throw new Error("IMAGE not contains school name");

        }).then(
            db.user.create({
                id : userid,
                nickname : nickname,
                password : password,
            })
        ).then(
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
        ).then(user => {
            res.sendStatus(200);
            res.end();
        });
    } catch (err) {
        res.status(400).json(null);
    }
});

module.exports = router;