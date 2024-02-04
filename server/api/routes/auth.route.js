const express = require("express");
const { signup, signin, google, test, signoutGuestUser } = require("../controllers/auth.controller");

const router = express.Router();

router.get("/", test);

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google",google);
router.get("/signout",signoutGuestUser);

module.exports = router;
