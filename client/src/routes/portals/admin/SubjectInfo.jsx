// SubjectInfo.js

import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../../../redux/user/userSlice";
import SubjectTable from "./SubjectTable";

const theme = createTheme();

export default function SubjectInfo() {
  const [formData, setFormData] = useState({
    subjectID: "",
    classID: "",
    subjectName: "",
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(updateUserStart());

      const res = await fetch(`http://localhost:5000/api/student/update/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const contentType = res.headers.get("Content-Type");
        if (contentType && contentType.startsWith("application/json")) {
          const errorData = await res.json();
          dispatch(updateUserFailure(errorData.message));
        } else {
          dispatch(updateUserFailure("An unexpected error occurred"));
        }
        return;
      }

      const data = await res.json();

      if (data.success === false) {
        dispatch(
          updateUserFailure(
            data.message || "An unexpected error occurred"
          )
        );
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure("An unexpected error occurred"));
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handler to get previous subject information
  const previousInfoHandler = () => {
    // Logic to retrieve previous subject information
    const previousSubjectInfo = {
      subjectID: "PreviousSubjectID",
      classID: "PreviousClassID",
      subjectName: "PreviousSubjectName",
    };
    return previousSubjectInfo;
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
            <Button variant="outlined" color="secondary" type="submit">
              Register
            </Button>
          </form>
        </Paper>
      </div>

      <div className="teacher-view-ex">
        <div className="teacher-view">
          <div className="create-teacher-id view-teacher-info">
            <Button>Update Subject Information</Button>
          </div>
          <ThemeProvider theme={theme}>
            {/* Pass props to SubjectTable */}
            <SubjectTable
              previousInfoHandler={previousInfoHandler}
              teacherData={[]} // Pass your teacher data array here
            />
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}
