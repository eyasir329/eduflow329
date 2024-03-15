import React, { useState } from "react";
import {
    TextField,
    Button,
    Stack,
    Paper,
} from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewSubject from "./ViewSubject";

export default function CreateSubject() {
    const [subjectName, setSubjectName] = useState("");

    const handleCreatePosition = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        try {
            const formData = {
                subjectName: subjectName
            };
            const res = await fetch(`http://localhost:5000/api/register/createSubject`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            toast.success("Subject created successfully");
            setSubjectName("");
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Error creating subject. Please try again.");
        }
    };

    return (
        <div className="position-details">
            <div className="create-teacher">
                <Paper elevation={2} sx={{
                    width: '100%',
                    overflow: 'hidden',
                    padding: '10px 15px',
                    backgroundColor: '#ffffff66',
                    mb: 4,
                }}>
                    <Stack spacing={2}>
                        <TextField
                            label="Subject Name"
                            variant="outlined"
                            value={subjectName}
                            onChange={(e) => setSubjectName(e.target.value)}
                        />
                        <Button variant="contained" onClick={handleCreatePosition}>
                            Create Subject
                        </Button>
                    </Stack>
                </Paper>
            </div>

            <div style={{ marginTop: 50 }}>
                <ViewSubject />
            </div>
            <ToastContainer />
        </div>
    );
}
