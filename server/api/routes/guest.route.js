const express = require("express");
const { test, updateGuestUser } = require("../controllers/user.controller.js");
const { verifyToken } = require("../utils/verifyUser.js");

const router = express.Router();

router.get("/", test);
router.post("/update/:id", verifyToken, updateGuestUser);

const test1 = (req, res) => {
    const user = req.user;
    if (user.id === req.params.id) {
        res.json({
            user
        });
    } else {
        res.json({
            message: "You are not authorized"
        });
    }
};

router.get("/update/:id", verifyToken, test1);



module.exports = router;
