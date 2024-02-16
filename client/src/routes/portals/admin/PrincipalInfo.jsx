import React, { useState } from "react";
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
    joiningDate: "2020-12-10",
    endingDate: "2024-12-10", 
    speech: "lorem200word"
  });

  const [updateSuccess, setUpdateSuccess] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`http://localhost:5000/api/admin/update/school`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
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

  const handleDateChange = (e, fieldName) => {
    setFormData({ ...formData, [fieldName]: e.target.value });
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
                type="date"
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
                type="date"
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
