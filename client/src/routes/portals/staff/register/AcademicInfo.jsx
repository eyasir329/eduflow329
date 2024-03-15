import React, { useState } from "react";
import {
  TextField,
  Button,
  Stack,
  Paper,
  createTheme,
} from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import AcademicTable from "./AcademicTable";
import { ThemeProvider } from "@emotion/react";
import SubjectInfo from "./SubjectInfo";

const theme = createTheme();

export default function AcademicInfo() {

  const [classId, setClassId] = useState("");
  const [className, setClassName] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [session, setSession] = useState("");
  const [classTeacherId, setClassTeacherId] = useState("");
  const [classCaptainId, setClassCaptainId] = useState("");
  const [syllabus, setSyllabus] = useState("");
  // const [academicMessage, setAcademicMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      classId,
      className,
      roomNumber,
      session,
      classTeacherId,
      classCaptainId,
      syllabus
    };
    try {

      const res = await fetch(`http://localhost:5000/api/register/createAcademic`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data)

      toast(data.message);
      // setAcademicMessage(data.message)


    } catch (error) {
    }
  };

  return (
    <>
      <div className="teacher-info">
        <div className="create-teacher">
          <Paper sx={{ width: '100%', overflow: 'hidden', padding: '10px 15px', backgroundColor: '#ffffff66', mb: 4 }}>
            <form onSubmit={handleSubmit} action={<Link to="/login" />}>
              <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                <TextField
                  type="text"
                  variant="outlined"
                  label="Class ID"
                  InputLabelProps={{ shrink: true }}
                  color="secondary"
                  fullWidth
                  required
                  value={classId}
                  onChange={(e) => setClassId(e.target.value)}
                />
                <TextField
                  type="text"
                  variant="outlined"
                  label="Class Name"
                  InputLabelProps={{ shrink: true }}
                  color="secondary"
                  fullWidth
                  required
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                />
                <TextField
                  type="text"
                  variant="outlined"
                  label="Room Number"
                  InputLabelProps={{ shrink: true }}
                  color="secondary"
                  fullWidth
                  required
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                />
              </Stack>

              <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                <TextField
                  type="text"
                  variant="outlined"
                  label="Session"
                  InputLabelProps={{ shrink: true }}
                  color="secondary"
                  fullWidth
                  required
                  value={session}
                  onChange={(e) => setSession(e.target.value)}
                />
                <TextField
                  type="text"
                  variant="outlined"
                  label="Class Teacher ID"
                  InputLabelProps={{ shrink: true }}
                  color="secondary"
                  fullWidth
                  value={classTeacherId}
                  onChange={(e) => setClassTeacherId(e.target.value)}
                />
                <TextField
                  type="text"
                  variant="outlined"
                  label="Class Captain ID"
                  InputLabelProps={{ shrink: true }}
                  color="secondary"
                  fullWidth
                  value={classCaptainId}
                  onChange={(e) => setClassCaptainId(e.target.value)}
                />
              </Stack>

              <TextField
                multiline
                rows={10} // Adjust the number of rows as needed
                variant="outlined"
                label="Syllabus"
                InputLabelProps={{ shrink: true }}
                color="secondary"
                fullWidth
                value={syllabus}
                onChange={(e) => setSyllabus(e.target.value)}
              />


              <Button variant="outlined" color="secondary" type="submit">
                Register
              </Button>
            </form>
            {/* <div className="reg-error">
              {academicMessage}
            </div> */}
          </Paper>

          <div className="teacher-view-ex">
            <div className="teacher-view">
              {/* <div className="create-teacher-id view-teacher-info">
              <button >
                Update Academic Information
              </button>
            </div> */}
              <ThemeProvider theme={theme}>

                <AcademicTable />

              </ThemeProvider>
            </div>
          </div>

        </div>

      </div>


      {/* <div className="teacher-info">
        <h1>
          Subject Info
        </h1>
        <div className="create-teacher">
          <SubjectInfo />
        </div>
      </div> */}
      <ToastContainer />
    </>
  );
}
