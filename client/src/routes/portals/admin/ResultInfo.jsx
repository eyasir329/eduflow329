import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

const defaultResultData = [
  {
    examType: "Midterm",
    examHeld: "2024-02-15",
    classId: "C001",
    subjectId: "S001",
    teacherId: "T001",
    studentId: "ST002",
    cq: 80,
    mcq: 70,
    presentPercentage: 90,
  },
  {
    examType: "Midterm",
    examHeld: "2024-02-15",
    classId: "C002",
    subjectId: "S002",
    teacherId: "T002",
    studentId: "ST001",
    cq: 80,
    mcq: 70,
    presentPercentage: 90,
  },
  // Add more result data as needed
];

const ResultInfo = () => {
  const [resultData, setResultData] = useState(defaultResultData);
  const [open, setOpen] = useState(false);
  const [selectedDataIndex, setSelectedDataIndex] = useState(null);
  const [editedData, setEditedData] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState({
    studentId: "",
    teacherId: "",
    classId: "",
    subjectId: "",
  });

  const handleDelete = (index) => {
    const updatedResultData = [...resultData];
    updatedResultData.splice(index, 1);
    setResultData(updatedResultData);
  };

  const handleUpdate = (index) => {
    setSelectedDataIndex(index);
    setEditedData({ ...resultData[index] });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const updatedResultData = [...resultData];
    updatedResultData[selectedDataIndex] = editedData;
    setResultData(updatedResultData);
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    const filteredData = defaultResultData.filter((data) => {
      for (let key in searchCriteria) {
        if (searchCriteria[key] !== "" && data[key] !== searchCriteria[key]) {
          return false;
        }
      }
      return true;
    });
    setResultData(filteredData);
  };

  const handleReset = () => {
    setSearchCriteria({
      studentId: "",
      teacherId: "",
      classId: "",
      subjectId: "",
    });
    setResultData(defaultResultData);
  };

  return (
    <>
      <div className="teacher-info">
        <div className="teacher-view-ex">
          <div className="teacher-view">
            <TextField
              label="Student ID"
              value={searchCriteria.studentId}
              onChange={(e) =>
                setSearchCriteria({
                  ...searchCriteria,
                  studentId: e.target.value,
                })
              }
            />
            <TextField
              label="Teacher ID"
              value={searchCriteria.teacherId}
              onChange={(e) =>
                setSearchCriteria({
                  ...searchCriteria,
                  teacherId: e.target.value,
                })
              }
            />
            <TextField
              label="Class ID"
              value={searchCriteria.classId}
              onChange={(e) =>
                setSearchCriteria({
                  ...searchCriteria,
                  classId: e.target.value,
                })
              }
            />
            <TextField
              label="Subject ID"
              value={searchCriteria.subjectId}
              onChange={(e) =>
                setSearchCriteria({
                  ...searchCriteria,
                  subjectId: e.target.value,
                })
              }
            />
            <Button variant="contained" color="primary" onClick={handleSearch}>
              Search
            </Button>
            <Button variant="contained" color="secondary" onClick={handleReset}>
              Reset
            </Button>
            <TableContainer component={Paper} sx={{ backgroundColor: "#ffffff66",marginTop:"30px"}}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Exam Type</TableCell>
                    <TableCell>Exam Held</TableCell>
                    <TableCell>Class ID</TableCell>
                    <TableCell>Subject ID</TableCell>
                    <TableCell>Teacher ID</TableCell>
                    <TableCell>Student ID</TableCell>
                    <TableCell>CQ</TableCell>
                    <TableCell>MCQ</TableCell>
                    <TableCell>Present Percentage</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resultData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.examType}</TableCell>
                      <TableCell>{row.examHeld}</TableCell>
                      <TableCell>{row.classId}</TableCell>
                      <TableCell>{row.subjectId}</TableCell>
                      <TableCell>{row.teacherId}</TableCell>
                      <TableCell>{row.studentId}</TableCell>
                      <TableCell>{row.cq}</TableCell>
                      <TableCell>{row.mcq}</TableCell>
                      <TableCell>{row.presentPercentage}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleUpdate(index)}
                        >
                          Update
                        </Button>{" "}
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleDelete(index)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Update Result Data</DialogTitle>
              <DialogContent>
                <TextField
                  label="Exam Type"
                  name="examType"
                  value={editedData?.examType || ""}
                  fullWidth
                  onChange={handleInputChange}
                  sx={{ margin: "10px 0px 10px 0px" }}
                />
                <TextField
                  label="Exam Held"
                  name="examHeld"
                  value={editedData?.examHeld || ""}
                  fullWidth
                  onChange={handleInputChange}
                  sx={{ mb: "10px" }}
                />
                <TextField
                  label="Class ID"
                  name="classId"
                  value={editedData?.classId || ""}
                  fullWidth
                  onChange={handleInputChange}
                  sx={{ mb: "10px" }}
                />
                <TextField
                  label="Subject ID"
                  name="subjectId"
                  value={editedData?.subjectId || ""}
                  fullWidth
                  onChange={handleInputChange}
                  sx={{ mb: "10px" }}
                />
                <TextField
                  label="Teacher ID"
                  name="teacherId"
                  value={editedData?.teacherId || ""}
                  fullWidth
                  onChange={handleInputChange}
                  sx={{ mb: "10px" }}
                />
                <TextField
                  label="Student ID"
                  name="studentId"
                  value={editedData?.studentId || ""}
                  fullWidth
                  onChange={handleInputChange}
                  sx={{ mb: "10px" }}
                />
                <TextField
                  label="CQ"
                  name="cq"
                  value={editedData?.cq || ""}
                  fullWidth
                  onChange={handleInputChange}
                  sx={{ mb: "10px" }}
                />
                <TextField
                  label="MCQ"
                  name="mcq"
                  value={editedData?.mcq || ""}
                  fullWidth
                  onChange={handleInputChange}
                  sx={{ mb: "10px" }}
                />
                <TextField
                  label="Present Percentage"
                  name="presentPercentage"
                  value={editedData?.presentPercentage || ""}
                  fullWidth
                  onChange={handleInputChange}
                  sx={{ mb: "10px" }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                  Save
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultInfo;
