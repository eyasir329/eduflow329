import React from "react";

export default function AdminSidebar() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="admin-sidebar">
                        <div className="admin-extra">
                            <ul>
                                <a href="#admin-profile"><li>profile</li></a>
                                <a href="#school-info"><li>School</li></a>
                                <a href="#teacher-info"><li>Teacher</li></a>
                                <a href="#staff-info"><li>Staff</li></a>
                                <a href="#student-info"><li>Student</li></a>
                                <a href="#academic-info"><li>Academic</li></a>
                                <a href="#attendance-info"><li>Attendance</li></a>
                                <a href="#result-info"><li>Result</li></a>
                                <a href="#address-info"><li>Address</li></a>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}