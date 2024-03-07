import React, { useState, useEffect } from "react";
import {
    TextField,
    Button,
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
    MenuItem,
    Select,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from "@mui/material";

export default function NoticeBoard() {
    const [formData, setFormData] = useState({
        title: "",
        link: "",
        text_message: "",
        category: "academic", // Set default value to "academic"
    });
    const [notices, setNotices] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [messageExtra, setMessageExtra] = useState("");
    const [updateMessage, setUpdateMessage] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedNoticeIndex, setSelectedNoticeIndex] = useState(null);
    const [dialogFormData, setDialogFormData] = useState({
        title: "",
        link: "",
        text_message: "",
        category: "academic"
    });
    const [selectedCategory, setSelectedCategory] = useState("academic");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:5000/api/admin/createNotice`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            setMessageExtra(data.message);

            // Refresh notices after submission
            fetchNotices();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const fetchNotices = async () => {
        try {
            setMessageExtra(""); // Clear any previous message
            const noticesRes = await fetch('http://localhost:5000/api/admin/viewNotices');
            const noticesData = await noticesRes.json();
            setNotices(noticesData.notices); // Update notices state with fetched data
        } catch (error) {
            console.error('Error fetching notices:', error);
            setMessageExtra("Error fetching notices. Please try again."); // Set error message if fetch fails
        }
    };

    useEffect(() => {
        fetchNotices();
    }, []); // Fetch notices on component mount

    const handleDelete = async (index) => {
        try {
            const noticeId = notices[index].notice_id;
            await fetch(`http://localhost:5000/api/admin/notices/${noticeId}`, {
                method: "DELETE",
                credentials: 'include',
            });

            // Fetch notices again to refresh the list after deletion
            await fetchNotices();

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleUpdate = (index) => {
        setSelectedNoticeIndex(index); // Set the index of the selected notice
        setDialogFormData(notices[index]); // Populate the dialog form data with the selected notice

        setOpenDialog(true); // Open the dialog
    };

    const handleCloseDialog = () => {
        setOpenDialog(false); // Close the dialog
        setSelectedNoticeIndex(null); // Clear the selected notice index
    };

    const handleDialogInputChange = (e) => {
        const { name, value } = e.target;
        setDialogFormData({ ...dialogFormData, [name]: value });
    };

    const handleDialogSubmit = async () => {
        try {
            console.log(dialogFormData)
            const res = await fetch(`http://localhost:5000/api/admin/notices/${notices[selectedNoticeIndex].notice_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(dialogFormData),
            });

            const data = await res.json();

            setUpdateMessage(data.message);
            console.log(data)

            // Close the dialog and refresh notices after update
            setOpenDialog(false);
            setSelectedNoticeIndex(null);
            fetchNotices();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    return (
        <div>
            <Paper
                sx={{
                    width: "100%",
                    overflow: "hidden",
                    padding: "10px 15px",
                    backgroundColor: "#ffffff66",
                    marginBottom: 4,
                }}
            >
                <form onSubmit={handleSubmit}>
                    <Select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        sx={{ mb: 4 }}
                    >
                        <MenuItem value="">All Categories</MenuItem>
                        <MenuItem value="academic">Academic</MenuItem>
                        <MenuItem value="exam">Exam</MenuItem>
                        <MenuItem value="administration">Administration</MenuItem>
                    </Select>
                    <TextField
                        type="text"
                        variant="outlined"
                        color="secondary"
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        fullWidth
                        required
                        sx={{ mb: 4 }}
                    />
                    <TextField
                        type="text"
                        variant="outlined"
                        color="secondary"
                        label="Link"
                        name="link"
                        value={formData.link}
                        onChange={handleInputChange}
                        fullWidth
                        sx={{ mb: 4 }}
                    />
                    <TextField
                        multiline
                        rows={4}
                        variant="outlined"
                        color="secondary"
                        label="Text Message"
                        name="text_message"
                        value={formData.text_message}
                        onChange={handleInputChange}
                        fullWidth
                        required
                        sx={{ mb: 4 }}
                    />

                    <Button variant="outlined" color="secondary" type="submit">
                        Submit
                    </Button>
                    {/* <Button variant="outlined" color="secondary" onClick={fetchNotices}>
                        Refresh Notices
                    </Button> */}
                    <div className="reg-error" style={{ marginTop: 10 }}>
                        {messageExtra && <p>{messageExtra}</p>}
                    </div>
                </form>

                <div className="notice-table">
                    <div>
                        <Select
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            sx={{ mb: 4 }}
                        >
                            <MenuItem value="academic">Academic</MenuItem>
                            <MenuItem value="exam">Exam</MenuItem>
                            <MenuItem value="administration">Administration</MenuItem>
                        </Select>
                    </div>

                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Link</TableCell>
                                    <TableCell>Created At</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {notices
                                    .filter(notice => selectedCategory === "" || notice.category === selectedCategory)
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((notice, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{notice.title}</TableCell>
                                            <TableCell><a href={notice.link}>{notice.link}</a></TableCell>
                                            <TableCell>{notice.created_at}</TableCell>
                                            <TableCell>
                                                <Button variant="outlined" color="primary" onClick={() => handleUpdate(index)}>Update</Button>
                                                <Button variant="outlined" color="error" onClick={() => handleDelete(index)}>Delete</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={notices.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
                
            </Paper>


            {/* Dialog for updating notices */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Update Notice</DialogTitle>
                <DialogContent>
                    <Select
                        value={dialogFormData.category}
                        onChange={handleDialogInputChange}
                        name="category"
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        required
                        sx={{ mb: 4 }}
                    >
                        <MenuItem value="academic">Academic</MenuItem>
                        <MenuItem value="exam">Exam</MenuItem>
                        <MenuItem value="administration">Administration</MenuItem>
                    </Select>
                    <TextField
                        type="text"
                        variant="outlined"
                        color="secondary"
                        label="Title"
                        name="title"
                        value={dialogFormData.title}
                        onChange={handleDialogInputChange}
                        fullWidth
                        required
                        sx={{ mb: 4 }}
                    />
                    <TextField
                        type="text"
                        variant="outlined"
                        color="secondary"
                        label="Link"
                        name="link"
                        value={dialogFormData.link}
                        onChange={handleDialogInputChange}
                        fullWidth
                        sx={{ mb: 4 }}
                    />
                    <TextField
                        multiline
                        rows={4}
                        variant="outlined"
                        color="secondary"
                        label="Text Message"
                        name="text_message"
                        value={dialogFormData.text_message}
                        onChange={handleDialogInputChange}
                        fullWidth
                        required
                        sx={{ mb: 4 }}
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
        </div>
    );
}
