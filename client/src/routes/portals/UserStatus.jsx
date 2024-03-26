import React, { useState, useEffect, useRef } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import emailjs from '@emailjs/browser';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function UserStatus() {
    const { currentUser } = useSelector((state) => state.user);

    const columns = [
        { id: 'user_id', label: 'User ID', minWidth: 100 },
        { id: 'user_type', label: 'User Type', minWidth: 50 },
        ...(currentUser.type === 'teacher' ? [] : [{ id: 'position_name', label: 'Position', minWidth: 50 }]),
        { id: 'email', label: 'Email', minWidth: 150 },
        { id: 'status', label: 'Status', minWidth: 50 },
        { id: 'button', label: 'Mail', minWidth: 50 },
        { id: 'created_at', label: 'Created At', minWidth: 200 }
    ];

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [editableData, setEditableData] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialog2, setOpenDialog2] = useState(false);
    const [searchId, setSearchId] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [teacherData, setTeacherData] = useState([]);
    const [updateMessage, setUpdateMessage] = useState("");
    const [deleteMessage, setDeleteMessage] = useState("");

    const form = useRef();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            let fetchUrl;
            if (currentUser.type === 'staff' && currentUser.position === 'admin') {
                fetchUrl = 'http://localhost:5000/api/admin/viewStaffUserStatus';
            } else
                if (currentUser.type === 'staff' && currentUser.position === 'register') {
                    fetchUrl = 'http://localhost:5000/api/register/viewTeacherUserStatus';
                }
                else
                    if (currentUser.type === 'teacher') {
                        fetchUrl = 'http://localhost:5000/api/teacher/viewStudentUserStatus';
                    } else {
                        // Handle other cases if needed
                        return;
                    }

            const response = await fetch(fetchUrl);

            if (!response.ok) {
                throw new Error('Failed to fetch teacher data');
            }
            const data = await response.json();
            console.log(data);

            let filteredData = data; // Declare using let to allow reassignment

            if (currentUser.type === "teacher") {
                filteredData = data.filter(item => item.user_type === 'student' || item.user_type === 'parent');
            } else if (currentUser.type === "staff") {
                if (currentUser.position === "register") {
                    filteredData = data.filter(item => item.user_type === 'teacher');
                }
            }
            console.log(filteredData)
            setTeacherData(filteredData);
            setFilteredData(filteredData);
            // Corrected typo in the state name
        } catch (error) {
            console.error('Error fetching teacher data:', error);
        }
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleEdit = (row) => {
        setEditableData(row);
        setOpenDialog(true);
    };

    const handleSave = async () => {
        console.log(editableData)

        try {
            const res = await fetch(`http://localhost:5000/api/admin/updateTeacher`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(editableData),
            });

            const data = await res.json();
            if (res.ok) {
                setUpdateMessage(data.message);
                fetchData();
            } else {
                setUpdateMessage("something wrong");
            }
        } catch (error) {
            console.error('Error updating teacher:', error);
        }

        setEditableData(null);
        setOpenDialog(false);
    };

    const handleCancel = () => {
        setEditableData(null);
        setOpenDialog(false);
    };

    const handleDelete = async (row) => {
        try {
            const res = await fetch(`http://localhost:5000/api/admin/deleteTeacher/${row.teacherId}`, {
                method: "DELETE",
                credentials: 'include',
            });
            const responseData = await res.json();
            if (res.ok) {
                setDeleteMessage(responseData.message);
                fetchData();
            } else {
                setDeleteMessage("Something wrong not to delete that teacherId");
                console.error('Failed to delete teacher:', res.statusText);
            }
        } catch (error) {
            console.error('Error deleting teacher:', error);
        }
    };

    const handleSearch = () => {
        const searchTerm = searchId.toLowerCase().trim();
        const searchResult = teacherData.filter((row) => {
            const userIdString = String(row.user_id);
            return userIdString.includes(searchTerm);
        });
        setFilteredData(searchResult);
    };

    const handleRefresh = () => {
        setSearchId('');
        setFilteredData(teacherData);
        fetchData();
        setUpdateMessage();
        setDeleteMessage();
    };

    const [userName, setUserName] = useState('');
    const [userMail, setUserMail] = useState('');
    const [userID, setUserId] = useState('');
    const [userKey, setUserkey] = useState('');
    // const [userType, setUserType] = useState('');
    const [registrationLink, setRegistrationLink] = useState();
    const [emailTemplate, setEmailTemplate] = useState("");


    const handleButtonClick = (rowIndex) => {
        const user = teacherData[rowIndex];
        const userId = user.user_id;
        const userKey = user.key;
        const userEmail = user.email;
        const userType = user.user_type;

        // Construct the registration link with the current userKey
        const link = `http://localhost:3000/formdata/${userType}/?id=${userId}&mail=${userEmail}&key=${userKey}`;

        // Set the values of userName, userMail, and userTemplate
        setUserName('');
        setUserMail(userEmail);
        setEmailTemplate(`Dear ${userEmail},\n\nPlease confirm your registration by filling out the form using the provided link:\n\n${link}`);

        // Open the dialog and set the registration link state
        setOpenDialog2(true);
        setUserId(userId);
        setUserkey(userKey);
        setRegistrationLink(link);
    };

    // http://localhost:3000/formdata/t/?id=n3pyqqto&mail=abc@gmail.com&pos=staff
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs
            .sendForm(process.env.REACT_APP_EMAILJS_EMAIL_SERVICE_ID, process.env.REACT_APP_EMAILJS_EMAIL_TEMPLATE_ID, form.current, {
                publicKey: process.env.REACT_APP_EMAILJS_EMAIL_PUBLIC_KEY,
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                    toast("Email Send Successfully");
                },
                (error) => {
                    console.log('FAILED...', error.text);
                    toast('FAILED... to send mail', error.text)
                },
            );
    };

    return (
        <>
            <div className="teacher-view-ex">
                <div className="teacher-view">
                    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '10px 15px', backgroundColor: '#ffffff66' }}>

                        <TextField
                            label="Search by User ID"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                            fullWidth
                            margin="normal"
                        />

                        <Button onClick={handleSearch} variant="contained" color="primary" sx={{ ml: 2 }}>
                            Search
                        </Button>
                        <Button onClick={handleRefresh} variant="contained" color="secondary" sx={{ ml: 2 }}>
                            Refresh
                        </Button>


                        <TableContainer sx={{ maxHeight: 540 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align="left"
                                                style={{ minWidth: column.minWidth, fontWeight: 'bold', fontSize: '20px', padding: '10px 15px' }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                        <TableCell align="left" style={{ minWidth: 100, fontWeight: 'bold', fontSize: '20px', padding: "10px 15px" }}>
                                            Actions
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredData
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.user_id}>
                                                {columns.map((column) => (
                                                    <TableCell key={column.id} align="left" sx={{ fontSize: '16px' }}>
                                                        {column.id === 'button' ? (
                                                            <Button variant="contained" color="primary" onClick={() => handleButtonClick(index)}>
                                                                SEND Mail
                                                            </Button>
                                                        ) : (
                                                            editableData === row ? (
                                                                <TextField
                                                                    value={row[column.id]}
                                                                    onChange={(e) => {
                                                                        const updatedData = { ...row, [column.id]: e.target.value };
                                                                        setEditableData(updatedData);
                                                                    }}
                                                                />
                                                            ) : (
                                                                row[column.id]
                                                            )
                                                        )}
                                                    </TableCell>
                                                ))}
                                                <TableCell key="actions" align="left" sx={{ fontSize: '16px' }}>
                                                    {editableData !== row && (
                                                        <>
                                                            <Button onClick={() => handleEdit(row)}>Edit</Button>
                                                            <Button onClick={() => handleDelete(row)}>Delete</Button>
                                                        </>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Dialog open={openDialog} onClose={handleCancel}>
                            <DialogTitle>Edit Teacher</DialogTitle>
                            <DialogContent>
                                {editableData && columns.map((column) => (
                                    <React.Fragment key={column.id}>
                                        <TextField
                                            label={column.label}
                                            value={editableData[column.id]}
                                            onChange={(e) => {
                                                const updatedData = { ...editableData, [column.id]: e.target.value };
                                                setEditableData(updatedData);
                                            }}
                                            fullWidth
                                            margin="normal"
                                        />
                                    </React.Fragment>
                                ))}
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleSave}>Save</Button>
                                <Button onClick={handleCancel}>Cancel</Button>
                            </DialogActions>
                        </Dialog>


                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 100]}
                            component="div"
                            count={filteredData.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                    <p className="reg-error" style={{ marginTop: "15px" }}>
                        {updateMessage || deleteMessage}
                    </p>
                </div>
            </div>

            {/* email */}

            <Dialog open={openDialog2} onClose={() => setOpenDialog2(false)} fullWidth maxWidth="md">
                <form ref={form} onSubmit={sendEmail}>
                    <DialogTitle>SEND A MAIL</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="User Id"
                            name="userID"
                            defaultValue={userID}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Key"
                            name="userKey"
                            defaultValue={userKey}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Email"
                            name="to_name"
                            type="email"
                            defaultValue={userMail}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Message"
                            name="message"
                            defaultValue={emailTemplate}
                            multiline
                            rows={10}
                            fullWidth
                            margin="normal"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog2(false)} color="secondary">
                            Cancel
                        </Button>
                        <Button type="submit" onClick={() => {
                            setOpenDialog2(false);
                        }} color="primary">
                            Send
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
            <ToastContainer />
        </>
    );
};
