import React, { useState } from "react";
import {
  TextField,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper
} from "@mui/material";

import { useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../../../redux/user/userSlice";
import Image from "../../../components/functionality/Image";
import PrincipalInfo from "./PrincipalInfo";
import NoticeBoard from "./NoticeBoard";

export default function SchoolInfo() {
  const [formData, setFormData] = useState({
    school_logo: "https://img.freepik.com/premium-vector/education-school-logo-design_586739-1335.jpg",
    school_name: "Jamalpur Zilla School",
    eiin_number: "109873",
    established_at: "1881",
    email: "jamzilsch@yahoo.com",
    phone_number: "02997772112",
    facebook: "https://www.facebook.com/jzsonline",
    linkedin: "https://bd.linkedin.com/",
    street_address: "Water Tank, Water Tank Rd, Jamalpur",
    city: "Jamalpur",
    division: "Mymensingh",
    zip: "2000",
    history: "Jamalpur Zilla School has a rich history..."
  });

  console.log(formData)
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Dispatch the action to update the user
      dispatch(updateUserStart());

      // Make the API call to update the user
      const res = await fetch(`http://localhost:5000/api/admin/update/school`, {
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
    } catch (error) {
      dispatch(updateUserFailure("An unexpected error occurred"));
    }
  };

  const handleUploadSuccess = (downloadURL) => {
    setFormData({ ...formData, school_logo: downloadURL });
  };

  const handleUploadError = (error) => {
    console.error('Image upload error:', error);
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
            <div className="imageSchool">
              <Image
                onUploadSuccess={handleUploadSuccess}
                onUploadError={handleUploadError}
                defaultValue={formData.school_logo}
              />
            </div>

            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="School Name"
              onChange={(e) => setFormData({ ...formData, school_name: e.target.value })}
              value={formData.school_name || ""}
              fullWidth
              required
              sx={{ mb: 4 }}
            />

            <TextField
              type="text"
              variant="outlined"
              color="secondary"
              label="EIIN Number"
              onChange={(e) => setFormData({ ...formData, eiin_number: e.target.value })}
              value={formData.eiin_number || ""}
              fullWidth
              required
              sx={{ mb: 4 }}
            />

            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                type="number"
                variant="outlined"
                color="secondary"
                label="Established Year"
                onChange={(e) => setFormData({ ...formData, established_at: e.target.value })}
                value={formData.established_at || ""}
                fullWidth
                required
                sx={{ mb: 4 }}
              />

              <TextField
                type="email"
                variant="outlined"
                color="secondary"
                label="Email"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                value={formData.email || ""}
                fullWidth
                required
                sx={{ mb: 4 }}
              />
            </Stack>

            <TextField
              type="tel"
              variant="outlined"
              color="secondary"
              label="Phone Number"
              onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
              value={formData.phone_number || ""}
              fullWidth
              required
              sx={{ mb: 4 }}
            />

            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                type="url"
                variant="outlined"
                color="secondary"
                label="Facebook"
                onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                value={formData.facebook || ""}
                fullWidth
              />

              <TextField
                type="url"
                variant="outlined"
                color="secondary"
                label="Linkedin"
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                value={formData.linkedin || ""}
                fullWidth
              />
            </Stack>

            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                label="City"
                type="text"
                variant="outlined"
                color="secondary"
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                value={formData.city || ""}
                fullWidth
                margin="normal"
              />

              <FormControl fullWidth margin="normal">
                <InputLabel
                  id="inputDivisionLabel"
                  sx={{ marginTop: '-10px' }}
                >
                  Division
                </InputLabel>
                <Select
                  labelId="inputDivisionLabel"
                  id="inputDivision"
                  variant="outlined"
                  color="secondary"
                  onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                  value={formData.division || "Mymensingh"}
                >
                  <MenuItem value="" disabled>Select...</MenuItem>
                  <MenuItem value="Mymensingh">Mymensingh</MenuItem>
                  <MenuItem value="Option2">Option 2</MenuItem>
                </Select>
              </FormControl>


              <TextField
                label="Zip"
                type="text"
                variant="outlined"
                color="secondary"
                onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                value={formData.zip || ""}
                fullWidth
                margin="normal"
              />
            </Stack>

            <TextField
              label="Street Address"
              type="text"
              variant="outlined"
              color="secondary"
              onChange={(e) => setFormData({ ...formData, street_address: e.target.value })}
              value={formData.street_address || ""}
              fullWidth
              sx={{ mb: 4 }}
            />

            <TextField
              multiline
              rows={10}
              variant="outlined"
              color="secondary"
              label="History"
              placeholder="History"
              onChange={(e) => setFormData({ ...formData, history: e.target.value })}
              value={formData.history}
              fullWidth
              required
              sx={{ mb: 4 }}
            />

            <Button variant="outlined" color="secondary" type="submit">
              Update
            </Button>
          </form>
        </Paper>

        <h1>Principal Information</h1>
        <PrincipalInfo />

        <h1>Notice Board</h1>
        <NoticeBoard />
      </div>
    </div>
  );
}
