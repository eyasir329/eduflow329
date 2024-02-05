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
                                <a href="#school-info"><li>School Info</li></a>
                                {/* <a href="#principal-info"><li>Principal</li></a> */}
                                <a href="#teacher-info"><li>Teacher</li></a>
                                <a href="#staff-info"><li>Staff</li></a>
                                <a href="#student-info"><li>Student</li></a>
                                <a href="#parent-info"><li>Parent</li></a>
                                <a href="#address-info"><li>Address</li></a>
                                <a href="#academic-info"><li>Academic</li></a>                                    <a href="#subject-info"><li>Subject</li></a>
                                <a href="#result-info"><li>Result</li></a>                                  
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}