const jwt = require('jsonwebtoken');

const createToken = (id) =>{
    return jwt.sign({user_id: id},'secret_key',{expiresIn: 1});
}

const verifyToken =  (req, res,next) =>  {
    try{
        const accessToken = req.cookies.user;
        const decoded = jwt.verify(accessToken,'secret_key');

        if(decoded){
            res.locals.user_id = decoded.user_id;
            next();
        }else{
            res.status(401).json({error: "error"});
        }
    }catch(err){
        res.status(401).json({error: "error"});
    }
};


module.exports = {
    verifyToken: verifyToken,
    createToken: createToken
}