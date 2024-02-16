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

const defaultSubjectData = [
  {
    subjectId: "S001",
    subjectName: "Biology",
    teacherId: "T004",
    classId: "C001", // Reference to the class ID
  },
  {
    subjectId: "S002",
    subjectName: "History",
    teacherId: "T005",
    classId: "C002", // Reference to the class ID
  },
  {
    subjectId: "S003",
    subjectName: "Literature",
    teacherId: "T006",
    classId: "C003", // Reference to the class ID
  },
  // Add more subject data as needed
];

const SubjectTable = () => {
  const [subjectData, setSubjectData] = useState(defaultSubjectData);
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleDelete = (index) => {
    const updatedSubjectData = [...subjectData];
    updatedSubjectData.splice(index, 1);
    setSubjectData(updatedSubjectData);
  };

  const handleUpdate = (data) => {
    setSelectedData(data);
    setEditedData(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    // Implement logic to save updated data
    const updatedSubjectData = subjectData.map((item) =>
      item.subjectId === editedData.subjectId ? editedData : item
    );
    setSubjectData(updatedSubjectData);
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ backgroundColor: "#ffffff66" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subject ID</TableCell>
              <TableCell>Subject Name</TableCell>
              <TableCell>Teacher ID</TableCell>
              <TableCell>Class ID</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjectData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.subjectId}</TableCell>
                <TableCell>{row.subjectName}</TableCell>
                <TableCell>{row.teacherId}</TableCell>
                <TableCell>{row.classId}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleUpdate(row)}
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
        <DialogTitle>Update Subject Data</DialogTitle>
        <DialogContent>
          <TextField
            label="Subject ID"
            name="subjectId"
            value={editedData.subjectId || ""}
            fullWidth
            onChange={handleInputChange}
            disabled
            sx={{ margin: "10px 0px 10px 0px" }}
          />
          <TextField
            label="Subject Name"
            name="subjectName"
            value={editedData.subjectName || ""}
            fullWidth
            onChange={handleInputChange}
            sx={{ mb: "10px" }}
          />
          <TextField
            label="Teacher ID"
            name="teacherId"
            value={editedData.teacherId || ""}
            fullWidth
            onChange={handleInputChange}
            sx={{ mb: "10px" }}
          />
          <TextField
            label="Class ID"
            name="classId"
            value={editedData.classId || ""}
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
    </>
  );
};

export default SubjectTable;
