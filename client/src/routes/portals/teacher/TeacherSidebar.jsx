import React from "react";

export default function teacherSidebar() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="admin-sidebar">
                        <div className="admin-extra">
                            <ul>
                                <a href="#login-profile"><li>User</li></a>
                                <a href="#teacher-profile"><li>Profile</li></a>
                                <a href="#teacher-student-info"><li>Student</li></a>
                                <a href="#teacher-attendance-info"><li>Attendance</li></a>
                                <a href="#teacher-result-info"><li>Result</li></a>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}