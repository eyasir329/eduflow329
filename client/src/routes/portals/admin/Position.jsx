import React, { useState } from "react";
import {
    TextField,
    Button,
    Stack,
    Paper,
} from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewPosition from "./ViewPosition";

export default function CreatePosition() {
    const [positionName, setPositionName] = useState("");
    const [salary, setSalary] = useState("");

    const handleCreatePosition = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        try {
            const formData = {
                positionName: positionName,
                salary: salary
            };
            const res = await fetch(`http://localhost:5000/api/admin/createPosition`, {
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
            toast("Creating position:", { data });
            setPositionName("");
            setSalary("");
        } catch (error) {
            console.error("Error submitting form:", error);
            toast("Error submitting form:", error);
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
                            label="Position Name"
                            variant="outlined"
                            value={positionName}
                            onChange={(e) => setPositionName(e.target.value)}
                        />
                        <TextField
                            label="Salary"
                            variant="outlined"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                        />
                        <Button variant="contained" onClick={handleCreatePosition}>
                            Create Position
                        </Button>
                    </Stack>
                </Paper>
                {/* {error && <p style={{ color: 'red' }}>{error}</p>}
                {message && <p style={{ color: 'green' }}>{message}</p>} */}
            </div>

            <div style={{ marginTop: 50 }}>
                <ViewPosition />
            </div>
            <ToastContainer />
        </div>
    );
}
