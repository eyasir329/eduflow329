import React, { useState } from "react";
import {
  TextField,
  Button,
  Stack,
  Typography,
  Paper,
  createTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../../../redux/user/userSlice";
import AcademicTable from "./AcademicTable";
import { ThemeProvider } from "@emotion/react";

const theme = createTheme();

export default function AcademicInfo() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [classId, setClassId] = useState("");
  const [className, setClassName] = useState("");
  const [session, setSession] = useState("");
  const [classTeacherId, setClassTeacherId] = useState("");
  const [classCaptainId, setClassCaptainId] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      classId,
      className,
      session,
      classTeacherId,
      classCaptainId,
    };
    try {
      dispatch(updateUserStart());

      const res = await fetch(`http://localhost:5000/api/guest/update/${currentUser._id}`, {
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
    } catch (error) {
      dispatch(updateUserFailure("An unexpected error occurred"));
    }
  };

  return (
    <div className="teacher-info">
      <div className="create-teacher">
        <Paper sx={{ width: '100%', overflow: 'hidden', padding: '10px 15px', backgroundColor: '#ffffff66', mb: 4 }}>
          <form onSubmit={handleSubmit} action={<Link to="/login" />}>
            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                type="text"
                variant="outlined"
                label="Class ID"
                InputLabelProps={{ shrink: true }}
                color="secondary"
                fullWidth
                required
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
              />
              <TextField
                type="text"
                variant="outlined"
                label="Class Name"
                InputLabelProps={{ shrink: true }}
                color="secondary"
                fullWidth
                required
                value={className}
                onChange={(e) => setClassName(e.target.value)}
              />
            </Stack>

            <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
              <TextField
                type="text"
                variant="outlined"
                label="Session"
                InputLabelProps={{ shrink: true }}
                color="secondary"
                fullWidth
                required
                value={session}
                onChange={(e) => setSession(e.target.value)}
              />
              <TextField
                type="text"
                variant="outlined"
                label="Class Teacher ID"
                InputLabelProps={{ shrink: true }}
                color="secondary"
                fullWidth
                required
                value={classTeacherId}
                onChange={(e) => setClassTeacherId(e.target.value)}
              />
              <TextField
                type="text"
                variant="outlined"
                label="Class Captain ID"
                InputLabelProps={{ shrink: true }}
                color="secondary"
                fullWidth
                required
                value={classCaptainId}
                onChange={(e) => setClassCaptainId(e.target.value)}
              />
            </Stack>

            <Button variant="outlined" color="secondary" type="submit">
              Register
            </Button>
          </form>
        </Paper>

        <div className="teacher-view-ex">
          <div className="teacher-view">
            <div className="create-teacher-id view-teacher-info">
              <button >
                Update Academic Information
              </button>
            </div>
            <ThemeProvider theme={theme}>

              <AcademicTable />

            </ThemeProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
