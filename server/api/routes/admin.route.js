const express = require("express");
const { schoolCreateOrUpdate, schoolView, createTeacher, lastTeacherId, viewTeacher, updateTeacher, deleteTeacher, createStaff, lastStaffId, viewStaff, updateStaff, deleteStaff, createAcademic, viewAcademic, updateAcademic, deleteAcademic, createSubject, viewSubject, updateSubject, deleteSubject } = require("../controllers/admin.controller");

const router = express.Router();

router.post("/schoolCreateOrUpdate", schoolCreateOrUpdate);
router.get("/schoolView", schoolView);

// Teacher endpoints
router.get("/lastTeacherId", lastTeacherId);
router.post("/createTeacher", createTeacher);
router.get("/viewTeacher", viewTeacher);
router.post("/updateTeacher", updateTeacher);
router.delete('/deleteTeacher/:teacherId', deleteTeacher);

// Staff endpoints
router.post("/createStaff", createStaff);
router.get("/lastStaffId", lastStaffId);
router.get("/viewStaff", viewStaff);
router.post("/updateStaff", updateStaff);
router.delete('/deleteStaff/:staffId', deleteStaff);

// Academic endpoints
router.post("/createAcademic", createAcademic);
router.get("/viewAcademic", viewAcademic);
router.post("/updateAcademic", updateAcademic);
router.delete("/deleteAcademic", deleteAcademic);

// subject 
router.post("/createSubject", createSubject);
router.get("/viewSubject", viewSubject);
router.post("/updateSubject", updateSubject);
router.delete("/deleteSubject/:subjectId", deleteSubject);

// student

router.post("/createSubject", createSubject);


module.exports = router;
