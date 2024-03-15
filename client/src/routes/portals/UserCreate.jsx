import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Paper,
  FormControl,
  InputLabel,
  Select
} from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Stack } from "react-bootstrap";
import UserStatus from "./UserStatus";
import { useSelector } from "react-redux";

function createId(department, midId, lastId) {
  const currentYear = new Date().getFullYear().toString();
  const yearLastTwoDigits = currentYear.slice(-2);
  const paddedDepartment = department.toString().padStart(1, '0'); // Change 2 to 1
  const paddedMidId = midId.toString().padStart(2, '0');
  const idPrefix = `${yearLastTwoDigits}${paddedDepartment}`; // Use yearLastTwoDigits
  const previousId = parseInt(lastId, 10) + 1;
  return idPrefix + paddedMidId + previousId.toString().padStart(3, '0');
}



export default function UserCreate() {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser)

  const [lastTeacherId, setLastTeacherId] = useState(null);
  const [lastStaffId, setLastStaffId] = useState(null);
  const [lastStudentId, setLastStudentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [Id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [positionID, setPositionID] = useState("");
  const [academicID, setAcademicID] = useState("");
  const [subjectID, setSubjectID] = useState("");
  const [type, setType] = useState();
  // const [teacherInfo, setTeacherInfo] = useState("");

  const [academicMenuItems, setAcademicMenuItems] = useState([]);
  const [subjectMenuItems, setSubjectMenuItems] = useState([]);
  const [positionMenuItems, setPositionMenuItems] = useState([]);

  console.log(lastStudentId)

  const fetchData = async () => {
    try {
      const [teacherResponse, staffResponse, studentResponse, academicResponse, subjectResponse, positionResponse] = await Promise.all([
        axios.get('http://localhost:5000/api/admin/lastTeacherId'),
        axios.get('http://localhost:5000/api/admin/lastStaffId'),
        axios.get('http://localhost:5000/api/admin/lastStudentId'),
        axios.get('http://localhost:5000/api/admin/viewAcademicData'),
        axios.get('http://localhost:5000/api/admin/viewSubjectData'),
        axios.get('http://localhost:5000/api/admin/viewPositionMin')
      ]);

      console.log(staffResponse)

      setLastTeacherId(teacherResponse.data.lastThreeDigits);
      setLastStaffId(staffResponse.data.lastThreeDigits);
      setLastStudentId(studentResponse.data.lastThreeDigits);
      setAcademicMenuItems(mapToMenuItems(academicResponse.data.positions, 'class_name', 'class_id'));
      setSubjectMenuItems(mapToMenuItems(subjectResponse.data.subjects, 'sub_name', 'subject_id'));
      setPositionMenuItems(mapToMenuItems(positionResponse.data.positions, 'position_name', 'position_id'));

      setLoading(false);

    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again later.');
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const mapToMenuItems = (data, labelKey, valueKey) => {
    if (Array.isArray(data)) {
      return data.map(item => (
        <MenuItem key={item[valueKey]} value={item[valueKey]}>
          {item[labelKey]}
        </MenuItem>
      ));
    } else {
      console.error('Data received is not an array:', data);
      return [];
    }
  };

  const handleGenerateId = () => {
    let newId = "";

    if (type === "Teacher") {
      newId = createId(1, subjectID, lastTeacherId);
    } else if (type === "Staff") {
      newId = createId(0, positionID, lastStaffId);
    } else if (type === "Student") {
      newId = createId(2, academicID, lastStudentId);
    }

    setId(newId);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Prepare the data to be sent to the backend API
    let typeOption;
    if (type === 'Staff') {
      typeOption = positionID;
    } else if (type === 'Teacher') {
      typeOption = positionID;
    }

    const postData = {
      type,
      Id,
      email,
      typeOption,
      subjectID,
      academicID
    };

    let endpoint;
    if (currentUser.type === 'staff') {
      endpoint = currentUser.position;
    } else if (currentUser.type === 'teacher') {
      endpoint = 'teacher';
    } else {
      // Handle other types if needed
      return;
    }

    // Send the data to your backend API using Axios
    try {
      console.log(postData)
      const response = await axios.post(`http://localhost:5000/api/${endpoint}/create${type.charAt(0).toUpperCase()}${type.slice(1)}Credential`, postData);

      // Handle successful response if needed
      toast(response.data.message);
      console.log('Response:', response.data);
      fetchData();
    } catch (error) {
      console.error("Error:", error);
      toast(error.message);
      // setTeacherInfo(error.message);
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
                {(currentUser.type === "staff" && currentUser.position === "admin") && <MenuItem value="Staff">Staff</MenuItem>}
                {(currentUser.type === "staff" && currentUser.position === "register") && <MenuItem value="Teacher">Teacher</MenuItem>}
                {currentUser.type === "teacher" && <MenuItem value="Student">student</MenuItem>}
              </TextField>


              {type === "Teacher" && (
                <>
                  <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                    <TextField
                      select
                      variant="outlined"
                      color="secondary"
                      label="Subject ID"
                      onChange={(e) => {
                        setSubjectID(e.target.value);
                      }}
                      value={subjectID}
                      sx={{ mb: 4 }}
                      required
                    >
                      {subjectMenuItems}
                    </TextField>
                    <TextField
                      select
                      variant="outlined"
                      color="secondary"
                      label="Position"
                      onChange={(e) => {
                        setPositionID(e.target.value);
                      }}
                      value={positionID}
                      sx={{ mb: 4 }}
                    >
                      {positionMenuItems}
                    </TextField>
                  </Stack>
                </>
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
                  {positionMenuItems} {/* Render position menu items */}
                </TextField>
              )}

              {(type === "Student") && (
                <TextField
                  select
                  variant="outlined"
                  color="secondary"
                  label="Enroll Class"
                  onChange={(e) => {
                    setPositionID("");
                    setSubjectID("");
                    setAcademicID(e.target.value);
                  }}
                  value={academicID}
                  sx={{ mb: 4 }}
                >
                  {academicMenuItems}
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
          {/* <p className="reg-error">
            {teacherInfo}
          </p> */}
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
      <ToastContainer />
    </div>
  );
}
