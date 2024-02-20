import React, { useState } from 'react'
import ResultTable from './ResultTable'
import { Button, Stack, TextField } from '@mui/material'

export default function ResultInfo() {
    const [formData, setFormData] = useState({
        examType: "",
        examHeld: "",
        classId: "",
        subjectId: "",
        teacherId: "",
        studentId: "",
        cq: "",
        mcq: "",
        presentPercentage: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // onAdd(formData);
        setFormData({
            examType: "",
            examHeld: "",
            classId: "",
            subjectId: "",
            teacherId: "",
            studentId: "",
            cq: "",
            mcq: "",
            presentPercentage: "",
        });
    };

    return (
        <>
            <div className="teacher-info">
                <div className="teacher-view">
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={2} direction="row" sx={{ marginBottom: 2 }}>
                            <TextField
                                name="examType"
                                label="Exam Type"
                                value={formData.examType}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                name="examHeld"
                                // label="Exam Held"
                                type="date"
                                value={formData.examHeld}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />

                        </Stack>
                        <Stack spacing={2} direction="row" sx={{ marginBottom: 2 }}>
                            <TextField
                                name="classId"
                                label="Class ID"
                                value={formData.classId}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                name="subjectId"
                                label="Subject ID"
                                value={formData.subjectId}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                        </Stack>
                        <Stack spacing={2} direction="row" sx={{ marginBottom: 2 }}>
                            <TextField
                                name="teacherId"
                                label="Teacher ID"
                                value={formData.teacherId}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                name="studentId"
                                label="Student ID"
                                value={formData.studentId}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                        </Stack>
                        <Stack spacing={2} direction="row">
                            <TextField
                                name="cq"
                                label="CQ"
                                value={formData.cq}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                name="mcq"
                                label="MCQ"
                                value={formData.mcq}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                        </Stack>

                        <TextField
                            name="presentPercentage"
                            label="Present Percentage"
                            value={formData.presentPercentage}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <Button type="submit" variant="contained" color="primary">
                            Add
                        </Button>
                    </form>
                </div>
            </div>

            <h1>
                Result Table
            </h1>
            <ResultTable />
        </>
    )
}
