import React, { useState } from "react";
import {
    TextField,
    Button,
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Paper
} from "@mui/material";

import Image from "../../components/functionality/Image";
import { useLocation, useParams } from "react-router-dom";

const divisions = ["Barishal", "Chattogram", "Dhaka", "Khulna", "Mymensingh", "Rajshahi", "Rangpur", "Sylhet"];
const divisionMenuItems = divisions.map((division, index) => (
    <MenuItem key={index} value={division}>{division}</MenuItem>
));

export default function UserData() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    // Extract parameters from URL search query
    const { type } = useParams();
    const id = searchParams.get('id');
    const mail = searchParams.get('mail');
    const pos = searchParams.get('pos');
 
    console.log(type,id,mail,pos);

    let headerInfo="";
    if(type==='t'){
        headerInfo="Teacher";
    }else if(type==='s'){
        headerInfo="Student";
    }else{
        headerInfo="Staff";
    }

    const [teacherId, setTeacherId] = useState(id);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState(mail);
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [joiningDate, setJoiningDate] = useState("");
    const [position, setPosition] = useState(pos);
    const [salary, setSalary] = useState("");
    const [facebook, setFacebook] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [profilePicture, setProfilePicture] = useState("https://firebasestorage.googleapis.com/v0/b/school-oauth-49a14.appspot.com/o/587191957.png?alt=media&token=cc55bbb6-293b-40be-9412-091f66115b00");
    const [teacherInfo, setTeacherInfo] = useState("");



    const handleSubmit = async (event) => {
        event.preventDefault();
        // Format joining date and date of birth to MySQL date format (YYYY-MM-DD)
        const formattedJoiningDate = joiningDate ? new Date(joiningDate).toISOString().split('T')[0] : null;
        const formattedDateOfBirth = dateOfBirth ? new Date(dateOfBirth).toISOString().split('T')[0] : null;

        // Prepare the data to be sent to the backend API
        const data = {
            teacherId,
            firstName,
            lastName,
            email,
            dateOfBirth: formattedDateOfBirth,
            phoneNumber,
            joiningDate: formattedJoiningDate,
            position,
            salary,
            facebook,
            linkedin,
            streetAddress,
            city,
            state,
            zip,
            profilePicture,
        };

        // Send the data to your backend API using fetch or axios
        try {
            const response = await fetch("http://localhost:5000/api/admin/createTeacher", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                throw new Error("Failed to register teacher");
            }
            const responseData = await response.json();
            console.log(responseData);

           

            setTeacherInfo(responseData.message);

            // Reset the form fields after successful submission
            setTeacherId("");
            setFirstName("");
            setLastName("");
            setEmail("");
            setDateOfBirth("");
            setPhoneNumber("");
            setJoiningDate("");
            setPosition("");
            setSalary("");
            setFacebook("");
            setLinkedin("");
            setStreetAddress("");
            setCity("");
            setState("");
            setZip("");
            setProfilePicture("https://firebasestorage.googleapis.com/v0/b/school-oauth-49a14.appspot.com/o/587191957.png?alt=media&token=cc55bbb6-293b-40be-9412-091f66115b00");
            // Handle any success UI feedback
        } catch (error) {
            console.error("Error:", error);
            setTeacherInfo(error.message);
        }
    };

    const handleUploadSuccess = (downloadURL) => {
        setProfilePicture(downloadURL);
    };

    const handleUploadError = (error) => {
        console.error('Image upload error:', error);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-mg-12">
                    <div className="teacher-info">
                        <h1>{headerInfo} Form</h1>
                        <div className="create-teacher">
                            <Paper
                                sx={{
                                    width: '100%',
                                    overflow: 'hidden',
                                    padding: '10px 15px',
                                    backgroundColor: '#ffffff66',
                                    mb: 4,
                                }}
                            >
                                <form onSubmit={handleSubmit}>
                                    <div className="imageSchool">
                                        <Image
                                            onUploadSuccess={handleUploadSuccess}
                                            onUploadError={handleUploadError}
                                            defaultValue={profilePicture}
                                        />

                                    </div>

                                    <TextField
                                        type="text"
                                        variant="outlined"
                                        label="Unique Teacher ID"
                                        InputLabelProps={{ shrink: true }}
                                        color="secondary"
                                        value={teacherId}
                                        fullWidth
                                        required
                                        sx={{ mb: 4 }}
                                    />

                                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                                        <TextField
                                            type="text"
                                            variant="outlined"
                                            color="secondary"
                                            label="First Name"
                                            onChange={(e) => setFirstName(e.target.value)}
                                            value={firstName}
                                            fullWidth
                                            required
                                        />
                                        <TextField
                                            type="text"
                                            variant="outlined"
                                            color="secondary"
                                            label="Last Name"
                                            onChange={(e) => setLastName(e.target.value)}
                                            value={lastName}
                                            fullWidth
                                            required
                                        />
                                    </Stack>
                                    <TextField
                                        type="email"
                                        variant="outlined"
                                        color="secondary"
                                        label="Email"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        fullWidth
                                        required
                                        sx={{ mb: 4 }}
                                    />
                                    <TextField
                                        type="tel"
                                        variant="outlined"
                                        color="secondary"
                                        label="Phone Number"
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        value={phoneNumber}
                                        fullWidth
                                        required
                                        sx={{ mb: 4 }}
                                    />
                                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                                        <TextField
                                            type="date"
                                            variant="outlined"
                                            color="secondary"
                                            label="Joining Date"
                                            InputLabelProps={{ shrink: true }}
                                            className="no-shrink-label"
                                            onChange={(e) => setJoiningDate(e.target.value)}
                                            value={joiningDate}
                                            fullWidth
                                        />
                                        <TextField
                                            select
                                            variant="outlined"
                                            color="secondary"
                                            label="Position"
                                            onChange={(e) => setPosition(e.target.value)}
                                            value={position}
                                            fullWidth
                                        >
                                            <MenuItem value="Head Teacher">Head Teacher</MenuItem>
                                            <MenuItem value="Assistant Head Teacher">Assistant Head Teacher</MenuItem>
                                            <MenuItem value="Subject Teacher">Subject Teacher</MenuItem>
                                            <MenuItem value="Language Teacher">Language Teacher</MenuItem>
                                            <MenuItem value="Physical Education Teacher">Physical Education Teacher</MenuItem>
                                            <MenuItem value="Librarian">Librarian</MenuItem>
                                            <MenuItem value="Special Education Teacher">Special Education Teacher</MenuItem>
                                            <MenuItem value="Counselor">Counselor</MenuItem>
                                        </TextField>

                                        <TextField
                                            type="number"
                                            variant="outlined"
                                            color="secondary"
                                            label="Salary"
                                            onChange={(e) => setSalary(e.target.value)}
                                            value={salary}
                                            fullWidth
                                        />
                                    </Stack>
                                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                                        <TextField
                                            type="url"
                                            variant="outlined"
                                            color="secondary"
                                            label="Facebook"
                                            onChange={(e) => setFacebook(e.target.value)}
                                            value={facebook}
                                            fullWidth
                                        />
                                        <TextField
                                            type="url"
                                            variant="outlined"
                                            color="secondary"
                                            label="Linkedin"
                                            onChange={(e) => setLinkedin(e.target.value)}
                                            value={linkedin}
                                            fullWidth
                                        />
                                    </Stack>
                                    <TextField
                                        type="date"
                                        variant="outlined"
                                        color="secondary"
                                        label="Date Of Birth"
                                        InputLabelProps={{ shrink: true }}
                                        onChange={(e) => setDateOfBirth(e.target.value)}
                                        value={dateOfBirth}
                                        fullWidth
                                        sx={{ mb: 4 }}
                                    />


                                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                                        <TextField
                                            label="City"
                                            type="text"
                                            variant="outlined"
                                            color="secondary"
                                            onChange={(e) => setCity(e.target.value)}
                                            value={city}
                                            fullWidth
                                            margin="normal"
                                        />
                                        <FormControl fullWidth margin="normal">
                                            <InputLabel id="inputStateLabel">State</InputLabel>
                                            <Select
                                                labelId="inputStateLabel"
                                                InputLabelProps={{ shrink: true }}
                                                id="inputState"
                                                variant="outlined"
                                                color="secondary"
                                                onChange={(e) => setState(e.target.value)}
                                                value={state}
                                            >
                                                {divisionMenuItems}
                                            </Select>
                                        </FormControl>
                                        <TextField
                                            label="Zip"
                                            type="text"
                                            variant="outlined"
                                            color="secondary"
                                            onChange={(e) => setZip(e.target.value)}
                                            value={zip}
                                            fullWidth
                                            margin="normal"
                                        />
                                    </Stack>

                                    <TextField
                                        label="Street Address"
                                        type="text"
                                        variant="outlined"
                                        color="secondary"
                                        onChange={(e) => setStreetAddress(e.target.value)}
                                        value={streetAddress}
                                        fullWidth
                                        sx={{ mb: 4 }}
                                    />

                                    <Button variant="outlined" color="secondary" type="submit">
                                        Register
                                    </Button>
                                </form>
                                <p className="reg-error">
                                    {teacherInfo}
                                </p>
                            </Paper>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
