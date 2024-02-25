import React, { useEffect, useRef, useState } from "react";
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
import { Link } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../../firebase";
import { useDispatch, useSelector } from "react-redux";

import StudentTable from "./StudentTable";

const theme = createTheme();

const divisions = [
  "Barishal",
  "Chattogram",
  "Dhaka",
  "Khulna",
  "Mymensingh",
  "Rajshahi",
  "Rangpur",
  "Sylhet",
];
const divisionMenuItems = divisions.map((division, index) => (
  <MenuItem key={index} value={division}>
    {division}
  </MenuItem>
));

function createStudentId(department, midId, lastId) {
  const currentYear = new Date().getFullYear().toString();
  const idPrefix = `${currentYear}${department}`;
  const previousId = parseInt(lastId, 10) + 1;
  return idPrefix + midId + previousId.toString().padStart(3, '0');
}

export default function CreateStudent() {
  const { currentUser } = useSelector((state) => state.user);
  const [studentId, setStudentId] = useState(null);
  const [parentId, setParentId] = useState(null);
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [createMessage, setCreateMessage] = useState();
  const [lastThreeDigit, setLastThreeDigit] = useState("000");

  const dispatch = useDispatch();
  const fileRef = useRef(null);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getDate() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        console.error("Error during image upload:", error);
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };

  const fetchData = () => {
    fetch('http://localhost:5000/api/admin/lastStudentId')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch teacher information');
        }
        return response.json();
      })
      .then(data => {
        console.log(data)
        if (data.lastStudentId) {
          console.log(data.lastStudentId)
          setLastThreeDigit(String(data.lastStudentId).slice(-3));
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

  const handleGenerateStudentId = () => {
    const newStudentId = createStudentId("04", "1", lastThreeDigit);
    const newParentId = createStudentId("04", "2", lastThreeDigit);

    setStudentId(newStudentId);
    setParentId(newParentId);
    setFormData((prevFormData) => ({
      ...prevFormData,
      studentId: newStudentId,
      parentId: newParentId,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/admin/createStudent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setCreateMessage(data.message);
      console.log(data)
    } catch (error) {
      console.error("Error submitting form:", error);
    }
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
          <form onSubmit={handleSubmit} action={<Link to="/login" />}>
            <input
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <img
              src={formData.profilePicture || currentUser.profilePicture}
              alt="profile"
              className="circle-img"
              onClick={() => fileRef.current.click()}
            />
            <p className="image-below">
              {imageError ? (
                <span>Error uploading image (filesize must be less than 2 MB)</span>
              ) : (
                imagePercent > 0 && imagePercent < 100 ? (
                  <span>{`Uploading: ${imagePercent} %`}</span>
                ) : imagePercent === 100 ? (
                  <span>Image uploaded successfully</span>
                ) : (
                  ""
                )
              )}
            </p>

            <div className="create-teacher-id">
              <button onClick={handleGenerateStudentId}>
                Create a Unique ID
              </button>
            </div>

            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                type="text"
                variant="outlined"
                label="Unique Student ID"
                InputLabelProps={{ shrink: true }}
                color="secondary"
                name="studentId"
                value={formData.studentId || ""}
                fullWidth
                required
                sx={{ mb: 4 }}
                onChange={handleChange}
              />
              <TextField
                type="text"
                variant="outlined"
                label="Unique Parent ID"
                InputLabelProps={{ shrink: true }}
                color="secondary"
                name="parentId"
                value={formData.parentId || ""}
                fullWidth
                required
                sx={{ mb: 4 }}
                onChange={handleChange}
              />
            </Stack>

            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="First Name"
                name="firstName"
                value={formData.firstName || ""}
                fullWidth
                required
                onChange={handleChange}
              />
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="Last Name"
                name="lastName"
                value={formData.lastName || ""}
                fullWidth
                required
                onChange={handleChange}
              />
              <TextField
                select
                variant="outlined"
                color="secondary"
                label="Gender"
                name="gender"
                value={formData.gender || ""}
                fullWidth
                required
                onChange={handleChange}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>

            </Stack>

            {/* Add other form fields similarly */}
            {/* Father's Name */}
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Father's Name"
              name="fatherName"
              value={formData.fatherName || ""}
              fullWidth
              sx={{ mb: 4 }}
              onChange={handleChange}
            />
            {/* Mother's Name */}
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Mother's Name"
              name="motherName"
              value={formData.motherName || ""}
              fullWidth
              sx={{ mb: 4 }}
              onChange={handleChange}
            />
            {/* Guardian's Name */}
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Guardian's Name"
              name="guardianName"
              value={formData.guardianName || ""}
              fullWidth
              sx={{ mb: 4 }}
              onChange={handleChange}
            />
            {/* Email */}
            <TextField
              type="email"
              variant="outlined"
              color="secondary"
              label="Email"
              name="email"
              value={formData.email || ""}
              fullWidth
              required
              sx={{ mb: 4 }}
              onChange={handleChange}
            />
            {/* Phone Number */}
            <TextField
              type="tel"
              variant="outlined"
              color="secondary"
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber || ""}
              fullWidth
              required
              sx={{ mb: 4 }}
              onChange={handleChange}
            />
            {/* Date Of Birth */}
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                type="date"
                variant="outlined"
                color="secondary"
                label="Date Of Birth"
                InputLabelProps={{ shrink: true }}
                name="dateOfBirth"
                value={formData.dateOfBirth || ""}
                fullWidth
                sx={{ mb: 4 }}
                onChange={handleChange}
              />
              {/* Joining Date */}
              <TextField
                type="date"
                variant="outlined"
                color="secondary"
                label="Enroll Date"
                InputLabelProps={{ shrink: true }}
                name="joiningDate"
                value={formData.joiningDate || ""}
                fullWidth
                onChange={handleChange}
              />
            </Stack>

            {/* City, State, Zip */}
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                label="City"
                type="text"
                variant="outlined"
                color="secondary"
                name="city"
                value={formData.city || ""}
                fullWidth
                margin="normal"
                onChange={handleChange}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="inputStateLabel">State</InputLabel>
                <Select
                  labelId="inputStateLabel"
                  id="inputState"
                  variant="outlined"
                  color="secondary"
                  name="state"
                  value={formData.state || ""}
                  onChange={handleChange}
                >
                  {divisionMenuItems}
                </Select>
              </FormControl>
              <TextField
                label="Zip"
                type="text"
                variant="outlined"
                color="secondary"
                name="zip"
                value={formData.zip || ""}
                fullWidth
                margin="normal"
                onChange={handleChange}
              />
            </Stack>

            {/* Street Address */}
            <TextField
              label="Street Address"
              type="text"
              variant="outlined"
              color="secondary"
              name="streetAddress"
              value={formData.streetAddress || ""}
              fullWidth
              sx={{ mb: 4 }}
              onChange={handleChange}
            />

            {/* Enroll Class */}
            <TextField
              label="Enroll Class"
              type="text"
              variant="outlined"
              color="secondary"
              name="enrollClass"
              value={formData.enrollClass || ""}
              fullWidth
              sx={{ mb: 4 }}
              onChange={handleChange}
            />

            <Button variant="outlined" color="secondary" type="submit">
              Register
            </Button>
          </form>
          <p className="reg-error">
            {createMessage}
          </p>
        </Paper>
      </div>
    </div>
  );
}
