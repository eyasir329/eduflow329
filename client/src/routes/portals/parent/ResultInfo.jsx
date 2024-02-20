import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const defaultResultData = [
  {
    examType: "Midterm",
    examHeld: "2024-02-15",
    classId: "C001",
    subjectId: "S001",
    teacherId: "T001",
    studentId: "ST002",
    cq: 80,
    mcq: 70,
    presentPercentage: 90,
  },
  {
    examType: "Midterm",
    examHeld: "2024-02-15",
    classId: "C002",
    subjectId: "S002",
    teacherId: "T002",
    studentId: "ST001",
    cq: 80,
    mcq: 70,
    presentPercentage: 90,
  },
  // Add more result data as needed
];

const ResultInfo = () => {
  const [resultData, setResultData] = useState(defaultResultData);
  const [searchCriteria, setSearchCriteria] = useState({
    option: "examType+subjectId", // Set default option to "examType+subjectId"
    value: "",
    examType: "",
    subjectId: "",
  });

  const handleOptionChange = (e) => {
    const selectedOption = e.target.value;
    setSearchCriteria({
      option: selectedOption,
      value: "",
      examType:
        selectedOption === "examType+subjectId" ? "" : searchCriteria.examType,
      subjectId:
        selectedOption === "examType+subjectId" ? "" : searchCriteria.subjectId,
    });
  };

  const handleSearch = () => {
    if (searchCriteria.option === "examType") {
      setResultData(
        defaultResultData.filter((data) => data.examType === searchCriteria.value)
      );
    } else if (searchCriteria.option === "examType+subjectId") {
      setResultData(
        defaultResultData.filter(
          (data) =>
            data.examType === searchCriteria.examType &&
            data.subjectId === searchCriteria.subjectId
        )
      );
    }
  };

  return (
    <>
      <div className="teacher-info">
        <div className="teacher-view-ex">
          <div className="teacher-view">
            <FormControl sx={{ mb: 2, mr: 2 }}>
              <InputLabel id="search-option-label" style={{ marginTop: "-10px", marginBottom: "0px", padding: "0px" }}>Search Option</InputLabel>
              <Select
                labelId="search-option-label"
                id="search-option"
                value={searchCriteria.option}
                onChange={handleOptionChange}
              >
                {!searchCriteria.option && <MenuItem value="">Option List</MenuItem>}
                <MenuItem value="examType">View All Marks</MenuItem>
                <MenuItem value="examType+subjectId">View By Subject ID</MenuItem>
              </Select>
            </FormControl>
            {searchCriteria.option === "examType+subjectId" ? (
              <>
                <TextField
                  label="Exam Type"
                  value={searchCriteria.examType}
                  onChange={(e) =>
                    setSearchCriteria({
                      ...searchCriteria,
                      examType: e.target.value,
                    })
                  }
                />
                <TextField
                  label="Subject ID"
                  value={searchCriteria.subjectId}
                  onChange={(e) =>
                    setSearchCriteria({
                      ...searchCriteria,
                      subjectId: e.target.value,
                    })
                  }
                />
              </>
            ) : (
              <TextField
                label={searchCriteria.option === "subjectId" ? "Subject ID" : "Exam Type"}
                value={searchCriteria.value}
                onChange={(e) =>
                  setSearchCriteria({
                    ...searchCriteria,
                    value: e.target.value,
                  })
                }
              />
            )}
            <Button variant="contained" color="primary" onClick={handleSearch}>
              Search
            </Button>
            <TableContainer component={Paper} sx={{ backgroundColor: "#ffffff66", marginTop: "30px" }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Exam Type</TableCell>
                    <TableCell>Exam Held</TableCell>
                    <TableCell>Class ID</TableCell>
                    <TableCell>Subject ID</TableCell>
                    <TableCell>Teacher ID</TableCell>
                    <TableCell>Student ID</TableCell>
                    <TableCell>CQ</TableCell>
                    <TableCell>MCQ</TableCell>
                    <TableCell>Present Percentage</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resultData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.examType}</TableCell>
                      <TableCell>{row.examHeld}</TableCell>
                      <TableCell>{row.classId}</TableCell>
                      <TableCell>{row.subjectId}</TableCell>
                      <TableCell>{row.teacherId}</TableCell>
                      <TableCell>{row.studentId}</TableCell>
                      <TableCell>{row.cq}</TableCell>
                      <TableCell>{row.mcq}</TableCell>
                      <TableCell>{row.presentPercentage}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultInfo;
