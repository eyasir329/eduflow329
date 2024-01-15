import React from "react";

function RoutineInfo(){
    return(
        <div className="extra-info">
            <div className="container mujib temporary2">
                <div className="row">
                    <div className="col-lg-4">
                        <img src="images/rou1.png" alt="mujib1"></img>
                    </div>
                    <div className="col-lg-4">
                        <img src="images/rou2.png" alt="mujib1"></img>
                    </div>
                    <div className="col-lg-4">
                        <img src="images/rou3.png" alt="mujib1"></img>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="mujib-text">
                            <span>Class Routine</span>
                        </div>
                       
                    </div>
                    <div className="col-lg-4">
                        <div className="mujib-text">
                            <span>Exam Routine</span>
                        </div>
                        
                    </div>
                    <div className="col-lg-4">
                        <div className="mujib-text">
                            <span>Online Class Routine</span>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoutineInfo;