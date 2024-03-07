import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import SubjectTable from "./SubjectTable";

const theme = createTheme();

export default function SubjectInfo() {
  const [formData, setFormData] = useState({
    subjectID: "",
    classID: "",
    subjectName: "",
    teacherId: "",
  });
  const [subjectMessage, setSubjectMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/admin/createSubject/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setSubjectMessage("Subject created successfully");
      } else {
        setSubjectMessage(data.message || "Failed to create subject");
      }
    } catch (error) {
      setSubjectMessage("An unexpected error occurred");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="teacher-info">
      <div className="create-teacher">
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            padding: "10px 15px",
            backgroundColor: "#ffffff66",
            mb: 4,
          }}
        >
          <form onSubmit={handleSubmit}>
            <TextField
              type="text"
              name="subjectID"
              label="Subject ID"
              value={formData.subjectID}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              type="text"
              name="classID"
              label="Class ID"
              value={formData.classID}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              type="text"
              name="subjectName"
              label="Subject Name"
              value={formData.subjectName}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              type="text"
              name="teacherId"
              label="Teacher Id"
              value={formData.teacherId}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button variant="outlined" color="secondary" type="submit">
              Register
            </Button>
          </form>
          <div className="reg-error">
            {subjectMessage}
          </div>
        </Paper>
      </div>

      <div className="teacher-view-ex">
        <div className="teacher-view">
          {/* <div className="create-teacher-id view-teacher-info">
            <Button>Update Subject Information</Button>
          </div> */}
          <ThemeProvider theme={theme}>
            {/* Pass props to SubjectTable */}
            <SubjectTable />
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}
