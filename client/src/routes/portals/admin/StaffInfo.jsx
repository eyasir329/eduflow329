import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import Image from "../../../components/functionality/Image";
import StaffTable from "./StaffTable";

const staffPositions = [
  "Principal",
  "Vice Principal",
  "Administrative Assistant",
  "Accountant",
  "Counselor",
  "Librarian",
  "Nurse",
  "Security Guard",
  "Janitor/Cleaner",
  "IT Technician",
  "Teacher Assistant"
];

const theme = createTheme();

const divisions = ["Barishal", "Chattogram", "Dhaka", "Khulna", "Mymensingh", "Rajshahi", "Rangpur", "Sylhet"];
const divisionMenuItems = divisions.map((division, index) => (
  <MenuItem key={index} value={division}>{division}</MenuItem>
));

function createStaffId(department, lastId) {
  const currentYear = new Date().getFullYear().toString();
  const idPrefix = `${currentYear}${department}`;
  const previousId = parseInt(lastId, 10) + 1;
  return idPrefix + previousId.toString().padStart(3, '0');
}

export default function StaffInfo() {
  const [lastThreeDigit, setLastThreeDigit] = useState("000");
  const [staffId, setStaffId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [profilePicture, setProfilePicture] = useState("https://firebasestorage.googleapis.com/v0/b/school-oauth-49a14.appspot.com/o/587191957.png?alt=media&token=cc55bbb6-293b-40be-9412-091f66115b00");

  const [staffInfo, setStaffInfo] = useState("");

  const fetchData = () => {
    fetch('http://localhost:5000/api/admin/lastStaffId')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch staff information');
        }
        return response.json();
      })
      .then(data => {
        if (data.staffId) {
          setLastThreeDigit(String(data.staffId).slice(-3));
        } else {
          console.log("lastStaffId is not yet available.");
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleGenerateStaffId = () => {
    const newStaffId = createStaffId('00', lastThreeDigit);
    setStaffId(newStaffId);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Format joining date and date of birth to MySQL date format (YYYY-MM-DD)
    const formattedJoiningDate = joiningDate ? new Date(joiningDate).toISOString().split('T')[0] : null;
    const formattedDateOfBirth = dateOfBirth ? new Date(dateOfBirth).toISOString().split('T')[0] : null;

    // Prepare the data to be sent to the backend API
    const data = {
      staffId,
      firstName,
      lastName,
      email,
      dateOfBirth: formattedDateOfBirth,
      phoneNumber,
      joiningDate: formattedJoiningDate,
      position,
      salary,
      facebook,
      linkedin,
      streetAddress,
      city,
      state,
      zip,
      profilePicture,
    };

    // Send the data to your backend API using fetch or axios
    try {
      const response = await fetch("http://localhost:5000/api/admin/createStaff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to register staff");
      }
      const responseData = await response.json();
      console.log(responseData);

      if (responseData.success) {
        fetchData();
      }

      setStaffInfo(responseData.message);

      // Reset the form fields after successful submission
      setStaffId("");
      setFirstName("");
      setLastName("");
      setEmail("");
      setDateOfBirth("");
      setPhoneNumber("");
      setJoiningDate("");
      setPosition("");
      setSalary("");
      setFacebook("");
      setLinkedin("");
      setStreetAddress("");
      setCity("");
      setState("");
      setZip("");
      setProfilePicture("");
      // Handle any success UI feedback
    } catch (error) {
      console.error("Error:", error);
      setStaffInfo(error.message);
    }
  };

  const handleUploadSuccess = (downloadURL) => {
    setProfilePicture(downloadURL);
    console.log(profilePicture)
  };

  const handleUploadError = (error) => {
    console.error('Image upload error:', error);
  };

  const handleChange = (event) => {
    setPosition(event.target.value);
  };

  return (
    <div className="teacher-info">
      <div className="create-teacher">
        {/* <Paper
          sx={{
            width: '100%',
            overflow: 'hidden',
            padding: '10px 15px',
            backgroundColor: '#ffffff66',
            mb: 4,
          }}
        >
          <form onSubmit={handleSubmit}>
            <div className="imageSchool">
              <Image
                onUploadSuccess={handleUploadSuccess}
                onUploadError={handleUploadError}
                defaultValue={profilePicture}
              />
            </div>

            <div className="create-teacher-id">
              <button onClick={handleGenerateStaffId}>
                Create a Unique Staff ID
              </button>
            </div>

            <TextField
              type="text"
              variant="outlined"
              label="Unique Staff ID"
              InputLabelProps={{ shrink: true }}
              color="secondary"
              value={staffId}
              fullWidth
              required
              sx={{ mb: 4 }}
            />

            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                fullWidth
                required
              />
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                fullWidth
                required
              />
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
              type="tel"
              variant="outlined"
              color="secondary"
              label="Phone Number"
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
              fullWidth
              required
              sx={{ mb: 4 }}
            />
            <TextField
              type="date"
              variant="outlined"
              color="secondary"
              label="Date of Birth"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setDateOfBirth(e.target.value)}
              value={dateOfBirth}
              fullWidth
              required
              sx={{ mb: 4 }}
            />
            <TextField
              type="date"
              variant="outlined"
              color="secondary"
              label="Joining Date"
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setJoiningDate(e.target.value)}
              value={joiningDate}
              fullWidth
              required
              sx={{ mb: 4 }}
            />
            <TextField
              select
              label="Position"
              value={position}
              onChange={handleChange}
              variant="outlined"
              color="secondary"
              fullWidth
              required
              sx={{ mb: 4 }}
            >
              {staffPositions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              type="number"
              variant="outlined"
              color="secondary"
              label="Salary"
              onChange={(e) => setSalary(e.target.value)}
              value={salary}
              fullWidth
              required
              sx={{ mb: 4 }}
            />
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Facebook"
              onChange={(e) => setFacebook(e.target.value)}
              value={facebook}
              fullWidth
              sx={{ mb: 4 }}
            />
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Linkedin"
              onChange={(e) => setLinkedin(e.target.value)}
              value={linkedin}
              fullWidth
              sx={{ mb: 4 }}
            />
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="Street Address"
                onChange={(e) => setStreetAddress(e.target.value)}
                value={streetAddress}
                fullWidth
                required
              />
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="City"
                onChange={(e) => setCity(e.target.value)}
                value={city}
                fullWidth
                required
              />
            </Stack>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="State"
                onChange={(e) => setState(e.target.value)}
                value={state}
                fullWidth
                required
              />
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="Zip"
                onChange={(e) => setZip(e.target.value)}
                value={zip}
                fullWidth
                required
              />
            </Stack>
            <Button variant="contained" type="submit" sx={{ backgroundColor: '#4caf50', color: '#fff' }}>
              Add Staff
            </Button>

          </form>
          <div className="reg-error">
            {staffInfo}
          </div>
        </Paper> */}
      </div>
      <StaffTable />
    </div>
  );
}
