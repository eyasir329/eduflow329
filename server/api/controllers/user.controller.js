const bcrypt = require("bcrypt");
const { errorHandler } = require("../utils/error.js");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");

exports.test = (req, res) => {
    res.json({
        message: "API is working"
    });
};

exports.updateGuestUser = async (req,res,next)=>{
    console.log(req.cookie);
    if(req.user.id!=req.params.id){
        return next(errorHandler(401,"You can update only your account"));
    }
    try {
        if(req.body.password){
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        const updatedGuestUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set:{
                    userName:req.body.userName,
                    email:req.body.email,
                    password:req.body.password,
                    profilePicture:req.body.profilePicture
                },
            },
            {new:true}
        );
        const {password,...rest} = updatedGuestUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}