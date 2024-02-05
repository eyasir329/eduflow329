import React, { useEffect, useRef, useState } from "react";
import {
  TextField,
  Button,
  Stack,
  FormLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
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
import TeacherTable from "./TeacherTable";

function createTeacherId() {
  const teacherId = Math.floor(Math.random() * 900000000) + 100000000;
  return teacherId.toString();
}

const theme = createTheme();

export default function AttendanceInfo() {
  const { currentUser } = useSelector((state) => state.user);
  const [teacherId, setTeacherId] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
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

  const [image, setImage] = useState(undefined);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);

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
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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

  const handleGenerateTeacherId = () => {
    const newTeacherId = createTeacherId();
    setTeacherId(newTeacherId);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Dispatch the action to update the user
      dispatch(updateUserStart());

      // Make the API call to update the user
      const res = await fetch(`http://localhost:5000/api/guest/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        // Handle errors from the server
        const contentType = res.headers.get("Content-Type");
        if (contentType && contentType.startsWith("application/json")) {
          const errorData = await res.json();
          dispatch(updateUserFailure(errorData.message));
        } else {
          const errorText = await res.text();
          const errorMessageRegex = /Error: (.+?)<br>/;
          const matches = errorText.match(errorMessageRegex);
          if (matches && matches.length > 1) {
            const errorMessage = matches[1];
            dispatch(updateUserFailure(errorMessage));
          } else {
            dispatch(updateUserFailure("An unexpected error occurred"));
          }
        }
        return;
      }

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message || "An unexpected error occurred"));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure("An unexpected error occurred"));
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
          <div className="create-teacher-id">
            <button onClick={handleGenerateTeacherId}>
              Create a Unique Teacher ID
            </button>
            <p className="teacher-id">{teacherId}</p>
          </div>
          <form onSubmit={handleSubmit} action={<Link to="/login" />}>
            <input
              type='file'
              ref={fileRef}
              hidden
              accept='image/*'
              onChange={(e) => setImage(e.target.files[0])}
            />
            <img
              src={formData.profilePicture || currentUser.profilePicture}
              alt='profile'
              className='circle-img'
              onClick={() => fileRef.current.click()}
            />
            <p className='image-below'>
              {imageError ? (
                <span>Error uploading image (filesize must be less than 2 MB)</span>
              ) : (
                imagePercent > 0 && imagePercent < 100 ? (
                  <span>{`Uploading: ${imagePercent} %`}</span>
                ) : imagePercent === 100 ? (
                  <span>Image uploaded successfully</span>
                ) : (
                  ''
                )
              )}
            </p>
            <TextField
              type="text"
              variant="outlined"
              label="Unique User ID"
              InputLabelProps={{ shrink: true }}
              color="secondary"
              value={teacherId}
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
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                type="date"
                variant="outlined"
                color="secondary"
                label="Joining Date"
                InputLabelProps={{ shrink: true }}
                className="no-shrink-label"
                onChange={(e) => setJoiningDate(e.target.value)}
                value={joiningDate}
                fullWidth
              />
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="Position"
                onChange={(e) => setPosition(e.target.value)}
                value={position}
                fullWidth
              />
              <TextField
                type="number"
                variant="outlined"
                color="secondary"
                label="Salary"
                onChange={(e) => setSalary(e.target.value)}
                value={salary}
                fullWidth
              />
            </Stack>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                type="url"
                variant="outlined"
                color="secondary"
                label="Facebook"
                onChange={(e) => setFacebook(e.target.value)}
                value={facebook}
                fullWidth
              />
              <TextField
                type="url"
                variant="outlined"
                color="secondary"
                label="Linkedin"
                onChange={(e) => setLinkedin(e.target.value)}
                value={linkedin}
                fullWidth
              />
            </Stack>
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
              label="Street Address"
              type="text"
              variant="outlined"
              color="secondary"
              onChange={(e) => setStreetAddress(e.target.value)}
              value={streetAddress}
              fullWidth
              sx={{ mb: 4 }}
            />
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
                  <MenuItem value="" disabled>Select...</MenuItem>
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
            <Button variant="outlined" color="secondary" type="submit">
              Register
            </Button>
          </form>
        </Paper>
      </div>

      <div className="teacher-view-ex">
        <div className="teacher-view">
        <div className="create-teacher-id view-teacher-info">
            <button >
              Update Teacher Information
            </button>
          </div>
          <ThemeProvider theme={theme}>
          
            <TeacherTable />
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}