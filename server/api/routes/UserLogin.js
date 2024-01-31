const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JZSUserModel = require("../../models/User");

const router = express.Router();
require("dotenv").config();

router.get("/", (req, res) => {
    res.json({
        message: "Login API is working",
    });
});

router.post("/", async (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body;
    try {
        const validUser = await JZSUserModel.findOne({ email: email });
        if (!validUser) {
            res.status(500).json({ status: "wrong", message: "User Not Found" });
        } else {
            const isMatch = await bcrypt.compare(password, validUser.password);
            if (isMatch) {
                const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
                const { password: hashedPassword, ...rest } = validUser._doc;
                const expiryDate = new Date(Date.now() + 3600000);//1 hr ... second
                res.cookie("access_token", token, { httpOnly: true, expires: expiryDate }).status(200).json(rest);
            } else {
                res.status(500).json({ status: "wrong", message: "Password Not Match" });
            }

        }
    } catch {
        res.status(500).json({ status: "wrong", message: "Something Wrong" });
    }

});

module.exports = router;
