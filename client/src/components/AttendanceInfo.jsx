import React from "react";

function AttendanceInfo(){
    return(
        <div className="extra-info">
            <div className="container mujib temporary2">
                <div className="row">
                    <div className="col-lg-4">
                        <img src="images/att1.png" alt="mujib1"></img>
                    </div>
                    <div className="col-lg-4">
                        <img src="images/att2.png" alt="mujib1"></img>
                    </div>
                    <div className="col-lg-4">
                        <img src="images/att3.png" alt="mujib1"></img>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="stylebutton">
                            <button>Institute Wise</button>
                        </div>

                    </div>
                    <div className="col-lg-4">
                        <div className="stylebutton">
                            <button>Section Wise</button>
                        </div>

                    </div>
                    <div className="col-lg-4">
                        <div className="stylebutton">
                            <button>Student Wise</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default AttendanceInfo;