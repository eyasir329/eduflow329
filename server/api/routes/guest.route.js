const express = require("express");
const { test, updateGuestUser } = require("../controllers/user.controller.js");
const { verifyToken } = require("../utils/verifyUser.js");

const router = express.Router();

router.get("/", test);
router.post("/update/:id", verifyToken, updateGuestUser);

const test1 = (req, res) => {
    const text = req.user;
    res.json({
        text:text
    });
};
router.get("/update/:id", test1);

module.exports = router;
