const express = require("express");
const { adminProfile, createPosition, viewPosition, updatePosition,schoolCreateOrUpdate, schoolView, createNotice, viewNotice, updateNotice, deleteNotice, createAcademic, viewAcademic, updateAcademic, deleteAcademic, createClassSubject, viewClassSubject, updateClassSubject, deleteClassSubject, viewTeacher, updateTeacher, deleteTeacher, deletePosition, viewStaffUserStatus, insertStaffUserStatus, createStaff, viewStaff, updateStaff, deleteStaff } = require("../controllers/admin.controller");
const { lastTeacherId, lastStaffId, lastStudentId } = require("../../helper/getLastId");
const { viewPositionData } = require("../../helper/getPositionData");
const { viewAcademicData, viewSubjectData } = require("../../helper/getClassData");

const router = express.Router();

// admin profile
router.post("/adminProfile", adminProfile);
router.post("/createPosition", createPosition);
router.get("/viewPosition", viewPosition);
router.put("/updatePosition/:position_id", updatePosition);
router.delete("/deletePosition/:position_id", deletePosition);

// school information
router.post("/schoolCreateOrUpdate", schoolCreateOrUpdate);
router.get("/schoolView", schoolView);

// // principal
// router.post('/createOrUpdatePrincipal', createOrUpdatePrincipal);
// router.get('/viewPrincipal', viewPrincipal);

// notice board
router.get('/viewNotices', viewNotice);
router.post('/createNotice', createNotice);
router.put('/notices/:noticeId', updateNotice);
router.delete('/notices/:noticeId', deleteNotice);


// for generating unique ids
// last ids
router.get("/lastTeacherId", lastTeacherId);
router.get("/lastStaffId", lastStaffId);
router.get("/lastStudentId", lastStudentId);
// other data
router.get("/viewPositionMin", viewPositionData);
router.get("/viewAcademicData", viewAcademicData);
router.get("/viewSubjectData", viewSubjectData);


// staff user_status
router.get("/viewStaffUserStatus", viewStaffUserStatus);
router.post("/createStaffCredential", insertStaffUserStatus);

// Staff endpoints
router.post("/createStaff", createStaff);
router.get("/viewStaff", viewStaff);
router.post("/updateStaff", updateStaff);
router.delete('/deleteStaff/:staffId', deleteStaff);



// Teacher endpoints
// router.post("/createTeacher", createTeacher);
router.get("/viewTeacher", viewTeacher);
router.post("/updateTeacher", updateTeacher);
router.delete('/deleteTeacher/:teacherId', deleteTeacher);



// Academic endpoints
router.post("/createAcademic", createAcademic);
router.get("/viewAcademic", viewAcademic);
router.post("/updateAcademic", updateAcademic);
router.delete("/deleteAcademic", deleteAcademic);

// // subject 
router.post("/createClassSubject", createClassSubject);
router.get("/viewClassSubject", viewClassSubject);
router.post("/updateClassSubject", updateClassSubject);
router.delete("/deleteClassSubject/:classSubjectId", deleteClassSubject);

// // student
// router.post("/createStudent", createStudent);
// router.post("/updateStudent", updateStudent);
// router.delete('/deleteStudent/:studentId', deleteStudent);
// router.get('/viewStudent', viewStudent);






module.exports = router;
