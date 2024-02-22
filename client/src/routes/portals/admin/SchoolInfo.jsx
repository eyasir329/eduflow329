import React, { useEffect, useState } from "react";
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
import Image from "../../../components/functionality/Image";
import PrincipalInfo from "./PrincipalInfo";
import NoticeBoard from "./NoticeBoard";
import axios from "axios";

const divisions = ["Barishal", "Chattogram", "Dhaka", "Khulna", "Mymensingh", "Rajshahi", "Rangpur", "Sylhet"];
const divisionMenuItems = divisions.map((division, index) => (
  <MenuItem key={index} value={division}>{division}</MenuItem>
));

export default function SchoolInfo() {

  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/schoolView')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch school information');
        }
        return response.json();
      })
      .then(data => {
        setFormData(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  const [uploadDisabled, setUploadDisabled] = useState(false);
  const [schoolInfo, setSchoolInfo] = useState("");

  const handleUploadSuccess = (downloadURL) => {
    setFormData({ ...formData, logo: downloadURL });
    setUploadDisabled(true);
  };

  const handleUploadError = (error) => {
    console.error('Image upload error:', error);
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/admin/schoolCreateOrUpdate", formData);

      const data = await response.data;
      setSchoolInfo(data.message);

    } catch (error) {
      setSchoolInfo(error.message);
    }
  }

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
          <form onSubmit={handleCreateOrUpdate}>
            <div className="imageSchool">
              <Image
                onUploadSuccess={handleUploadSuccess}
                onUploadError={handleUploadError}
                defaultValue={formData.logo}
                disabled={uploadDisabled}
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
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              value={formData.phone || ""}
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

                  {divisionMenuItems}

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
            InputLabelProps={{ shrink: true }}
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
          <p className="reg-error">
            {schoolInfo}
          </p>
        </Paper>

        <h1>Principal Information</h1>
        <PrincipalInfo />

        <h1>Notice Board</h1>
        <NoticeBoard />
      </div>
    </div>
  );
}
