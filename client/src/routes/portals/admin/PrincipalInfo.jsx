import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Stack,
  Paper,
} from "@mui/material";

import { useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure
} from "../../../redux/user/userSlice";

export default function PrincipalInfo() {
  const [formData, setFormData] = useState({
    teacherid: "2020050100",
    joiningDate: "",
    endingDate: "",
    speech: ""
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/viewPrincipal')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          const { teacher_id, joining_date, ending_date, principal_speech } = data.principal;
          setFormData({
            teacherid: teacher_id,
            joiningDate: joining_date,
            endingDate: ending_date,
            speech: principal_speech
          });
        } else {
          console.error(data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching principal data:', error);
      });
  }, []);

  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/admin/createOrUpdatePrincipal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          joiningDate: formData.joiningDate,
          endingDate: formData.endingDate
        }),
      });
      const data = await res.json();
    } catch (error) {
      dispatch(updateUserFailure("An unexpected error occurred"));
    }
  };

  const handleDateChange = (e, fieldName) => {
    const updatedFormData = {
      ...formData,
      [fieldName]: e.target.value
    };
    setFormData(updatedFormData);
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
              type="text"
              variant="outlined"
              color="secondary"
              label="Teacher ID"
              onChange={(e) => setFormData({ ...formData, teacherid: e.target.value })}
              value={formData.teacherid}
              fullWidth
              required
              sx={{ mb: 4 }}
            />
            <TextField
              multiline
              rows={10}
              variant="outlined"
              color="secondary"
              label="Principal Speech"
              placeholder="Principal speech"
              onChange={(e) => setFormData({ ...formData, speech: e.target.value })}
              value={formData.speech}
              fullWidth
              required
              sx={{ mb: 4 }}
            />
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                type="text"
                variant="outlined"
                color="secondary"
                label="Joining Date"
                InputLabelProps={{ shrink: true }}
                onChange={(e) => handleDateChange(e, "joiningDate")}
                value={formData.joiningDate}
                fullWidth
                required
              />
              <TextField
                type="text" 
                variant="outlined"
                color="secondary"
                label="Ending Date"
                InputLabelProps={{ shrink: true }}
                onChange={(e) => handleDateChange(e, "endingDate")}
                value={formData.endingDate}
                fullWidth
                required
              />
            </Stack>
            {updateSuccess && <p style={{ color: "green" }}>Update successful!</p>}
            <Button variant="outlined" color="secondary" type="submit">
              Update
            </Button>
          </form>
        </Paper>
      </div>
    </div>
  );
}
