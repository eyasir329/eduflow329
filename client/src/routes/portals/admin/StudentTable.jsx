import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import Image from '../../../components/functionality/Image';

const columns = [
  { id: 'profilePicture', label: 'Profile Picture', minWidth: 200 },
  { id: 'studentId', label: 'Student ID', minWidth: 200 },
  { id: 'parentId', label: 'Parent ID', minWidth: 200 },
  { id: 'firstName', label: 'First Name', minWidth: 200 },
  { id: 'lastName', label: 'Last Name', minWidth: 200 },
  { id: 'gender', label: 'Gender', minWidth: 100 },
  { id: 'fatherName', label: "Father's Name", minWidth: 200 },
  { id: 'motherName', label: "Mother's Name", minWidth: 200 },
  { id: 'guardianName', label: "Guardian's Name", minWidth: 200 },
  { id: 'dateOfBirth', label: 'Date of Birth', minWidth: 250 },
  { id: 'admittedDate', label: 'Admitted Date', minWidth: 220 },
  { id: 'email', label: 'Email', minWidth: 200 },
  { id: 'phoneNumber', label: 'Phone Number', minWidth: 200 },
  { id: 'city', label: 'City', minWidth: 200 },
  { id: 'state', label: 'State', minWidth: 200 },
  { id: 'zip', label: 'Zip', minWidth: 200 },
  { id: 'streetAddress', label: 'Street Address', minWidth: 200 },
  { id: 'classId', label: 'Enroll Class', minWidth: 200 },
];

const StudentTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editableData, setEditableData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchId, setSearchId] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [profilePicture, setProfilePicture] = useState("");
  const [uploadDisabled, setUploadDisabled] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/viewStudent');
      if (!response.ok) {
        throw new Error('Failed to fetch student data');
      }
      const data = await response.json();

      setStudentData(data);
      setFilteredData(data);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  useEffect(() => {
    setFilteredData(studentData);
  }, [studentData]);

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
    console.log(editableData);
    try {
      const res = await fetch(`http://localhost:5000/api/admin/updateStudent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(editableData),
      });

      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setUpdateMessage(data.message);
        fetchData();
      } else {
        setUpdateMessage("something wrong");
      }


    } catch (error) {
      console.error('Error updating student:', error);
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
      const res = await fetch(`http://localhost:5000/api/admin/deleteStudent/${row.studentId}`, {
        method: "DELETE",
        credentials: 'include',
      });
      const responseData = await res.json();
      console.log(responseData);
      if (res.ok) {
        setDeleteMessage(responseData.message);
        // Refresh the student data after deletion
        fetchData();
      } else {
        setDeleteMessage("Something wrong not to delete that studentId");
        console.error('Failed to delete student:', res.statusText);
      }
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleSearch = () => {
    const searchTerm = searchId.toLowerCase().trim();
    const searchResult = studentData.filter((row) => {
      const studentIdString = String(row.studentId);
      return (
        (studentIdString.includes(searchTerm)) || // Check if the string contains the search term
        (typeof row.firstName === 'string' && row.firstName.toLowerCase().includes(searchTerm)) ||
        (typeof row.lastName === 'string' && row.lastName.toLowerCase().includes(searchTerm))
      );
    });
    setFilteredData(searchResult);
  };

  const handleRefresh = () => {
    setSearchId('');
    setFilteredData(studentData);
    fetchData();
    setDeleteMessage();

  };

  const handleUploadSuccess = (downloadURL) => {
    setProfilePicture(downloadURL);
    setUploadDisabled(true);
  };

  const handleUploadError = (error) => {
    console.error('Image upload error:', error);
  };

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden', padding: '10px 15px', backgroundColor: '#ffffff66' }}>

        <TextField
          label="Search by Student ID, First Name, or Last Name"
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

        {/* Table */}
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
                .map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.studentId}>
                    {/* Display profile picture */}
                    <TableCell key="profilePicture" align="left" sx={{ fontSize: '16px' }}>
                      <img src={row.profilePicture || profilePicture} alt="Profile" style={{ width: '80px', height: '80px', borderRadius: '50%' }} />
                    </TableCell>
                    {/* Display other columns */}
                    {columns.slice(1).map((column) => (
                      <TableCell key={column.id} align="left" sx={{ fontSize: '16px' }}>
                        {editableData === row ? (
                          <TextField
                            value={row[column.id]}
                            onChange={(e) => {
                              const updatedData = { ...row, [column.id]: e.target.value };
                              setEditableData(updatedData);
                            }}
                          />
                        ) : (
                          row[column.id]
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


        {/* Update Dialog */}
        <Dialog open={openDialog} onClose={handleCancel}>
          <DialogTitle>Edit Student</DialogTitle>
          <DialogContent>
            {editableData && columns.map((column) => (
              <React.Fragment key={column.id}>
                {column.id === 'profilePicture' ? (
                  <Image
                    defaultValue={editableData[column.id]}
                    onUploadSuccess={(downloadURL) => {
                      const updatedData = { ...editableData, [column.id]: downloadURL };
                      setEditableData(updatedData);
                    }}
                    onUploadError={handleUploadError}
                  />
                ) : (
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
                )}
              </React.Fragment>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </DialogActions>
        </Dialog>


        {/* Pagination */}
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

    </>
  );
};

export default StudentTable;
