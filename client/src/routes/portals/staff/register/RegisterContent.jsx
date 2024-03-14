import React, { useEffect, useState } from "react";
import Profile from "../../SignInfoProfile";
import UserProfile from "../../UserProfile";
import { useSelector } from "react-redux";
import UserCreate from "../../UserCreate";
import NoticeBoard from "../../admin/NoticeBoard";
import TeacherInfo from "./TeacherInfo";
import AcademicInfo from "./AcademicInfo";


export default function RegisterContent() {

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
            <div id="register-profile">
                {adminData && <UserProfile userData={adminData} />}

                <Profile
                    title="Sign In Information"
                />
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


            <div id="teacher-info" className="admin-details">
                <h1>Teacher Information</h1>
                <div className="row">
                    <div className="col-lg-12">
                        <TeacherInfo />
                    </div>
                </div>
            </div>
            <div id="academic-info" className="admin-details">
                <h1>Academic Information</h1>
                <div className="row">
                    <div className="col-lg-12">
                        <AcademicInfo />
                    </div>
                </div>
            </div>

        </div>
    );
}