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
                        <div className="stylebutton">
                            <button>Merit List</button>
                        </div>
                       
                    </div>
                    <div className="col-lg-3">
                        <div className="stylebutton">
                            <button>Fail List</button>
                        </div>
                        
                    </div>
                    <div className="col-lg-3">
                        <div className="stylebutton">
                            <button>Section Wise</button>
                        </div>
                        
                    </div>
                    <div className="col-lg-3">
                        <div className="stylebutton">
                            <button>Student Wise</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SemesterExamInfo;