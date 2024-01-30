const express = require("express");
const bcrypt = require("bcrypt");
const JZSUserModel = require("../../models/User");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "API is working",
    });
});

router.post("/", async (req, res) => {
    // console.log(req.body);
    const {email, password} = req.body;
    try{
        const validUser = await JZSUserModel.findOne({email:email});
        if(!validUser){
            res.status(500).json({status:"wrong",message:"User Not Found"});
        }else{
            const isMatch = await bcrypt.compare(password, validUser.password);
            if(isMatch){
                res.status(200).json({status:"found",message:"User match",validUser});
            }else{
                res.status(500).json({status:"wrong",message:"Password Not Match"});
            }
            
        }
    }catch{
        res.status(500).json({status:"wrong",message:"Something Wrong"});
    }

});

module.exports = router;
