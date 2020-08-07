const express = require('express');
const router = express.Router();
const verify = require('../../controller/verify');

//토큰 검증 - access token 
router.get('/', async (req, res) => {
    let access_token = req.headers['authorization'];
    let result = await verify.token_verify(access_token)
    .catch((err) => {
        res.status(500).send(err);
    });
    res.send(result);
});

// 토큰 검증 - access token & refresh token 
router.post('/', async (req, res) => {
    let access_token = req.headers['authorization'];
    let refresh_token = req.body.refresh_token;

    try{
        let result = await verify.token_verify(access_token);
        // access token 유효한 경우 
        if(result.state === 'success') res.status(200).send(result);
        // access token 만료된 경우 
        else if (result.state === 'fail' && result.message === 'jwt expired') {
            // 만료된 토큰 유효성 검사 
            let payload_result = await verify.token_verify(access_token, {ignoreExpiration: true});
            // 로그아웃 된 사용자거나 유효하지 않은 경우 
            if(payload_result.state === 'fail') res.status(401).send(payload_result);
            else {
                let refresh_result = await verify.refreshToken_verify(payload_result.user_id, refresh_token);
                res.status(200).send(refresh_result);
            }
        } else { // 잘못된 access token 값
            console.log('잘못된 access 토큰 값');
            res.status(401).send(result);
        }
    } catch(err) {
        console.log(err);
        res.status(500).send(err);
    };
    
});
module.exports = router;