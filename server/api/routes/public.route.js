const express = require("express");
const { schoolView, viewNotice, viewPrincipal } = require("../controllers/admin.controller");


const router = express.Router();

// view school info
router.get("/viewSchool", schoolView);
router.get("/viewNotices", viewNotice);
router.get("/viewPrincipal", viewPrincipal);



module.exports = router;
