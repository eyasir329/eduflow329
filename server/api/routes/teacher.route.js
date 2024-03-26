const express = require("express");
const { insertStudentUserStatus, viewStudentUserStatus, createStudent } = require("../controllers/teacher.controller");
// const { teacherProfile, teacherProfileUpdate, studentByClassTeacher, updateStudentByClassTeacher, deleteStudentByClassTeacher } = require("../controllers/teacher.controller");


const router = express.Router();

// student user_status
router.get("/viewStudentUserStatus", viewStudentUserStatus);
router.post("/createStudentCredential", insertStudentUserStatus);

// student
router.post("/createStudent", createStudent);
// router.post("/updateStudent", updateStudent);
// router.delete('/deleteStudent/:studentId', deleteStudent);
// router.get('/viewStudent', viewStudent);

// router.post("/teacherProfile", teacherProfile);
// router.get("/studentByClassTeacher/:teacherId", studentByClassTeacher);
// router.post("/teacherProfileUpdate", teacherProfileUpdate);
// router.post("/updateStudentByClassTeacher", updateStudentByClassTeacher);
// router.delete("/deleteStudentByClassTeacher/:studentId", deleteStudentByClassTeacher);



module.exports = router;

    