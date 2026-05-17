const jwt = require('jsonwebtoken')

async function  authuser(req, res, next){
     const token = req.cookies.token
    
        if(!token){
            return res.status(401).json({
                message:"unauthorised"
            })
        }
        try{
                jwt.verify(token,process.env.JWT_SECRET)
            
                next()
        }
        catch(error){
          return res.status(401).json({
            message:error.message
          })
        }
    
}

module.exports = authuser