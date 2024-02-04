const jwt = require("jsonwebtoken");
const { errorHandler } = require("./error");
require("dotenv").config();

exports.verifyToken = (req,res,next)=>{
    const authHeader = req.headers['authorization'];
    const token = (authHeader && authHeader.split(' ')[1]) ||req.cookies.access_token;
    if(token===null) return next(errorHandler(401,"Cookies not found"));

    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err){
            return next(errorHandler(401,"Unauthorized"));
        }
        req.user=user;
        next();
    });
};

  