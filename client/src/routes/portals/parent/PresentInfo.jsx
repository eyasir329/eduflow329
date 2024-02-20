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
  },
  {
    date: "2024-02-07",
    teacherId: "T001",
    subjectId: "Math",
    studentId: "S002",
    attendance: "Absent",
  },
  {
    date: "2024-02-07",
    teacherId: "T002",
    subjectId: "Science",
    studentId: "S003",
    attendance: "Present",
  },
  // Add more attendance data as needed
];

const PresentInfo = () => {
  const [attendanceData, setAttendanceData] = useState(defaultAttendanceData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(defaultAttendanceData);

  const handleSearch = () => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    const searchResult = attendanceData.filter(
      (row) =>
        row.teacherId.toLowerCase().includes(searchTermLowerCase) ||
        row.subjectId.toLowerCase().includes(searchTermLowerCase)
    );
    setFilteredData(searchResult);
  };

  const handleRefresh = () => {
    setSearchTerm("");
    setFilteredData(attendanceData);
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
                label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button onClick={handleSearch} sx={{
                margin: "5px 0px 5px 10px",
              }}>Search</Button>
              <Button onClick={handleRefresh} sx={{
                margin: "5px",
              }}>Refresh</Button>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Teacher ID</TableCell>
                      <TableCell>Subject ID</TableCell>
                      <TableCell>Attendance</TableCell>
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
                        <TableCell>{row.attendance}</TableCell>
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
                onPageChange={(e, newPage) => setPage(newPage)}
                onRowsPerPageChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value, 10));
                  setPage(0);
                }}
              />
            </Paper>
          </ThemeProvider>

    </>
  );
};

export default PresentInfo;
