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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Image from "../../components/functionality/Image";
import { useLocation, useParams } from "react-router-dom";

const divisions = ["Barishal", "Chattogram", "Dhaka", "Khulna", "Mymensingh", "Rajshahi", "Rangpur", "Sylhet"];
const divisionMenuItems = divisions.map((division, index) => (
    <MenuItem key={index} value={division}>{division}</MenuItem>
));

export default function RegUserData() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    // Extract parameters from URL search query
    const { type } = useParams();
    const id = searchParams.get('id');
    const mail = searchParams.get('mail');
    // const pos = searchParams.get('pos');
    const key = searchParams.get('key');

    console.log(type, id, mail, key);



    let headerInfo = type;

    let pos = "";


    const [userId, setUserId] = useState(id);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState(mail);
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [nidNum, setNidNum] = useState("");
    const [birthCirtificate, setBirthCirtificate] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [facebook, setFacebook] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [profilePicture, setProfilePicture] = useState("https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png");
    // const [teacherInfo, setTeacherInfo] = useState("");


    const handleSubmit = async (event) => {
        event.preventDefault();

        // Format date of birth if available
        const formattedDateOfBirth = dateOfBirth ? new Date(dateOfBirth).toISOString().split('T')[0] : null;

        // Prepare data to be sent to the backend API
        const data = {
            userId,
            firstName,
            lastName,
            email,
            dateOfBirth: formattedDateOfBirth,
            nidNum,
            birthCirtificate,
            phoneNumber,
            facebook,
            linkedin,
            streetAddress,
            city,
            state,
            zip,
            profilePicture,
            key
        };

        console.log(data.birthCirtificate)

        try {
            // Determine the endpoint based on user type
            let endpoint;
            let startpoint;

            if (type === "teacher") {
                startpoint = "register";
                endpoint = "createTeacher";
            } else if (type === "student") {
                startpoint = "teacher";
                endpoint = "createStudent";
            } else if (type === "staff") {
                startpoint = "admin";
                endpoint = "createStaff";
            } else {
                throw new Error("Invalid user type");
            }

            const url = `http://localhost:5000/api/${startpoint}/${endpoint}`;

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to register user");
            }

            // Parse the response JSON
            const responseData = await response.json();
            console.log(responseData);

            // Update state with the response message
            // setTeacherInfo(responseData.message);
            toast(responseData.message);

            // window.location.href = '/portal/signup'; 
            // Construct the URL with query parameters
            const url2 = `/portal/signup?userId=${userId}&email=${encodeURIComponent(email)}&key=${key}`;

            // Navigate to the constructed URL
            window.location.href = url2;

            // Reset the form fields after successful submission
            setUserId("");
            setFirstName("");
            setLastName("");
            setEmail("");
            setDateOfBirth("");
            setBirthCirtificate("");
            setNidNum("");
            setPhoneNumber("");
            setFacebook("");
            setLinkedin("");
            setStreetAddress("");
            setCity("");
            setState("");
            setZip("");
            setProfilePicture("https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png");

            // Handle any success UI feedback
        } catch (error) {
            console.error("Error:", error);

            // Update state with the error message
            // setTeacherInfo(error.message);
            toast(error.message);
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
                        <h1>{headerInfo.toUpperCase()} FORM</h1>
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
                                        label={"Unique " + type.charAt(0).toUpperCase() + type.slice(1) + " ID"}
                                        InputLabelProps={{ shrink: true }}
                                        color="secondary"
                                        value={userId}
                                        fullWidth
                                        disabled
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
                                        disabled
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
                                        required
                                    />
                                    <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                                        <TextField
                                            type="text"
                                            variant="outlined"
                                            color="secondary"
                                            label="Birth Cirtificate Number"
                                            onChange={(e) => setBirthCirtificate(e.target.value)}
                                            value={birthCirtificate}
                                            fullWidth
                                            sx={{ mb: 4 }}
                                            required
                                        />
                                        <TextField
                                            type="text"
                                            variant="outlined"
                                            color="secondary"
                                            label="Nid Number"
                                            onChange={(e) => setNidNum(e.target.value)}
                                            value={nidNum}
                                            fullWidth
                                            sx={{ mb: 4 }}
                                        />
                                    </Stack>

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
                                            required
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
                                                required
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
                                            required
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
                                        required
                                    />

                                    <Button variant="outlined" color="secondary" type="submit">
                                        Register
                                    </Button>
                                </form>
                                {/* <p className="reg-error">
                                    {teacherInfo}
                                </p> */}
                            </Paper>
                        </div>

                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}
