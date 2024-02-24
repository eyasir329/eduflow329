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

const AcademicTable = () => {
  const [academicData, setAcademicData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [academicMessage, setAcademicMessage] = useState("");

  useEffect(() => {
    fetchAcademicData();
  }, []);

  const fetchAcademicData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/viewAcademic");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setAcademicData(data);
    } catch (error) {
      console.error("Error fetching academic data:", error);
    }
  };

  const handleDelete = async (classId) => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/deleteAcademic", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ classId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete academic data");
      }

      // Remove the deleted item from the client-side state
      const updatedAcademicData = academicData.filter((item) => item.classId !== classId);
      setAcademicData(updatedAcademicData);
      setAcademicMessage("Academic data deleted successfully.");
    } catch (error) {
      console.error("Error deleting academic data:", error);
      setAcademicMessage("Failed to delete academic data.");
    }
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
    // Implement logic to save updated data to the server
    const updateAcademicData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/admin/updateAcademic", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedData),
        });

        if (!response.ok) {
          throw new Error("Failed to update data");
        }

        // Update the academic data in the client-side state
        const updatedAcademicData = academicData.map((item) =>
          item.classId === editedData.classId ? editedData : item
        );
        setAcademicData(updatedAcademicData);
        setOpen(false);
        setAcademicMessage("Academic data updated successfully.");
      } catch (error) {
        console.error("Error updating academic data:", error);
        setAcademicMessage("Failed to update academic data.");
      }
    };

    // Call the function to update the data
    updateAcademicData();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleRefresh = () => {
    fetchAcademicData();
  };

  return (
    <>
      <Button
        onClick={handleRefresh}
        variant="contained"
        color="primary"
        style={{ marginBottom: "10px" }}
      >
        Refresh
      </Button>
      <TableContainer component={Paper} sx={{ backgroundColor: "#ffffff66" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Class ID</TableCell>
              <TableCell>Class Name</TableCell>
              <TableCell>Session</TableCell>
              <TableCell>Room Number</TableCell>
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
                <TableCell>{row.roomNumber}</TableCell>
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
                    onClick={() => handleDelete(row.classId)}
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
            sx={{ margin: "10px 0px 10px 0px" }}
          />
          <TextField
            label="Class Name"
            name="className"
            value={editedData.className || ""}
            fullWidth
            onChange={handleInputChange}
            sx={{ mb: "10px" }}
          />
          <TextField
            label="Session"
            name="session"
            value={editedData.session || ""}
            fullWidth
            onChange={handleInputChange}
            sx={{ mb: "10px" }}
          />
          <TextField
            label="Room Number"
            name="roomNumber" // Change name to "roomNumber"
            value={editedData.roomNumber || ""} // Access roomNumber property in editedData
            fullWidth
            onChange={handleInputChange}
            sx={{ mb: "10px" }}
          />
          <TextField
            label="Class Teacher ID"
            name="classTeacherId"
            value={editedData.classTeacherId || ""}
            fullWidth
            onChange={handleInputChange}
            sx={{ mb: "10px" }}
          />
          <TextField
            label="Class Captain ID"
            name="classCaptainId"
            value={editedData.classCaptainId || ""}
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
      <div className="reg-error" style={{ marginTop: 10 }}>{academicMessage}</div>
    </>
  );
};

export default AcademicTable;
