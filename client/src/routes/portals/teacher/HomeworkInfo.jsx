import React, { useState } from 'react';
import {
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
    Stack,
    TextField,
} from '@mui/material';
import HomeworkTable from './HomeworkTable';

export default function HomeworkInfo() {
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
    const [homeworkId, setHomeworkId] = useState('HW001'); // Homework ID
    const [attendanceData, setAttendanceData] = useState({}); // Object to store attendance data
    const [homeworkMessage, setHomeworkMessage] = useState(''); // State for homework message
    const [totalNumber, setTotalNumber] = useState(0); // Total number of homework

    // Function to generate the next Homework ID
    const getNextHomeworkId = () => {
        const lastNumber = parseInt(homeworkId.slice(2));
        return `HW${String(lastNumber + 1).padStart(3, '0')}`;
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to handle form submission (e.g., send data to backend)
        console.log('Attendance Data:', attendanceData);
        console.log('Homework ID:', homeworkId);
        console.log('Homework Message:', homeworkMessage);
        console.log('Total Number:', totalNumber);
        // Reset form fields after submission
        setDate(new Date().toISOString().slice(0, 10)); // Reset date to current date
        setSubjectId('Math'); // Reset subject ID
        setHomeworkId(getNextHomeworkId()); // Set next homework ID
        setAttendanceData({}); // Clear attendance data
        setHomeworkMessage(''); // Clear homework message
    };

    return (
        <>
            <div className="teacher-view-ex">
                <div className="teacher-view">
                    <h1>New Homework</h1>
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

                        {/* Homework ID input field */}
                        <TextField
                            label="Homework ID"
                            value={homeworkId}
                            disabled // Make it unchangeable
                            fullWidth
                            sx={{ marginBottom: '1rem' }}
                        />

                        {/* Homework message input field */}
                        <TextField
                            label="Homework Message"
                            placeholder="Enter homework message"
                            value={homeworkMessage}
                            onChange={(e) => setHomeworkMessage(e.target.value)}
                            fullWidth
                            sx={{ marginBottom: '1rem' }}
                        />

                        {/* Total number input field */}
                        <TextField
                            label="Total Number"
                            type="number"
                            value={totalNumber}
                            onChange={(e) => setTotalNumber(parseInt(e.target.value))}
                            fullWidth
                            sx={{ marginBottom: '1rem' }}
                        />

                        <Button type="submit" variant="contained" color="primary" sx={{ margin: 5, padding: 2 }}>
                            Create Homework
                        </Button>
                    </form>
                    <h1>
                        Homework Marks
                    </h1>
                    <HomeworkTable />
                </div>
            </div>

        </>
    );
}
