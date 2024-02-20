import React from "react";
import Profile from "../../../components/functionality/Profile";
import StudentTable from "./StudentTable";
import AttendanceInfo from "./AttendanceInfo";
import ResultInfo from "./ResultInfo";

export default function TeacherContent() {
    return (
        <div className="admin-content">
            <div id="teacher-profile">
                <Profile
                    title="Teacher Profile"
                />
            </div>

            <div id="teacher-student-info" className="admin-details teacher-profile-dashboard">
                <h1>Student Information</h1>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="teacher-view-ex">
                            <div className="teacher-view">
                                <StudentTable />
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
            {/* next time  */}
            {/* <div id="teacher-homework-info" className="admin-details">
                <h1>Homework Information</h1>
                <div className="row">
                    <div className="col-lg-12">
                        <HomeworkInfo />
                    </div>
                </div>
            </div> */}

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