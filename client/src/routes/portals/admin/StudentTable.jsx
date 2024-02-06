import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const columns = [
  { id: 'studentId', label: 'Student ID', minWidth: 200 },
  { id: 'firstName', label: 'First Name', minWidth: 200 },
  { id: 'lastName', label: 'Last Name', minWidth: 200 },
  { id: 'email', label: 'Email', minWidth: 270 },
  { id: 'dateOfBirth', label: 'Date of Birth', minWidth: 250 },
  { id: 'phoneNumber', label: 'Phone Number', minWidth: 220 },
  { id: 'joiningDate', label: 'Joining Date', minWidth: 220 },
  { id: 'batch', label: 'Batch', minWidth: 120 },
  { id: 'department', label: 'Department', minWidth: 200 },
  { id: 'gender', label: 'Gender', minWidth: 100 },
  { id: 'fatherName', label: "Father's Name", minWidth: 200 },
  { id: 'motherName', label: "Mother's Name", minWidth: 200 },
  { id: 'guardianName', label: "Guardian's Name", minWidth: 200 },
  { id: 'streetAddress', label: 'Street Address', minWidth: 200 },
  { id: 'city', label: 'City', minWidth: 100 },
  { id: 'state', label: 'State', minWidth: 100 },
  { id: 'zip', label: 'Zip', minWidth: 100 },
  { id: 'enroll', label: 'Enroll', minWidth: 100 }, // Add "Enroll" field
];

function createData(
  studentId,
  firstName,
  lastName,
  email,
  dateOfBirth,
  phoneNumber,
  joiningDate,
  batch,
  department,
  gender,
  fatherName,
  motherName,
  guardianName,
  streetAddress,
  city,
  state,
  zip,
  enroll // Include "Enroll" field in the parameters
) {
  return {
    studentId,
    firstName,
    lastName,
    email,
    dateOfBirth,
    phoneNumber,
    joiningDate,
    batch,
    department,
    gender,
    fatherName,
    motherName,
    guardianName,
    streetAddress,
    city,
    state,
    zip,
    enroll // Include "Enroll" field in the object
  };
}

// Adjust student data to include "enroll" field
const studentData = [
  createData(
    // Existing student data...
    'S001',
    'John',
    'Doe',
    'john.doe@example.com',
    // Other fields...
    'Male', // Example "gender" field
    // Other fields...
    'Yes' // Example "enroll" field
  ),
  // Add more student data as needed
];

const StudentTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editableData, setEditableData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchId, setSearchId] = useState('');
  const [filteredData, setFilteredData] = useState(studentData);

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

  const handleSave = () => {
    // Add logic to save changes
    setEditableData(null);
    setOpenDialog(false);
  };

  const handleCancel = () => {
    // Add logic to cancel changes
    setEditableData(null);
    setOpenDialog(false);
  };

  const handleDelete = (row) => {
    // Add logic to delete the row
    console.log(`Delete student with ID: ${row.studentId}`);
  };

  const handleSearch = () => {
    const searchTerm = searchId.toLowerCase().trim();
    const searchResult = studentData.filter((row) =>
      row.studentId.toLowerCase().includes(searchTerm) ||
      row.firstName.toLowerCase().includes(searchTerm) ||
      row.lastName.toLowerCase().includes(searchTerm)
    );
  
    setFilteredData(searchResult);
  };

  const handleRefresh = () => {
    setSearchId('');
    setFilteredData(studentData);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '10px 15px', backgroundColor: '#ffffff66' }}>

      <TextField
        label="Search by Student ID, First Name, or Last Name"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button onClick={handleSearch} variant="contained" color="primary" sx={{ m:5}}>
        Search
      </Button>
      <Button onClick={handleRefresh} variant="contained" color="secondary" sx={{ m:5 }}>
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
                  {columns.map((column) => (
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
            <TextField
              key={column.id}
              label={column.label}
              value={editableData[column.id]}
              onChange={(e) => {
                const updatedData = { ...editableData, [column.id]: e.target.value };
                setEditableData(updatedData);
              }}
              fullWidth
              margin="normal"
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default StudentTable;
