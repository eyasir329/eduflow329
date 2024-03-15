import React, { useState, useEffect } from "react";
import Profile from '../SignInfoProfile'
import StudentTable from "./StudentTable";
import AttendanceInfo from "./AttendanceInfo";
import ResultInfo from "./ResultInfo";
import { useSelector } from "react-redux";
import CreateStudent from "./CreateStudent";
import UserProfile from "../UserProfile";
import NoticeBoard from "../admin/NoticeBoard";
import UserCreate from "../UserCreate";

export default function TeacherContent() {
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
            <div id="teacher-profile">
                {adminData && <UserProfile userData={adminData} />}

                <Profile
                    title="Sign In Information"
                />
            </div>

            <div id="notice-info" className="admin-details notice-extra">
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

            <div id="teacher-attendance-info" className="admin-details">
                <h1>Attendance Information</h1>
                <div className="row">
                    <div className="col-lg-12">
                        <AttendanceInfo />
                    </div>
                </div>
            </div>

            <div id="teacher-result-info" className="admin-details">
                <h1>Result Information</h1>
                <div className="row">
                    <div className="col-lg-12">
                        <ResultInfo />
                    </div>
                </div>
            </div>
        </div>
    );
}
