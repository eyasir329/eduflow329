const express = require("express");
const { schoolCreateOrUpdate, schoolView } = require("../controllers/admin.controller");

const router = express.Router();

router.post("/schoolCreateOrUpdate", schoolCreateOrUpdate);
router.get("/schoolView", schoolView);

module.exports = router;
