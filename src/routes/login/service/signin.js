const express = require('express');
const router = express.Router();
//const crypto = require('crypto-promise');
const createToken = require('../../../middlewares/token').createToken;


router.post('/', async (req, res, next) => {
    try {
        let { user_id, user_pwd } = req.body;
        if (!user_id || !user_pwd) throw Error();

        let checkQuery = 'SELECT * FROM user WHERE user_id = ?';
        let checkResult = [{user_id : "1235"}]//= await db.queryParam_Arr(checkQuery, [user_id]);
        if (checkResult.length != 1) {
            res.status(400).send("Login Faild");
        } else if (checkResult.length == 1) {
            const accessToken = createToken(checkResult[0].user_id);
            res.cookie('user', accessToken);
            res.status(201).json({
                result: 'ok',
                accessToken
            });
        }

    } catch (err) {
        console.log(err);
        next(err);
    }
});

module.exports = router;