const express = require("express");
const { schoolCreateOrUpdate, schoolView, createTeacher, lastTeacherId, viewTeacher, updateTeacher, deleteTeacher } = require("../controllers/admin.controller");

const router = express.Router();

router.post("/schoolCreateOrUpdate", schoolCreateOrUpdate);
router.get("/schoolView", schoolView);
router.get("/lastTeacherId", lastTeacherId);
router.post("/createTeacher", createTeacher);
router.get("/viewTeacher", viewTeacher);
router.post("/updateTeacher", updateTeacher);
router.delete('/deleteTeacher/:teacherId', deleteTeacher);


module.exports = router;
