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

const defaultAcademicData = [
  {
    classId: "C001",
    className: "Mathematics",
    session: "2022-2023",
    classTeacherId: "T001",
    classCaptainId: "S001",
  },
  {
    classId: "C002",
    className: "Physics",
    session: "2022-2023",
    classTeacherId: "T002",
    classCaptainId: "S002",
  },
  {
    classId: "C003",
    className: "Chemistry",
    session: "2022-2023",
    classTeacherId: "T003",
    classCaptainId: "S003",
  },
  // Add more academic data as needed
];

const AcademicTable = () => {
  const [academicData, setAcademicData] = useState(defaultAcademicData);
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [editedData, setEditedData] = useState({});

  const handleDelete = (index) => {
    const updatedAcademicData = [...academicData];
    updatedAcademicData.splice(index, 1);
    setAcademicData(updatedAcademicData);
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
    const updatedAcademicData = academicData.map((item) =>
      item.classId === editedData.classId ? editedData : item
    );
    setAcademicData(updatedAcademicData);
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  return (
    <>
      <TableContainer component={Paper} sx={{backgroundColor: '#ffffff66' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Class ID</TableCell>
              <TableCell>Class Name</TableCell>
              <TableCell>Session</TableCell>
              <TableCell>Class Teacher ID</TableCell>
              <TableCell>Class Captain ID</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {academicData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.classId}</TableCell>
                <TableCell>{row.className}</TableCell>
                <TableCell>{row.session}</TableCell>
                <TableCell>{row.classTeacherId}</TableCell>
                <TableCell>{row.classCaptainId}</TableCell>
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
        <DialogTitle>Update Academic Data</DialogTitle>
        <DialogContent>
          <TextField
            label="Class ID"
            name="classId"
            value={editedData.classId || ""}
            fullWidth
            onChange={handleInputChange}
            disabled
            sx={{ margin: '10px 0px 10px 0px', }}
          />
          <TextField
            label="Class Name"
            name="className"
            value={editedData.className || ""}
            fullWidth
            onChange={handleInputChange}
            sx={{ mb: '10px' }}
          />
          <TextField
            label="Session"
            name="session"
            value={editedData.session || ""}
            fullWidth
            onChange={handleInputChange}
            sx={{ mb: '10px' }}
          />
          <TextField
            label="Class Teacher ID"
            name="classTeacherId"
            value={editedData.classTeacherId || ""}
            fullWidth
            onChange={handleInputChange}
            sx={{ mb: '10px' }}
          />
          <TextField
            label="Class Captain ID"
            name="classCaptainId"
            value={editedData.classCaptainId || ""}
            fullWidth
            onChange={handleInputChange}
            sx={{ mb: '10px' }}
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

export default AcademicTable;
