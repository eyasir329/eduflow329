import React, { useState } from "react";
import {
    TextField,
    Button,
    Stack,
    Paper,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TablePagination,
} from "@mui/material";

export default function NoticeBoard() {
    const [formData, setFormData] = useState({
        title: "",
        link: "",
    });

    const [notices, setNotices] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title.trim() || !formData.link.trim()) return;
        setNotices([...notices, formData]);
        setFormData({ title: "", link: "" });
    };

    const handleDelete = (index) => {
        const updatedNotices = [...notices];
        updatedNotices.splice(index, 1);
        setNotices(updatedNotices);
    };

    const handleUpdate = (index) => {
        const updatedNotices = [...notices];
        setFormData(updatedNotices[index]);
        updatedNotices.splice(index, 1);
        setNotices(updatedNotices);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
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
                    <Stack spacing={2} sx={{ marginBottom: 2 }}>
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
                            required
                        />
                        <Button variant="outlined" color="secondary" type="submit">
                            Create Notice
                        </Button>
                    </Stack>
                </form>

                <div className="notice-table">
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontSize: '18px', textAlign: 'center' }}>Title</TableCell>
                                    <TableCell style={{ fontSize: '18px', textAlign: 'center' }}>Link</TableCell>
                                    <TableCell style={{ fontSize: '18px', textAlign: 'center' }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {notices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((notice, index) => (
                                    <TableRow key={index}>
                                        <TableCell style={{ fontSize: '18px', textAlign: 'center' }}>{notice.title}</TableCell>
                                        <TableCell style={{ fontSize: '18px', textAlign: 'center' }}>
                                            <a href={notice.link} style={{ textDecoration: 'none' }}>{notice.link}</a>
                                        </TableCell>
                                        <TableCell style={{ fontSize: '18px', textAlign: 'center' }}>
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
        </div>
    );
}
