const express = require("express");
const { teacherProfile, teacherProfileUpdate, studentByClassTeacher, updateStudentByClassTeacher, deleteStudentByClassTeacher } = require("../controllers/teacher.controller");


const router = express.Router();

router.post("/teacherProfile", teacherProfile);
router.get("/studentByClassTeacher/:teacherId", studentByClassTeacher);
router.post("/teacherProfileUpdate", teacherProfileUpdate);
router.post("/updateStudentByClassTeacher", updateStudentByClassTeacher);
router.delete("/deleteStudentByClassTeacher/:studentId", deleteStudentByClassTeacher);

module.exports = router;

