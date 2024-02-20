import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  TablePagination,
  createTheme,
} from "@mui/material";
import { ThemeProvider } from "@emotion/react";
const theme = createTheme();

const defaultAttendanceData = [
  {
    date: "2024-02-07",
    teacherId: "T001",
    subjectId: "Math",
    studentId: "S001",
    attendance: "Present",
    homeworkId: "HW001",
  },
  {
    date: "2024-02-07",
    teacherId: "T001",
    subjectId: "Math",
    studentId: "S002",
    attendance: "Absent",
    homeworkId: "HW002",
  },
  {
    date: "2024-02-07",
    teacherId: "T002",
    subjectId: "Science",
    studentId: "S003",
    attendance: "Present",
    homeworkId: "HW003",
  },
  // Add more attendance data as needed
];

const HomeworkTable = () => {
  const [attendanceData, setAttendanceData] = useState(defaultAttendanceData);
  const [openDialog, setOpenDialog] = useState(false);
  const [editableRow, setEditableRow] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(defaultAttendanceData);

  const handleEdit = (row) => {
    setEditableRow(row);
    setOpenDialog(true);
  };

  const handleSave = () => {
    // Implement save logic
    setOpenDialog(false);
  };

  const handleCancel = () => {
    setEditableRow(null);
    setOpenDialog(false);
  };

  const handleDelete = (rowIndex) => {
    const updatedAttendanceData = [...attendanceData];
    updatedAttendanceData.splice(rowIndex, 1);
    setAttendanceData(updatedAttendanceData);
    setFilteredData(updatedAttendanceData); // Update filtered data after deletion
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = () => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    const searchResult = attendanceData.filter(
      (row) =>
        row.date.toLowerCase().includes(searchTermLowerCase) ||
        row.homeworkId.toLowerCase().includes(searchTermLowerCase)
    );
    setFilteredData(searchResult);
  };

  const handleRefresh = () => {
    setSearchTerm("");
    setFilteredData(attendanceData);
  };

  const handleDeleteAll = () => {
    setAttendanceData([]);
    setFilteredData([]);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Paper
          sx={{
            width: "100%",
            overflow: "hidden",
            padding: "10px 15px",
            backgroundColor: "#ffffff66",
          }}
        >
          <TextField
            label="Search by Date or Homework ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={handleSearch} sx={{
            margin : "5px 0px 5px 10px",
          }}>Search</Button>
          <Button onClick={handleRefresh} sx={{
            margin : "5px 10px",
          }}>Refresh</Button>
          <Button onClick={handleDeleteAll}>Delete All</Button>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Teacher ID</TableCell>
                  <TableCell>Subject ID</TableCell>
                  <TableCell>Student ID</TableCell>
                  <TableCell>Attendance</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? filteredData.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : filteredData
                ).map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.teacherId}</TableCell>
                    <TableCell>{row.subjectId}</TableCell>
                    <TableCell>{row.studentId}</TableCell>
                    <TableCell>{row.attendance}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleEdit(row)}>Edit</Button>
                      <Button onClick={() => handleDelete(index)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <Dialog open={openDialog} onClose={handleCancel}>
          <DialogTitle>Edit Attendance</DialogTitle>
          <DialogContent>
            {editableRow && (
              <>
                <TextField
                  label="Date"
                  value={editableRow.date}
                  fullWidth
                  disabled
                />
                <TextField
                  label="Teacher ID"
                  value={editableRow.teacherId}
                  fullWidth
                  disabled
                />
                <TextField
                  label="Subject ID"
                  value={editableRow.subjectId}
                  fullWidth
                  disabled
                />
                <TextField
                  label="Student ID"
                  value={editableRow.studentId}
                  fullWidth
                  disabled
                />
                <TextField
                  label="Attendance"
                  value={editableRow.attendance}
                  fullWidth
                  onChange={(e) =>
                    setEditableRow({
                      ...editableRow,
                      attendance: e.target.value,
                    })
                  }
                />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleCancel}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </>
  );
};

export default HomeworkTable;
