const jwt = require('jsonwebtoken')

async function  authOrganizer(req, res, next){
     const token = req.cookies.token
    
        if(!token){
            return res.status(401).json({
                message:"unauthorised"
            })
        }
        try{
                const decoded = jwt.verify(token,process.env.JWT_SECRET)
                
                if(decoded.role !== "organizer"){
                    return res.status(403).json({
                        message:"you do not have the access"
                    })
                }
                req.user = decoded
                next()
        }
        catch(error){
          return res.status(401).json({
            message:error.message
          })
        }
    
}

async function authBusiness(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        if (decoded.role !== "business") {
            return res.status(403).json({
                message: "Only businesses can access this"
            });
        }

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: error.message
        });
    }
}


module.exports = {authOrganizer,authBusiness}