import React from "react";

function SemesterExamInfo(){
    return(
        <div className="extra-info">
            <div className="container mujib temporary3">
                <div className="row">
                    <div className="col-lg-3">
                        <img src="images/res1.png" alt="mujib1"></img>
                    </div>
                    <div className="col-lg-3">
                        <img src="images/res2.png" alt="mujib1"></img>
                    </div>
                    <div className="col-lg-3">
                        <img src="images/res3.png" alt="mujib1"></img>
                    </div>
                    <div className="col-lg-3">
                        <img src="images/res4.png" alt="mujib1"></img>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-3">
                        <div className="mujib-text">
                            <span>Merit List</span>
                        </div>
                       
                    </div>
                    <div className="col-lg-3">
                        <div className="mujib-text">
                            <span>Fail List</span>
                        </div>
                        
                    </div>
                    <div className="col-lg-3">
                        <div className="mujib-text">
                            <span>Section Wise</span>
                        </div>
                        
                    </div>
                    <div className="col-lg-3">
                        <div className="mujib-text">
                            <span>Student Wise</span>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SemesterExamInfo;