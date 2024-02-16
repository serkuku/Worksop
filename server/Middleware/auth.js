const jwt = require('jsonwebtoken')
exports.auth = async (req,res,next) =>{
    try{
        const token = req.headers["authtoken"]
        if(!token){
            return res.send('No token').status(401)
        }
        const decoded = jwt.verify(token,'jwtsecret',)
        req.user = decoded.user
        console.log(decoded);
        next()
    }catch(err){
        console.log(err);
        res.send('Token invalid').status(500)
    }
}