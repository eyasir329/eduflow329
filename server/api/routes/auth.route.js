const express = require("express");
const { signup, signin, google, signoutUser } = require("../controllers/auth.controller");

const router = express.Router();


router.post("/signup", signup);
router.post("/signin", signin);
// router.post("/google",google);
router.get("/signout",signoutUser);

module.exports = router;
