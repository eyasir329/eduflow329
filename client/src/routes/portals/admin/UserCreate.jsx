import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Paper
} from "@mui/material";
import { Stack } from "react-bootstrap";
import UserStatus from "./UserStatus";

function createId(department, midId, lastId) {
  const currentYear = new Date().getFullYear().toString();
  const idPrefix = `${currentYear}${department}`;
  const previousId = parseInt(lastId, 10) + 1;
  return idPrefix + midId + previousId.toString().padStart(3, '0');
}

export default function UserCreate() {
  const [lastThreeDigit, setLastThreeDigit] = useState("000");
  const [Id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [positionID, setPositionID] = useState("");
  const [academicID, setAcademicID] = useState("");
  const [subjectID, setSubjectID] = useState("");
  const [type, setType] = useState("Teacher");
  const [teacherInfo, setTeacherInfo] = useState("");

  const handleGenerateId = () => {
    let newId = "";

    if (type === "Teacher") {
      newId = createId(1, subjectID, lastThreeDigit);
    } else if (type === "Staff") {
      newId = createId(0, positionID, lastThreeDigit);
    } else if (type === "Student") {
      newId = createId(2, academicID, lastThreeDigit);
    }

    setId(newId);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Prepare the data to be sent to the backend API
    const data = {
      Id,
      email,
      positionID
    };

    // Send the data to your backend API using fetch or axios
    try {
      // Your fetch request here
    } catch (error) {
      console.error("Error:", error);
      setTeacherInfo(error.message);
    }
  };

  useEffect(() => {
    handleGenerateId();
  }, [type, subjectID, academicID, positionID]);

  return (
    <div className="teacher-info">
      <div className="create-teacher">
        <Paper
          sx={{
            width: '100%',
            overflow: 'hidden',
            padding: '10px 15px',
            backgroundColor: '#ffffff66',
            mb: 4,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                select
                variant="outlined"
                color="secondary"
                label="User Type"
                onChange={(e) => {
                  setType(e.target.value);
                }}
                value={type}
                sx={{ mb: 4 }}
              >
                <MenuItem value="Teacher">Teacher</MenuItem>
                <MenuItem value="Staff">Staff</MenuItem>
                <MenuItem value="Student">Student</MenuItem>
              </TextField>

              {(type === "Teacher") && (
                <TextField
                  select
                  variant="outlined"
                  color="secondary"
                  label="Subject ID"
                  onChange={(e) => {
                    setPositionID("");
                    setSubjectID(e.target.value);
                  }}
                  value={subjectID}
                  sx={{ mb: 4 }}
                  required
                >
                  <MenuItem value="01">Bangla</MenuItem>
                  <MenuItem value="02">English</MenuItem>
                </TextField>
              )}

              {(type === "Staff") && (
                <TextField
                  select
                  variant="outlined"
                  color="secondary"
                  label="Position"
                  onChange={(e) => {
                    setAcademicID("");
                    setPositionID(e.target.value);
                  }}
                  value={positionID}
                  sx={{ mb: 4 }}
                >
                  <MenuItem value="01">Head Teacher</MenuItem>
                  <MenuItem value="02">Assistant Head Teacher</MenuItem>
                </TextField>
              )}

              {(type === "Student") && (
                <TextField
                  select
                  variant="outlined"
                  color="secondary"
                  label="Academic ID"
                  onChange={(e) => {
                    setPositionID("");
                    setSubjectID("");
                    setAcademicID(e.target.value);
                  }}
                  value={academicID}
                  sx={{ mb: 4 }}
                  required
                >
                  <MenuItem value="10">10</MenuItem>
                  <MenuItem value="9">9</MenuItem>
                </TextField>
              )}
            </Stack>

            <TextField
              type="email"
              variant="outlined"
              color="secondary"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              fullWidth
              required
              sx={{ mb: 4 }}
            />

            <TextField
              type="text"
              variant="outlined"
              label={`Unique ${type} ID`}
              InputLabelProps={{ shrink: true }}
              color="secondary"
              value={Id}
              fullWidth
              required
              sx={{ mb: 4 }}
              disabled
            />

            <Button variant="outlined" color="secondary" type="submit">
              Register
            </Button>
          </form>
          <p className="reg-error">
            {teacherInfo}
          </p>
        </Paper>
      </div>
      {/* <ContactUs
        type
        Id
        email
        position
      />*/}

      <h1>User Status</h1>
      <UserStatus />
    </div>
  );
}
