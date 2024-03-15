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
} from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ViewSubject() {
    const [subjects, setSubjects] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [subjectFormData, setSubjectFormData] = useState({ subject_id: "", subjectName: "" });

    const fetchSubjects = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/register/viewSubject');
            setSubjects(response.data);

        } catch (error) {
            console.error('Error fetching subjects:', error);
            toast.error('Error fetching subjects. Please try again later.');
        }
    };

    useEffect(() => {
        fetchSubjects();
    }, []);

    const handleUpdate = (subject) => {
        setSubjectFormData({
            subject_id: subject.subject_id,
            subjectName: subject.sub_name
        });
        setOpenDialog(true);
    };

    const handleDialogInputChange = (e) => {
        setSubjectFormData({ ...subjectFormData, [e.target.name]: e.target.value });
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleDialogSubmit = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/register/updateSubject/${subjectFormData.subject_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(subjectFormData)
            });

            if (res.ok) {
                toast.success("Subject updated successfully");
                setOpenDialog(false);
                fetchSubjects();
            } else {
                toast.error("Failed to update subject. Please try again.");
            }
        } catch (error) {
            console.error("Error updating subject:", error);
            toast.error("Error updating subject. Please try again.");
        }
    };

    const handleRefresh = () => {
        fetchSubjects();
    };

    const handleDelete = async (subject) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/register/deleteSubject/${subject.subject_id}`);
            if (response.status === 200) {
                toast.success("Subject deleted successfully");
                fetchSubjects(); // Refresh the subjects list after deletion
            } else {
                toast.error("Failed to delete subject. Please try again.");
            }
        } catch (error) {
            console.error("Error deleting subject:", error);
            toast.error("Error deleting subject. Please try again.");
        }
    };

    return (
        <div className="view-subject">
            <Button variant="outlined" onClick={handleRefresh}>Refresh</Button>
            <>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Subject ID</TableCell>
                                <TableCell>Subject Name</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {subjects.map((subject) => (
                                <TableRow key={subject.subject_id}>
                                    <TableCell>{subject.subject_id}</TableCell>
                                    <TableCell>{subject.sub_name}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            style={{ color: '#416D19', borderColor: '#416D19', marginRight: '8px' }}
                                            onClick={() => handleUpdate(subject)}
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            style={{ color: 'red', borderColor: 'red' }}
                                            onClick={() => handleDelete(subject)}
                                        >
                                            DELETE
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>Update Subject</DialogTitle>
                    <DialogContent>
                        <TextField
                            type="text"
                            label="Subject Name"
                            name="subjectName"
                            value={subjectFormData.subjectName}
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
            </>
            <ToastContainer />
        </div>
    );
}
