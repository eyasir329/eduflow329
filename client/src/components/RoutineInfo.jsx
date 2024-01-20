import React from "react";

function RoutineInfo() {
    return (
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
                        <div className="stylebutton">
                            <button>Class Routine</button>
                        </div>

                    </div>
                    <div className="col-lg-4">
                        <div className="stylebutton">
                            <button>Exam Routine</button>
                        </div>

                    </div>
                    <div className="col-lg-4">
                        <div className="stylebutton">
                            <button>Online Class Routine</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoutineInfo;