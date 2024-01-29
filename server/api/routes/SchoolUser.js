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
    bcrypt.hash(password, 10).then(hash => {
        JZSUserModel.create({ userId, userName, email, password: hash, role })
            .then(user => res.json({ status: "OK" }))
            .catch(err => res.json(err))
    }).catch(err => res.json(err));
});

module.exports = router;
