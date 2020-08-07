const jwt = require('../modules/login/jwt');
const jwtDB = require('../modules/login/jwtDB');

// 토큰 유효성 검증 
module.exports = {
    token_verify: (...args) => {
        const verify = jwt.verify(args[0], args[1]);
        return {state: 'success',
                message: 'Token verified !',
                user_id: verify.user_id}
    }
}