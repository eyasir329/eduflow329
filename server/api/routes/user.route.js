const express = require("express");
const { test, updateUser, deleteUser, userUpdate, userUpdateProfile, viewUserStatus } = require("../controllers/user.controller.js");
const { verifyToken } = require("../utils/verifyUser.js");

const router = express.Router();


//for signin user
router.post("/update/:id", verifyToken, updateUser);
router.get("/viewUserStatus", viewUserStatus);
// router.delete("/delete/:id", verifyToken, deleteUser);

// for Database profile
router.post("/userProfileUpdate/:role", userUpdateProfile);



module.exports = router;
