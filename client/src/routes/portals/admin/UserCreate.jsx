import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Paper
} from "@mui/material";
import { ContactUs } from "../../../ContactUs";
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
  const [parentID, setParentID] = useState("");
  const [subjectID, setSubjectID] = useState("");
  const [type, setType] = useState("Teacher");
  const [teacherInfo, setTeacherInfo] = useState("");

  console.log(Id, email, positionID, type)

  const fetchData = () => {
    let urlToFetch = "";
    if (type === "Teacher") {
      urlToFetch = "http://localhost:5000/api/admin/lastTeacherId";
    } else if (type === "Student") {
      urlToFetch = "http://localhost:5000/api/admin/lastStudentId";
    } else {
      urlToFetch = "http://localhost:5000/api/admin/lastStaffId";
    }

    fetch(urlToFetch)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch teacher information');
        }
        return response.json();
      })
      .then(data => {
        console.log(data)
        let userId = data.teacherId || data.staffId || data.lastStudentId;
        if (userId) {
          setLastThreeDigit(String(userId).slice(-3));
          handleGenerateId();
        } else {
          console.log("lastTeacherId is not yet available.");
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  let start = "", mid = "", end = "";
  if (type === "Teacher") {
    start = 1;
    mid = subjectID;
    end = lastThreeDigit;
  } else if (type === "Student") {
    start = 2;
    mid = academicID;
    end = lastThreeDigit;
  } else if (type === "Staff") {
    start = 0;
    mid = positionID;
    end = lastThreeDigit;
  }

  const handleGenerateId = () => {
    const newId = createId(start, mid, end);
    setId(newId);
  };
  const handleGenerateParentId = () => {
    const newId = createId(3, mid, end);
    setParentID(newId);
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
      const response = await fetch("http://localhost:5000/api/admin/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to register teacher");
      }
      const responseData = await response.json();
      console.log(responseData);

      if (responseData.success) {
        fetchData();
      }

      setTeacherInfo(responseData.message);
      setType("");
      setId("");
      setEmail("");
      setPositionID("")
      setAcademicID("")
      setSubjectID("")
      // Handle any success UI feedback
    } catch (error) {
      console.error("Error:", error);
      setTeacherInfo(error.message);
    }
  };

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
                  setType(e.target.value)
                }}
                value={type}
                sx={{ mb: 4 }}
              >
                <MenuItem value="Teacher">Teacher</MenuItem>
                <MenuItem value="Student">Student</MenuItem>
                <MenuItem value="Staff">Staff</MenuItem>
              </TextField>


              {(type === "Teacher") && <TextField
                select
                variant="outlined"
                color="secondary"
                label="Subject ID"
                onChange={(e) => {
                  setPositionID("");
                  setSubjectID(e.target.value)
                  console.log(subjectID)
                  handleGenerateId()
                }}
                value={subjectID}
                sx={{ mb: 4 }}
                required
              >
                <MenuItem value="01">Bangla</MenuItem>
                <MenuItem value="02">English</MenuItem>
              </TextField>}


              {(type === "Staff") && <TextField
                select
                variant="outlined"
                color="secondary"
                label="Position"
                onChange={(e) => {
                  setAcademicID("");
                  setPositionID(e.target.value)
                  handleGenerateId()
                }}
                value={positionID}
                // fullWidth
                sx={{ mb: 4 }}
              >
                <MenuItem value="01">Head Teacher</MenuItem>
                <MenuItem value="02">Assistant Head Teacher</MenuItem>
              </TextField>}

              {(type === "Student") &&
                <TextField
                  select
                  variant="outlined"
                  color="secondary"
                  label="Academic ID"
                  onChange={(e) => {
                    setPositionID("")
                    setSubjectID("")
                    setAcademicID(e.target.value)
                    handleGenerateId()
                    handleGenerateParentId()
                  }}
                  value={academicID}
                  sx={{ mb: 4 }}
                  required
                >
                  <MenuItem value="10">10</MenuItem>
                  <MenuItem value="9">9</MenuItem>
                </TextField>
              }
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
            />

            {
              type === "Student" && <TextField
                type="text"
                variant="outlined"
                label={`Unique Parent ID`}
                InputLabelProps={{ shrink: true }}
                color="secondary"
                value={parentID}
                fullWidth
                required
                sx={{ mb: 4 }}
              />
            }

            <Button variant="outlined" color="secondary" type="submit">
              Register
            </Button>
          </form>
          <p className="reg-error">
            {teacherInfo}
          </p>
        </Paper>
      </div>

      <ContactUs
        type
        Id
        email
        position
      />

      <h1>User Status</h1>
      <UserStatus />

    </div>
  );
}
