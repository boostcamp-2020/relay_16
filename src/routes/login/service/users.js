const express = require('express');
const router = express.Router();

const db = require('../../module/pool.js');
const verify = require('../../controller/verify');

//access token 검증 후 사용자 목록 불러오기  
router.get('/', async (req, res) => {
    let access_token = req.headers['authorization'];
    console.log('Get 사용자 정보 위한 검증 ' + verify);

    let result = await verify.token_verify(access_token)
    .catch((err) => {
        res.status(500).send(err);
    });
    
    if(result.state === 'fail') res.send(result);
    else {
        let checkQuery = 'SELECT * FROM user WHERE user_id = ?';
        let checkResult = await db.queryParam_Arr(checkQuery, [result.user_id])
        .catch((err) => {
            res.send( {
                state: 'fail',
                message : "Internal Server Error"
            });
        })
        res.status(200).send({
            state: 'success',
            message: {
                user_id: checkResult[0].user_id,
                user_name: checkResult[0].user_name
            }
        });
    }
});
module.exports = router;