import React from "react";

export default function RegisterSidebar() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="admin-sidebar">
                        <div className="admin-extra">
                            <ul>
                                <a href="#register-profile"><li>profile</li></a>
                                <a href="#notice-info"><li>Notice</li></a>
                                <a href="#create-user"><li>Create</li></a>
                                <a href="#teacher-info"><li>Teacher</li></a>
                                <a href="#academic-info"><li>Academic</li></a>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}