import React, { useState, useEffect } from "react";
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SubjectTable = () => {
  const [subjectData, setSubjectData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editedData, setEditedData] = useState({});
  // const [academicMessage, setAcademicMessage] = useState("");

  // Define the fetchSubjectData function
  const fetchSubjectData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/register/viewClassSubject');
      if (!response.ok) {
        throw new Error('Failed to fetch subjects');
      }
      const data = await response.json();
      console.log(data)
      setSubjectData(data);
    } catch (error) {
      console.error('Error fetching subjects:', error.message);
    }
  };

  useEffect(() => {
    fetchSubjectData();
  }, []); // Run once on component mount

  const handleDelete = (classSubjectId, index) => {
    fetch(`http://localhost:5000/api/register/deleteClassSubject/${classSubjectId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete subject');
        }
        const updatedSubjectData = [...subjectData];
        updatedSubjectData.splice(index, 1);
        setSubjectData(updatedSubjectData);
        toast("Subject deleted successfully.");
        // setAcademicMessage("Subject deleted successfully.");
      })
      .catch(error => {
        console.error('Error deleting subject:', error.message);
      });
  };


  const handleUpdate = (data) => {
    setEditedData(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    fetch('http://localhost:5000/api/register/updateClassSubject', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update subject');
        }
        toast("Subject updated successfully.");
        // setAcademicMessage("Subject updated successfully.");
        setOpen(false);
        fetchSubjectData(); // Fetch the updated data again
      })
      .catch(error => {
        console.error('Error updating subject:', error.message);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  // Function to manually refresh data
  const handleRefresh = () => {
    fetchSubjectData();
  };

  return (
    <>
      <Button onClick={handleRefresh} variant="contained" color="primary" style={{ marginBottom: '10px' }}>
        Refresh
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Class ID</TableCell>
              <TableCell>Class Subject ID</TableCell>
              <TableCell>Subject Name</TableCell>
              <TableCell>Teacher ID</TableCell>

              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjectData && subjectData.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.classId}</TableCell>
                <TableCell>{row.classSubjectId}</TableCell>
                <TableCell>{row.subjectName}</TableCell>
                <TableCell>{row.teacherId}</TableCell>

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
                    onClick={() => handleDelete(row.classSubjectId, index)} // Pass subjectId and index to handleDelete
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
            label="Class ID"
            name="classId"
            value={editedData.classId || ""}
            fullWidth
            onChange={handleInputChange}
            sx={{ mb: "10px" }}
            disabled
          />
          <TextField
            label="Class Subject ID"
            name="classSubjectId"
            value={editedData.classSubjectId || ""}
            fullWidth
            onChange={handleInputChange}
            sx={{ margin: "10px 0px 10px 0px" }}
            disabled
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
            multiline
            rows={5}
            label="Syllabus"
            name="syllabus"
            value={editedData.syllabus || ""}
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
      {/* <div className="reg-error" style={{ marginTop: 10 }}>{academicMessage}</div> */}
      <ToastContainer />
    </>
  );
};

export default SubjectTable;
