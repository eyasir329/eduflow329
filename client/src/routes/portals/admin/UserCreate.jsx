import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Paper
} from "@mui/material";
import { ContactUs } from "../../../ContactUs";
import UserData from "../UserData";

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
  const [position, setPosition] = useState("");
  const [type, setType] = useState("Teacher");
  const [teacherInfo, setTeacherInfo] = useState("");

  console.log(Id)

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
        let userId = data.teacherId ||data.staffId || data.lastStudentId ;
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

  const handleGenerateId = () => {
    const newTeacherId = createId('04', '0', lastThreeDigit);
    setId(newTeacherId);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Prepare the data to be sent to the backend API
    const data = {
      Id,
      email,
      position
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

      // Reset the form fields after successful submission
      setType("");
      setId("");
      setEmail("");
      setPosition("")
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
            <TextField
              select
              variant="outlined"
              color="secondary"
              label="User Type"
              onChange={(e) => {
                setType(e.target.value) 
                fetchData()}}
              value={type}
              fullWidth
              sx={{ mb: 4 }}
            >
              <MenuItem value="Teacher">Teacher</MenuItem>
              <MenuItem value="Student">Student</MenuItem>
              <MenuItem value="Staff">Staff</MenuItem>
            </TextField>

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

            {(type==="Teacher" || type==="Staff") && <TextField
              select
              variant="outlined"
              color="secondary"
              label="Position"
              onChange={(e) => setPosition(e.target.value)}
              value={position}
              fullWidth
              sx={{ mb: 4 }}
            >
              <MenuItem value="Head Teacher">Head Teacher</MenuItem>
              <MenuItem value="Assistant Head Teacher">Assistant Head Teacher</MenuItem>
              <MenuItem value="Subject Teacher">Subject Teacher</MenuItem>
              <MenuItem value="Language Teacher">Language Teacher</MenuItem>
              <MenuItem value="Physical Education Teacher">Physical Education Teacher</MenuItem>
              <MenuItem value="Librarian">Librarian</MenuItem>
              <MenuItem value="Special Education Teacher">Special Education Teacher</MenuItem>
              <MenuItem value="Counselor">Counselor</MenuItem>
            </TextField>}

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

      />

      <UserData />

    </div>
  );
}
