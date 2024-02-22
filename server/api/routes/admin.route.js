const express = require("express");
const { schoolCreateOrUpdate, schoolView, createTeacher, lastTeacherId } = require("../controllers/admin.controller");

const router = express.Router();

router.post("/schoolCreateOrUpdate", schoolCreateOrUpdate);
router.get("/schoolView", schoolView);
router.get("/lastTeacherId", lastTeacherId);
router.post("/createTeacher", createTeacher);

module.exports = router;
