import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';

const columns = [
  { id: 'teacherId', label: 'Teacher ID', minWidth: 200 },
  { id: 'firstName', label: 'First Name', minWidth: 200 },
  { id: 'lastName', label: 'Last Name', minWidth: 200 },
  { id: 'email', label: 'Email', minWidth: 270 },
  { id: 'dateOfBirth', label: 'Date of Birth', minWidth: 250 },
  { id: 'phoneNumber', label: 'Phone Number', minWidth: 220 },
  { id: 'joiningDate', label: 'Joining Date', minWidth: 220 },
  { id: 'position', label: 'Position', minWidth: 120 },
  { id: 'salary', label: 'Salary', minWidth: 100 },
  { id: 'facebook', label: 'Facebook', minWidth: 250 },
  { id: 'linkedin', label: 'Linkedin', minWidth: 250 },
  { id: 'streetAddress', label: 'Street Address', minWidth: 200 },
  { id: 'city', label: 'City', minWidth: 100 },
  { id: 'state', label: 'State', minWidth: 100 },
  { id: 'zip', label: 'Zip', minWidth: 100 },
];

function createData(
  teacherId,
  firstName,
  lastName,
  email,
  dateOfBirth,
  phoneNumber,
  joiningDate,
  position,
  salary,
  facebook,
  linkedin,
  streetAddress,
  city,
  state,
  zip
) {
  return {
    teacherId,
    firstName,
    lastName,
    email,
    dateOfBirth,
    phoneNumber,
    joiningDate,
    position,
    salary,
    facebook,
    linkedin,
    streetAddress,
    city,
    state,
    zip,
  };
}

const teacherData = [
  createData(
    'T001',
    'John',
    'Doe',
    'john.doe@example.com',
    '1990-01-01',
    '123-456-7890',
    '2022-01-01',
    'Teacher',
    '50000',
    'john.facebook',
    'john.linkedin',
    '123 Main St',
    'Cityville',
    'Stateville',
    '12345'
  ),
  createData(
    'T002',
    'Jane',
    'Smith',
    'jane.smith@example.com',
    '1992-02-02',
    '987-654-3210',
    '2022-02-02',
    'Teacher',
    '60000',
    'jane.facebook',
    'jane.linkedin',
    '456 Oak St',
    'Townsville',
    'Stateville',
    '67890'
  ),
  // Add more teacher data as needed
];

const TeacherTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editableData, setEditableData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchId, setSearchId] = useState('');
  const [filteredData, setFilteredData] = useState(teacherData);

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
    console.log(`Delete teacher with ID: ${row.teacherId}`);
  };

  const handleSearch = () => {
    const searchTerm = searchId.toLowerCase().trim();
    const searchResult = teacherData.filter((row) =>
      row.teacherId.toLowerCase().includes(searchTerm) ||
      row.firstName.toLowerCase().includes(searchTerm) ||
      row.lastName.toLowerCase().includes(searchTerm)
    );
  
    setFilteredData(searchResult);
  };

  const handleRefresh = () => {
    setSearchId('');
    setFilteredData(teacherData);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', padding: '10px 15px', backgroundColor: '#ffffff66' }}>
      {/* <Typography variant="h6" style={{ fontSize: '32px', margin: '20px' }}>
        Teacher Information
      </Typography> */}
      

      {/* Search Input */}
      <TextField
        label="Search by Teacher ID, First Name, or Last Name"
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
                <TableRow hover role="checkbox" tabIndex={-1} key={row.teacherId}>
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
        <DialogTitle>Edit Teacher</DialogTitle>
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

export default TeacherTable;
