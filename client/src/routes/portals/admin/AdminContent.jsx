import React from "react";
import SchoolInfo from "./SchoolInfo";
import Profile from "../../../components/functionality/Profile";
import TeacherInfo from "./TeacherInfo";
import StaffInfo from "./StaffInfo";
import StudentInfo from "./StudentInfo";
import AcademicInfo from "./AcademicInfo";
import AttendanceInfo from "./AttendanceInfo";
import ResultInfo from "./ResultInfo";
import AddressInfo from "./AddressInfo";

export default function AdminContent() {
    return (
        <div className="admin-content">
            <div id="admin-profile">
                <Profile
                    title="Admin"
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
            <div id="teacher-info" className="admin-details">
                <h1>Teacher Information</h1>
                <div className="row">
                    <div className="col-lg-12">
                        <TeacherInfo />
                    </div>
                </div>
            </div>
            <div id="staff-info" className="admin-details">
                <h1>Staff Information</h1>
                <div className="row">
                    <div className="col-lg-12">
                        <StaffInfo />
                    </div>
                </div>
            </div>
            <div id="student-info" className="admin-details">
                <h1>student Information</h1>
                <div className="row">
                    <div className="col-lg-12">
                        <StudentInfo />
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
            <div id="attendance-info" className="admin-details">
                <h1>Attendance Information</h1>
                <div className="row">
                    <div className="col-lg-12">
                        <AttendanceInfo />
                    </div>
                </div>
            </div>
            <div id="result-info" className="admin-details">
                <h1>Result Information</h1>
                <div className="row">
                    <div className="col-lg-12">
                        <ResultInfo />
                    </div>
                </div>
            </div>
            <div id="address-info" className="admin-details">
                <h1>Address Information</h1>
                <div className="row">
                    <div className="col-lg-12">
                        <AddressInfo />
                    </div>
                </div>
            </div>
        </div>
    );
}