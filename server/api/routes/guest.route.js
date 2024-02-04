const express = require("express");
const { test, updateGuestUser, deleteGuestUser } = require("../controllers/user.controller.js");
const { verifyToken } = require("../utils/verifyUser.js");

const router = express.Router();

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

router.get("/", test);
router.post("/update/:id", verifyToken, updateGuestUser);
router.get("/update/:id", verifyToken, test1);
router.delete("/delete/:id", verifyToken, deleteGuestUser);



module.exports = router;
