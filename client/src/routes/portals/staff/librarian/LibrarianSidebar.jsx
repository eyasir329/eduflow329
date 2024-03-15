import React from "react";

export default function LibrarianSidebar() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="admin-sidebar">
                        <div className="admin-extra">
                            <ul>
                                <a href="#librarian-profile"><li>profile</li></a>
                                <a href="#notice-info"><li>Notice</li></a>
                                <a href="#notice-info"><li>Book</li></a>
                                <a href="#notice-info"><li>Request</li></a>
                                <a href="#notice-info"><li>Where</li></a>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}