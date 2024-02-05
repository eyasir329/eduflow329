import React from "react";
import AdminSchoolInfo from "./AdminSchoolInfo";
import Profile from "../../../components/Profile";
import TeacherInfo from "./TeacherInfo";
import StaffInfo from "./StaffInfo";

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
                        <AdminSchoolInfo />
                    </div>
                </div>
            </div>
            {/* <div id="principal-info" className="admin-details">
                <h1>Principal Information</h1>
            </div> */}
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
            </div>
            <div id="parent-info" className="admin-details">
                <h1>parent Information</h1>
            </div>
            <div id="address-info" className="admin-details">
                <h1>Address Information</h1>
            </div>
            <div id="academic-info" className="admin-details">
                <h1>Academic Information</h1>
            </div>
            <div id="result-info" className="admin-details">
                <h1>Result Information</h1>
            </div>
            <div id="notice-board" className="admin-details">
                <h1>Notice Board</h1>
            </div>
        </div>
    );
}