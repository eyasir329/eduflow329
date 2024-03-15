const express = require("express");
const { insertTeacherUserStatus, viewTeacherUserStatus, createTeacher, viewTeacher, updateTeacher, deleteTeacher, createAcademic, viewAcademic, updateAcademic, deleteAcademic, createClassSubject, viewClassSubject, updateClassSubject, deleteClassSubject, createSubject, viewSubject, updateSubject, deleteSubject } = require("../controllers/register.controller");
const { viewAcademicData, viewSubjectData } = require("../../helper/getClassData");
const { viewTeacherData } = require("../../helper/getTeacherData");
const router = express.Router();


// teacher user status
router.post("/createTeacherCredential", insertTeacherUserStatus);
router.get("/viewTeacherUserStatus", viewTeacherUserStatus);


// Teacher endpoints
router.post("/createTeacher", createTeacher);
router.get("/viewTeacher", viewTeacher);
router.post("/updateTeacher", updateTeacher);
router.delete('/deleteTeacher/:teacherId', deleteTeacher);

// Academic endpoints
router.post("/createAcademic", createAcademic);
router.get("/viewAcademic", viewAcademic);
router.post("/updateAcademic", updateAcademic);
router.delete("/deleteAcademic", deleteAcademic);

// view section
router.get("/viewAcademicData", viewAcademicData);
router.get("/viewSubjectData", viewSubjectData);
router.get("/viewTeacherData", viewTeacherData);

// crud in general subjects
router.post("/createSubject", createSubject);
router.get("/viewSubject", viewSubject);
router.put("/updateSubject/:subject_id", updateSubject);
router.delete("/deleteSubject/:subject_id", deleteSubject);

// class subject 
router.post("/createClassSubject", createClassSubject);
router.get("/viewClassSubject", viewClassSubject);
router.post("/updateClassSubject", updateClassSubject);
router.delete("/deleteClassSubject/:classSubjectId", deleteClassSubject);


module.exports = router;