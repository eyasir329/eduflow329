import React from "react";

function Corner(){
    return(
        <div className="extra-info">
            <div className="container mujib temporary2">
                <div className="row">
                    <div className="col-lg-4">
                        <img src="images/cor1.png" alt="mujib1"></img>
                    </div>
                    <div className="col-lg-4">
                        <img src="images/cor2.png" alt="mujib1"></img>
                    </div>
                    <div className="col-lg-4">
                        <img src="images/cor3.png" alt="mujib1"></img>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="mujib-text">
                            <span>Photo Corner</span>
                        </div>
                       
                    </div>
                    <div className="col-lg-4">
                        <div className="mujib-text">
                            <span>Video Corner</span>
                        </div>
                        
                    </div>
                    <div className="col-lg-4">
                        <div className="mujib-text">
                            <span>Download Corner</span>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Corner;