import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    FormControl,
    Checkbox,
    Button,
    Stack,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import AttendanceTable from './AttendanceTable';

export default function AttendanceInfo() {
    // Sample student data for demonstration
    const studentData = [
        { studentId: 'S001', name: 'Alice' },
        { studentId: 'S002', name: 'Bob' },
        { studentId: 'S003', name: 'Charlie' },
        // Add more student data as needed
    ];

    // State variables for form fields
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10)); // Current date
    const [subjectId, setSubjectId] = useState('Math'); // Default subject ID
    const [attendanceData, setAttendanceData] = useState({}); // Object to store attendance data

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to handle form submission (e.g., send data to backend)
        console.log('Attendance Data:', attendanceData);
        // Reset form fields after submission
        setDate(new Date().toISOString().slice(0, 10)); // Reset date to current date
        setSubjectId('Math'); // Reset subject ID
        setAttendanceData({}); // Clear attendance data
    };

    // Function to handle attendance change for a student
    const handleAttendanceChange = (studentId, checked) => {
        setAttendanceData((prevData) => ({
            ...prevData,
            [studentId]: {
                ...prevData[studentId],
                [subjectId]: checked ? 'Present' : 'Absent',
            },
        }));
    };

    return (
        <>
            <div className="teacher-view-ex">
                <div className="teacher-view">
                    <h1>New Attendance</h1>
                    <form onSubmit={handleSubmit} sx={{ padding: 10 }}>

                        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                            <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
                                <InputLabel htmlFor="subjectId" sx={{ marginTop: 4, fontSize: 15 }}>Subject ID</InputLabel>
                                <Select
                                    id="subjectId"
                                    value={subjectId}
                                    onChange={(e) => setSubjectId(e.target.value)}
                                >
                                    <MenuItem value="Math">Math</MenuItem>
                                    <MenuItem value="Science">Science</MenuItem>
                                    {/* Add more subjects as needed */}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
                                <InputLabel htmlFor="date">Date</InputLabel>
                                <input
                                    className='teacher-attendance'
                                    type="date"
                                    id="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </FormControl>
                        </Stack>



                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Student ID</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Attendance</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {studentData.map((student) => (
                                        <TableRow key={student.studentId}>
                                            <TableCell>{student.studentId}</TableCell>
                                            <TableCell>{student.name}</TableCell>
                                            <TableCell>
                                                <Checkbox
                                                placeholder='Present'
                                                    checked={attendanceData[student.studentId]?.[subjectId] === 'Present'}
                                                    onChange={(e) => handleAttendanceChange(student.studentId, e.target.checked)}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Button type="submit" variant="contained" color="primary" sx={{ margin: 5, padding: 2 }}>
                            Create Attendance
                        </Button>
                    </form>
                    <h1>
                        Previous Attendance
                    </h1>
                    <AttendanceTable />
                </div>
            </div>

        </>
    );
}
