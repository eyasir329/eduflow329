import React, { useState, useEffect } from "react";
import Profile from "../../../components/functionality/Profile";
import StudentTable from "./StudentTable";
import AttendanceInfo from "./AttendanceInfo";
import ResultInfo from "./ResultInfo";
import TeacherProfile from "./TeacherProfile";
import { useSelector } from "react-redux";
import CreateStudent from "./CreateStudent";

export default function TeacherContent() {
    const { currentUser } = useSelector((state) => state.user);
    const [teacherData, setTeacherData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (currentUser) {
                try {
                    const response = await fetch(
                        "http://localhost:5000/api/teacher/teacherProfile",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ userId: currentUser.userId }),
                        }
                    );
                    if (!response.ok) {
                        throw new Error("Failed to fetch teacher profile");
                    }
                    const responseData = await response.json();
                    setTeacherData(responseData);

                } catch (error) {
                    console.error("Error:", error.message);
                }
            }
        };
        fetchData();
    }, [currentUser]);

    return (
        <div className="admin-content">
            <div id="login-profile">
                <Profile title="Teacher Profile" />
            </div>

            <div id="user-profile" className="admin-details teacher-profile-dashboard">
                <h1>Teacher Information</h1>
                <div className="row">
                    <div className="col-lg-12">
                        <TeacherProfile teacherData={teacherData} />
                    </div>
                </div>
            </div>

            <div id="teacher-student-info" className="admin-details teacher-profile-dashboard">
                {/* <h1>Student Information</h1> */}
                <div className="row">
                    <div className="col-lg-12">
                    <h1>Enroll A Student</h1>
                        <div className="teacher-view-ex">
                            <div className="teacher-view">
                                <CreateStudent/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="teacher-view-ex">
                            <div className="teacher-view">
                                <StudentTable/>
                            </div>
                        </div>
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
