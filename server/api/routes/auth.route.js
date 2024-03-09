const express = require("express");
const { signup, signin, google, test, signoutUser } = require("../controllers/auth.controller");

const router = express.Router();

router.get("/", test);

// router.post("/signup", signup);
router.post("/signin", signin);
// router.post("/google",google);
router.get("/signout",signoutUser);

module.exports = router;
