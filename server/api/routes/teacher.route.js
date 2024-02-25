const express = require("express");
const { teacherProfile, teacherProfileUpdate, studentByClassTeacher } = require("../controllers/teacher.controller");


const router = express.Router();

router.post("/teacherProfile", teacherProfile);
router.get("/studentByClassTeacher/:teacherId", studentByClassTeacher);
router.post("/teacherProfileUpdate", teacherProfileUpdate);

module.exports = router;

