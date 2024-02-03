import React from "react";
import { Link } from "react-router-dom";

function PortalLink(){
    return (
        <div className="portal">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 portal-heading">
                        <h3>Student/Parent Portal</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 portal-login">
                        <Link to="/portal/login"><button>Log In</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PortalLink;

