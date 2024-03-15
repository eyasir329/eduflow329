import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Paper,
  createTheme,
  ThemeProvider,
  Grid,
  MenuItem
} from "@mui/material";

import SubjectTable from "./SubjectTable";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme();

export default function SubjectInfo() {
  const [formData, setFormData] = useState({
    classSubjectID: "",
    classID: "",
    subjectName: "",
    teacherId: "",
    syllabus: ""
  });
  // const [subjectMessage, setSubjectMessage] = useState("");
  const [teacherMenuItem, setTeacherMenuItem] = useState([]);
  const [academicMenuItem, setAcademicMenuItem] = useState([]);
  const [subjectMenuItem, setSubjectMenuItem] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [teacherResponse, setTeacherResponse] = useState(null); // Define teacherResponse state

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [teacherResponse, academicResponse, subjectResponse] = await Promise.all([
        axios.get('http://localhost:5000/api/register/viewTeacherData'),
        axios.get('http://localhost:5000/api/register/viewAcademicData'),
        axios.get('http://localhost:5000/api/register/viewSubjectData'),
      ]);

      setTeacherResponse(teacherResponse); // Set teacherResponse state
      setAcademicMenuItem(mapToMenuItems(academicResponse.data.positions, 'class_name', 'class_id'));
      setSubjectMenuItem(mapToMenuItems(subjectResponse.data.subjects, 'sub_name', 'subject_id'));

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const mapToMenuItems = (data, labelKey, valueKey) => {
    if (Array.isArray(data)) {
      return data.map(item => (
        <MenuItem key={item[valueKey]} value={item[valueKey]}>{item[labelKey]}</MenuItem>
      ));
    } else {
      console.error('Data received is not an array:', data);
      return [];
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/register/createClassSubject/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        toast("Subject created successfully");
        // setSubjectMessage("Subject created successfully");
      } else {
        toast(data.message);
        // setSubjectMessage(data.message || "Failed to create subject");
      }
    } catch (error) {
      toast("An unexpected error occurred");
      // setSubjectMessage("An unexpected error occurred");
    }
  };

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  
    console.log("Selected subject ID:", value); // Check if the selected subject ID is correct
  
    // Filter teachers based on the selected subject's ID
    if (name === 'subjectName') {
      const selectedSubjectId = value;
      console.log("Teachers data:", teacherResponse.data.positions); // Check if the teacher data is available
      const filteredTeachers = teacherResponse.data.positions.filter(teacher => teacher.subject_id === selectedSubjectId);
      console.log("Filtered teachers:", filteredTeachers); // Check the filtered teachers
      setFilteredTeachers(filteredTeachers);
    }
  };
  


  const handleRefresh = () => {
    fetchData();
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
          <Button variant="outlined" onClick={handleRefresh}>Refresh</Button>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={4}>
                <TextField
                  select
                  type="text"
                  name="classID"
                  label="Class Name"
                  value={formData.classID}
                  onChange={handleChange}
                  required
                  fullWidth
                >
                  {academicMenuItem}
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  type="text"
                  name="classSubjectID"
                  label="Subject ID"
                  value={formData.classSubjectID}
                  onChange={handleChange}
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  select
                  type="text"
                  name="subjectName"
                  label="Subject Name"
                  value={formData.subjectName}
                  onChange={handleChange}
                  required
                  fullWidth
                >
                  {subjectMenuItem}
                </TextField>
              </Grid>
            </Grid>
            <TextField
              select
              type="text"
              name="teacherId"
              label="Teacher Name"
              value={formData.teacherId}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            >
              {filteredTeachers.map(teacher => (
                <MenuItem key={teacher.teacher_id} value={teacher.teacher_id}>{teacher.teacher_id}</MenuItem>
              ))}
            </TextField>

            <TextField
              multiline
              rows={3}
              type="text"
              name="syllabus"
              label="Syllabus"
              value={formData.syllabus}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button variant="outlined" color="secondary" type="submit">
              Register
            </Button>
          </form>
          {/* <div className="reg-error">
            {subjectMessage}
          </div> */}
        </Paper>
      </div>

      <div className="teacher-view-ex">
        <div className="teacher-view">
          <ThemeProvider theme={theme}>
            {/* Pass props to SubjectTable */}
            <SubjectTable />
          </ThemeProvider>
        </div>
      </div>
      <ToastContainer />
    </div >
  );
}
