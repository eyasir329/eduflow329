import React, { useEffect, useState } from "react";
import SchoolInfo from "./SchoolInfo";
import Profile from "../SignInfoProfile";
import TeacherInfo from "./TeacherInfo";
import StaffInfo from "./StaffInfo";
import StudentInfo from "./StudentInfo";
import AcademicInfo from "./AcademicInfo";
import AttendanceInfo from "./AttendanceInfo";
import ResultInfo from "./ResultInfo";
import UserCreate from "../UserCreate";
import NoticeBoard from "./NoticeBoard";
import UserProfile from "../UserProfile";
import { useSelector } from "react-redux";
import PrincipalInfo from "./PrincipalInfo";
import CreatePosition from "./Position";

export default function AdminContent() {

    const { currentUser } = useSelector((state) => state.user);
    const [adminData, setAdminData] = useState(null);

    console.log(currentUser)

    useEffect(() => {
        const fetchData = async () => {
            if (currentUser) {
                try {
                    const response = await fetch(
                        "http://localhost:5000/api/admin/adminProfile",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ userId: currentUser.userId, type: currentUser.type }),
                        }
                    );
                    if (!response.ok) {
                        throw new Error("Failed to fetch teacher profile");
                    }
                    const responseData = await response.json();

                    console.log(responseData)
                    

                    setAdminData({
                        userData: responseData.userData.userData,
                        addressData: responseData.userData.addressData,
                        socialData: responseData.userData.socialData,
                        userStatusData: responseData.userData.userStatusData,
                        positionData: responseData.positionData
                    });

                } catch (error) {
                    console.error("Error:", error.message);
                }
            }
        };
        fetchData();
    }, [currentUser]);

    return (
        <div className="admin-content">
            <div id="admin-profile">
                {adminData && <UserProfile userData={adminData} />}

                <Profile
                    title="Sign In Information"
                />
            </div>
            <div id="school-info" className="admin-details">
                <h1>School Information</h1>
                <div className="row">
                    <div className="col-lg-12">
                        <SchoolInfo />
                    </div>
                </div>
            </div>
            <div id="principal-info" className="admin-details">
                <h1>Principal Information</h1>
                <div className="row">
                    <div className="col-lg-12">
                        <PrincipalInfo />
                    </div>
                </div>
            </div>
            <div id="position-info" className="admin-details">
                <h1>Position Information</h1>
                <div className="row">
                    <div className="col-lg-12">
                        <CreatePosition />
                    </div>
                </div>
            </div>
            <div id="notice-info" className="admin-details">
                <h1>Notice Board</h1>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="teacher-info">
                            <div className="create-teacher">
                                <NoticeBoard />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div id="create-user" className="admin-details">
                <h1>Create User</h1>
                <div className="row">
                    <div className="col-lg-12">
                        <UserCreate />
                    </div>
                </div>
            </div>
            {/* <div id="teacher-info" className="admin-details">
                <h1>Teacher Information</h1>
                <div className="row">
                    <div className="col-lg-12">
                        <TeacherInfo />
                    </div>
                </div>
            </div> */}
            <div id="staff-info" className="admin-details">
                <h1>Staff Information</h1>
                <div className="row">
                    <div className="col-lg-12">
                        <StaffInfo />
                    </div>
                </div>
            </div>
            {/* <div id="student-info" className="admin-details">
                <h1>student Information</h1>
                <div className="row">
                    <div className="col-lg-12">
                        <StudentInfo />
                    </div>
                </div>
            </div> */}
            {/* <div id="academic-info" className="admin-details">
                <h1>Academic Information</h1>
                <div className="row">
                    <div className="col-lg-12">
                        <AcademicInfo />
                    </div>
                </div>
            </div> */}
            {/* <div id="attendance-info" className="admin-details">
                <h1>Attendance Information</h1>
                <div className="row">
                    <div className="col-lg-12">
                        <AttendanceInfo />
                    </div>
                </div>
            </div> */}
            {/* <div id="result-info" className="admin-details">
                <h1>Result Information</h1>
                <div className="row">
                    <div className="col-lg-12">
                        <ResultInfo />
                    </div>
                </div>
            </div> */}
        </div>
    );
}