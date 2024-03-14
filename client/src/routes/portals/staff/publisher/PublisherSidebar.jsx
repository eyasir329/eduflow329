import React from "react";

export default function PublisherSidebar() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="admin-sidebar">
                        <div className="admin-extra">
                            <ul>
                                <a href="#publisher-profile"><li>profile</li></a>
                                <a href="#notice-info"><li>Notice</li></a>
                                <a href="#notice-info"><li>Exam</li></a>
                                <a href="#notice-info"><li>Result</li></a>
                                <a href="#notice-info"><li>Publish<br></br> Result</li></a>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}