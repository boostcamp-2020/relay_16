const express = require('express');
const router = express.Router();
const crypto = require('crypto-promise');

router.post('/', async (req, res) => {
    let {user_id, user_pwd} = req.body;

    if (!user_id || !user_pwd) {
        console.log("NULL");
        res.status(200).send( {
            message : "Null Value"
        })
    } else {
        let checkQuery = 'SELECT * FROM user WHERE user_id = ?';
        let checkResult = await db.queryParam_Arr(checkQuery, [user_id])

        console.log(checkResult);
        if(!checkResult) {
            res.status(500).send({
                message : "Internal Server Error"
            })
        }
        // id 틀렸을 때
        else if(checkResult.length != 1) {
            console.log("id error");
            res.status(200).send({
                message : "Login Failed : Id error"
            });
        }
        else if (checkResult.length == 1) {     
            let pwHashed = await crypto.pbkdf2(user_pwd, checkResult[0].user_salt, 10000, 32, 'sha512');
            //사용자 아이디 비밀번호 일치할 경우 
            if (pwHashed.toString('base64') == checkResult[0].user_pwd) {
                // 발행할 토큰 생성
                let access_token = jwt.sign(checkResult[0].user_id);
                const key = await crypto.randomBytes(32);
                let refresh_token = jwt.refresh(key);
                console.log(access_token);
                console.log(refresh_token);

                //redis에 유저 refresh token 저장 및 로그아웃 db에서 사용자 삭제 
                try{
                    await redis.set(checkResult[0].user_id, refresh_token, 2, 60*5);
                    await redis.del(checkResult[0].user_id, 3);

                    res.status(201).send( {
                        message : "Login Success",
                        data : {
                            'access_token' : access_token,
                            'refresh_token' : refresh_token,
                            'admin' : checkResult[0].admin
                        }
                    });
                } catch(err) {
                    res.status(500).send({
                        message : err
                    })
                }
                
            } else { // 비밀번호 틀렸을 때
                console.log("pwd error");	
                res.status(200).send({
                    message : "Login Failed : pw error"
                });
            }
        } 
    }
});

module.exports = router;