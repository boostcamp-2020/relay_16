const jwt = require('jsonwebtoken');

const createToken = (id) =>{
    return jwt.sign({user_id: id},'secret_key',{expiresIn: '1h'});
}

const verifyToken =  (req, res,next) =>  {
    try{
        const accessToken = req.cookies.user;
        //const accessToken = req.headers.authorization;
        const decoded = jwt.verify(accessToken,'secret_key');
        if(decoded){
            res.user_id = decoded.user_id;
            next();
        }else{
            res.status(401).json("만료");
        }
    }catch(err){
        res.status(401).json(err);
    }
};


module.exports = {
    verifyToken: verifyToken,
    createToken: createToken
}