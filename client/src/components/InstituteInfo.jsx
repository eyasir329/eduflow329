import React from "react";

function InstituteInfo(){
    return(
        <div className="extra-info">
            <div className="container mujib temporary2">
                <div className="row">
                    <div className="col-lg-4">
                        <img src="images/ins1.png" alt="mujib1"></img>
                    </div>
                    <div className="col-lg-4">
                        <img src="images/ins2.png" alt="mujib1"></img>
                    </div>
                    <div className="col-lg-4">
                        <img src="images/ins3.png" alt="mujib1"></img>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="stylebutton">
                            <a href="/InstituteDetails"><button>Institute Details</button></a>
                        </div>
                       
                    </div>
                    <div className="col-lg-4">
                        <div className="stylebutton">
                            <button>Student</button>
                        </div>
                        
                    </div>
                    <div className="col-lg-4">
                        <div className="stylebutton">
                            <button>Teacher</button>
                        </div>
                        
                    </div>
                </div>

                <div className="row temporary">
                    <div className="col-lg-4">
                        <img src="images/ins4.png" alt="mujib1"></img>
                    </div>
                    <div className="col-lg-4">
                        <img src="images/ins5.png" alt="mujib1"></img>
                    </div>
                    <div className="col-lg-4">
                        <img src="images/ins6.png" alt="mujib1"></img>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="stylebutton">
                            <button>Committee</button>
                        </div>
                       
                    </div>
                    <div className="col-lg-4">
                        <div className="stylebutton">
                            <button>Donor Member</button>
                        </div>
                        
                    </div>
                    <div className="col-lg-4">
                        <div className="stylebutton">
                            <button>Staff</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InstituteInfo;