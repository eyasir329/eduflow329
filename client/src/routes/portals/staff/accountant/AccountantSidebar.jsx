import React from "react";

export default function AccountantSidebar() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="admin-sidebar">
                        <div className="admin-extra">
                            <ul>
                                <a href="#accountant-profile"><li>profile</li></a>
                                <a href="#notice-info"><li>notice</li></a>
                                <a href="#accountant-profile"><li>budget</li></a>
                                <a href="#accountant-profile"><li>cost</li></a>
                                <a href="#accountant-profile"><li>fee info</li></a>
                                <a href="#accountant-profile"><li>payment</li></a>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}