import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    CircularProgress,
} from "@mui/material";

export default function ViewPosition() {
    const [positions, setPositions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [positionFormData, setPositionFormData] = useState({ position_id: "", positionName: "", salary: "" });
    const [updateMessage, setUpdateMessage] = useState("");

    const fetchPositions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/viewPosition');
            setPositions(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching positions:', error);
            setError('Error fetching positions. Please try again later.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPositions();
    }, []);

    const handleUpdate = (position) => {
        setPositionFormData({
            position_id: position.position_id,
            positionName: position.position_name,
            salary: position.salary
        });
        setOpenDialog(true);
    };

    const handleDialogInputChange = (e) => {
        setPositionFormData({ ...positionFormData, [e.target.name]: e.target.value });
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleDialogSubmit = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/admin/updatePosition/${positionFormData.position_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(positionFormData)
            });

            if (res.ok) {
                setUpdateMessage("Position updated successfully");
                setOpenDialog(false);
                fetchPositions();
            } else {
                const errorMessage = `HTTP error! status: ${res.status}`;
                console.error("Error updating position:", errorMessage);
                setUpdateMessage("Failed to update position. Please try again.");
            }
        } catch (error) {
            console.error("Error updating position:", error);
            setUpdateMessage("Failed to update position. Please try again.");
        }

    };

    const handleRefresh = () => {
        // Fetch positions again when refresh button is clicked
        fetchPositions();
        setUpdateMessage();
    };

    return (
        <div className="view-position">
            <Button variant="outlined" onClick={handleRefresh}>Refresh</Button>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Position ID</TableCell>
                                    <TableCell>Position Name</TableCell>
                                    <TableCell>Salary</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {positions.map((position) => (
                                    <TableRow key={position.position_id}>
                                        <TableCell>{position.position_id}</TableCell>
                                        <TableCell>{position.position_name}</TableCell>
                                        <TableCell>{position.salary}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                style={{ color: '#416D19', borderColor: '#416D19' }}
                                                onClick={() => handleUpdate(position)}
                                            >
                                                Update
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Dialog open={openDialog} onClose={handleCloseDialog}>
                        <DialogTitle>Update Position</DialogTitle>
                        <DialogContent>
                            <TextField
                                type="text"
                                label="Position Name"
                                name="positionName"
                                value={positionFormData.positionName}
                                onChange={handleDialogInputChange}
                                fullWidth
                                required
                            />
                            <TextField
                                type="text"
                                label="Salary"
                                name="salary"
                                value={positionFormData.salary}
                                onChange={handleDialogInputChange}
                                fullWidth
                                required
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleDialogSubmit} color="primary">
                                Update
                            </Button>
                        </DialogActions>
                    </Dialog>

                    <div className="reg-error" style={{ marginTop: 10 }}>
                        {updateMessage && <p>{updateMessage}</p>}
                    </div>
                </>
            )}
        </div>
    );
}
