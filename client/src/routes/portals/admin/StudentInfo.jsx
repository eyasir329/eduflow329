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
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../../../redux/user/userSlice";
import StudentTable from "./StudentTable";

const theme = createTheme();

function createStudentId(batch, mid, lastId) {
  const currentYear = new Date().getFullYear().toString();
  const idPrefix = `${currentYear}${batch}`;
  const previousId = parseInt(lastId, 10) + 1;
  return idPrefix + mid + previousId.toString().padStart(3, "0");
}

export default function StudentInfo() {
  const { currentUser } = useSelector((state) => state.user);
  const [studentId, setStudentId] = useState(null);
  const [parentId, setParentId] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [image, setImage] = useState(undefined);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [gender, setGender] = useState(""); // Added state for gender
  const [enrollClass, setEnrollClass] = useState("");

  const dispatch = useDispatch();
  const fileRef = useRef(null);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

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

  const handleGenerateStudentId = () => {
    const newStudentId = createStudentId("04", "1", "000");
    const newParentId = createStudentId("04", "2", "000");
    setStudentId(newStudentId);
    setParentId(newParentId);
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

    } catch (error) {
      
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
              value={studentId}
              fullWidth
              required
              sx={{ mb: 4 }}
            />
            <TextField
              type="text"
              variant="outlined"
              label="Unique Pareny ID"
              InputLabelProps={{ shrink: true }}
              color="secondary"
              value={parentId}
              fullWidth
              required
              sx={{ mb: 4 }}
            />
            </Stack>
            

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
            {/* Gender selection */}
            <FormControl variant="outlined" fullWidth sx={{ mb: 4 }}>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                label="Gender"
                required
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            {/* Additional fields */}
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Father's Name"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              fullWidth
              required
              sx={{ mb: 4 }}
            />
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Mother's Name"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              fullWidth
              required
              sx={{ mb: 4 }}
            />
            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="Guardian's Name"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
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
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                type="date"
                variant="outlined"
                color="secondary"
                label="Date Of Birth"
                InputLabelProps={{ shrink: true }}
                onChange={(e) => setDateOfBirth(e.target.value)}
                value={dateOfBirth}
                fullWidth
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
              />
            </Stack>

            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                label="City"
                type="text"
                variant="outlined"
                color="secondary"
                onChange={(e) => setCity(e.target.value)}
                value={city}
                fullWidth
                margin="normal"
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="inputStateLabel">State</InputLabel>
                <Select
                  labelId="inputStateLabel"
                  id="inputState"
                  variant="outlined"
                  color="secondary"
                  onChange={(e) => setState(e.target.value)}
                  value={state}
                >
                  <MenuItem value="" disabled>
                    Select...
                  </MenuItem>
                  <MenuItem value="option1">Option 1</MenuItem>
                  <MenuItem value="option2">Option 2</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Zip"
                type="text"
                variant="outlined"
                color="secondary"
                onChange={(e) => setZip(e.target.value)}
                value={zip}
                fullWidth
                margin="normal"
              />
            </Stack>

            <TextField
              label="Street Address"
              type="text"
              variant="outlined"
              color="secondary"
              onChange={(e) => setStreetAddress(e.target.value)}
              value={streetAddress}
              fullWidth
              sx={{ mb: 4 }}
            />

            <TextField
              label="Enroll Class"
              type="text"
              variant="outlined"
              color="secondary"
              onChange={(e) => setEnrollClass(e.target.value)}
              value={enrollClass}
              fullWidth
              sx={{ mb: 4 }}
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
            <button>Update Student Information</button>
          </div>
          <ThemeProvider theme={theme}>
            <StudentTable />
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}
