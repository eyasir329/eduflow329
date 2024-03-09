import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux'
import {
    TextField,
    Button,
    Stack,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Paper,
    createTheme,
    ThemeProvider,
} from "@mui/material";
import Image from '../../components/functionality/Image';

const theme = createTheme();

const divisions = ["Barishal", "Chattogram", "Dhaka", "Khulna", "Mymensingh", "Rajshahi", "Rangpur", "Sylhet"];
const divisionMenuItems = divisions.map((division, index) => (
    <MenuItem key={index} value={division}>{division}</MenuItem>
));

export default function UserProfile(props) {
    const { currentUser } = useSelector((state) => state.user);
    const role = currentUser?.type;
    const email = currentUser?.email;

    const { userData, positionData, addressData, socialData } = props.userDataInfo || {};

    const [editableData, setEditableData] = useState({
        userId: userData?.user_id || "",
        firstName: userData?.first_name || "",
        lastName: userData?.last_name || "",
        email: email,
        dateOfBirth: userData?.date_of_birth ? userData.date_of_birth.substring(0, 10) : "",
        phoneNumber: socialData?.phone || "",
        joiningDate: userData?.created_at ? userData.created_at.substring(0, 10) : "",
        position: positionData?.position_name || "",
        salary: positionData?.salary || "",
        facebook: socialData?.facebook || "",
        linkedin: socialData?.linkedin || "",
        streetAddress: addressData?.street_address || "",
        city: addressData?.city || "",
        state: addressData?.division || "",
        zip: addressData?.zip || "",
        profilePicture: userData?.profile_pic || "",
        birthCertificateNo: userData?.birth_cirtificate_no || "", // New field
        nidNo: userData?.nid_no || "", // New field
        updatedAt: userData?.updated_at ? userData.updated_at.substring(0, 24) : "",
    });

    const [updateMessage, setUpdateMessage] = useState("");
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        if (props.userDataInfo) {
            const { userData, positionData, addressData, socialData } = props.userDataInfo;
            setEditableData({
                userId: userData?.user_id || "",
                firstName: userData?.first_name || "",
                lastName: userData?.last_name || "",
                email: email,
                dateOfBirth: userData?.date_of_birth ? userData.date_of_birth.substring(0, 10) : "",
                phoneNumber: socialData?.phone || "",
                joiningDate: userData?.created_at ? userData.created_at.substring(0, 10) : "",
                position: positionData?.position_name || "",
                salary: positionData?.salary || "",
                facebook: socialData?.facebook || "",
                linkedin: socialData?.linkedin || "",
                streetAddress: addressData?.street_address || "",
                city: addressData?.city || "",
                state: addressData?.division || "",
                zip: addressData?.zip || "",
                profilePicture: userData?.profile_pic || "",
                birthCertificateNo: userData?.birth_cirtificate_no || "",
                nidNo: userData?.nid_no || "",
                updatedAt: userData?.updated_at ? userData.updated_at.substring(0, 24) : "",

            });
        }
    }, [props.userDataInfo]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await fetch(`http://localhost:5000/api/user/userProfileUpdate/${role}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify(editableData),
            });
            const data = await res.json();

            if (res.ok) {
                setUpdateMessage(data.message);
                setRefresh(refresh);
            } else {
                setUpdateMessage("Something went wrong");
            }
        } catch (error) {
            console.error('Error updating user profile:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditableData({ ...editableData, [name]: value });
    };

    const handleUploadSuccess = (downloadURL) => {
        setEditableData({ ...editableData, profilePicture: downloadURL });
    };

    const handleUploadError = (error) => {
        console.error('Image upload error:', error);
    };

    return (
        <div className="teacher-info under-header">
            <div className="create-teacher">
                <h1>{role} Profile</h1>
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
                                defaultValue={editableData.profilePicture}
                            />
                        </div>

                        <TextField
                            type="text"
                            variant="outlined"
                            label="Unique Teacher ID"
                            InputLabelProps={{ shrink: true }}
                            color="secondary"
                            name="teacherId"
                            value={editableData.userId}
                            fullWidth
                            required
                            sx={{ mb: 4 }}
                            onChange={handleInputChange}
                            disabled // Disable input

                        />

                        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                            <TextField
                                type="text"
                                variant="outlined"
                                color="secondary"
                                label="First Name"
                                name="firstName"
                                value={editableData.firstName}
                                fullWidth
                                required
                                onChange={handleInputChange}
                            />
                            <TextField
                                type="text"
                                variant="outlined"
                                color="secondary"
                                label="Last Name"
                                name="lastName"
                                value={editableData.lastName}
                                fullWidth
                                required
                                onChange={handleInputChange}
                            />
                        </Stack>

                        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                            <TextField
                                type="email"
                                variant="outlined"
                                color="secondary"
                                label="Email"
                                name="email"
                                value={editableData.email}
                                fullWidth
                                required
                                sx={{ mb: 4 }}
                                onChange={handleInputChange}
                                disabled // Disable input
                            />

                            <TextField
                                type="tel"
                                variant="outlined"
                                color="secondary"
                                label="Phone Number"
                                name="phoneNumber"
                                value={editableData.phoneNumber}
                                fullWidth
                                required
                                sx={{ mb: 4 }}
                                onChange={handleInputChange}
                            />

                        </Stack>
                        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                            <TextField
                                type="text"
                                variant="outlined"
                                label="Birth Certificate Number"
                                InputLabelProps={{ shrink: true }}
                                color="secondary"
                                name="birthCertificateNo"
                                value={editableData.birthCertificateNo}
                                fullWidth
                                required
                                sx={{ mb: 4 }}
                                onChange={handleInputChange}
                                disabled // Disable input

                            />
                            <TextField
                                type="text"
                                variant="outlined"
                                label="NID Number"
                                InputLabelProps={{ shrink: true }}
                                color="secondary"
                                name="nidNo"
                                value={editableData.nidNo}
                                fullWidth
                                required
                                sx={{ mb: 4 }}
                                onChange={handleInputChange}
                                disabled // Disable input

                            />
                        </Stack>

                        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                            <TextField
                                type="text"
                                variant="outlined"
                                color="secondary"
                                label="Joining Date"
                                InputLabelProps={{ shrink: true }}
                                className="no-shrink-label"
                                name="joiningDate"
                                value={editableData.joiningDate}
                                fullWidth
                                onChange={handleInputChange}
                                disabled // Disable input

                            />

                            <TextField
                                type="text"
                                variant="outlined"
                                color="secondary"
                                label="Position"
                                name="position"
                                value={editableData.position}
                                fullWidth
                                onChange={handleInputChange}
                                disabled // Disable input

                            />

                            <TextField
                                type="number"
                                variant="outlined"
                                color="secondary"
                                label="Salary"
                                name="salary"
                                value={editableData.salary}
                                fullWidth
                                onChange={handleInputChange}
                                disabled // Disable input

                            />
                        </Stack>
                        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                            <TextField
                                type="url"
                                variant="outlined"
                                color="secondary"
                                label="Facebook"
                                name="facebook"
                                value={editableData.facebook}
                                fullWidth
                                onChange={handleInputChange}
                            />
                            <TextField
                                type="url"
                                variant="outlined"
                                color="secondary"
                                label="Linkedin"
                                name="linkedin"
                                value={editableData.linkedin}
                                fullWidth
                                onChange={handleInputChange}
                            />
                        </Stack>
                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Date Of Birth"
                            InputLabelProps={{ shrink: true }}
                            name="dateOfBirth"
                            value={editableData.dateOfBirth}
                            fullWidth
                            sx={{ mb: 4 }}
                            onChange={handleInputChange}
                            disabled // Disable input

                        />

                        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
                            <TextField
                                label="City"
                                type="text"
                                variant="outlined"
                                color="secondary"
                                name="city"
                                value={editableData.city}
                                fullWidth
                                margin="normal"
                                onChange={handleInputChange}
                            />
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="inputStateLabel">State</InputLabel>
                                <Select
                                    labelId="inputStateLabel"
                                    InputLabelProps={{ shrink: true }}
                                    id="inputState"
                                    variant="outlined"
                                    color="secondary"
                                    name="state"
                                    onChange={handleInputChange}
                                    value={editableData.state}
                                >
                                    {divisionMenuItems}
                                </Select>
                            </FormControl>
                            <TextField
                                label="Zip"
                                type="text"
                                variant="outlined"
                                color="secondary"
                                name="zip"
                                value={editableData.zip}
                                fullWidth
                                margin="normal"
                                onChange={handleInputChange}
                            />
                        </Stack>

                        <TextField
                            label="Street Address"
                            type="text"
                            variant="outlined"
                            color="secondary"
                            name="streetAddress"
                            value={editableData.streetAddress}
                            fullWidth
                            sx={{ mb: 4 }}
                            onChange={handleInputChange}
                        />

                        <TextField
                            type="text"
                            variant="outlined"
                            color="secondary"
                            label="Last Update Time"
                            InputLabelProps={{ shrink: true }}
                            className="no-shrink-label"
                            name="Last Update Time"
                            value={editableData.updatedAt}
                            fullWidth
                            disabled // Disable input

                        />

                        <Button variant="outlined" color="secondary" type="submit">
                            Update
                        </Button>
                    </form>
                    <p className="reg-error">{updateMessage}</p>
                </Paper>
            </div>
        </div>
    );
}
