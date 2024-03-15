import React, { useEffect, useState } from "react";
import Profile from "../../SignInfoProfile";
import NoticeBoard from "../../admin/NoticeBoard";
import UserProfile from "../../UserProfile";
import { useSelector } from "react-redux";

export default function LibrarianContent() {

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
            <div id="librarian-profile">
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
           
        </div>
    );
}