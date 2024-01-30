const express = require("express");
const bcrypt = require("bcrypt");
const JZSUserModel = require("../../models/User.js");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({
        message: "API is working",
    });
});

router.post("/", (req, res) => {
    console.log(req.body);
    const { userId, userName, email, password, role } = req.body;
    bcrypt.hash(password, 10).then(async hash => {
        const newUser = new JZSUserModel({userId, userName, email, password: hash, role});
        try{
            await newUser.save();
            res.status(200).json({ status:"ok" ,message: "Account Created Successfully"});
        }catch{
            res.status(500).json({ status:"wrong" ,message: "Failed to Create a Account"});
        }
    }).catch(err => res.json(err));
});

module.exports = router;
