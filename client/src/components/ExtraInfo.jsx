import React from "react";

function ExtraInfo() {
    return (
        <div className="white-section extra-info">
            <div className="container mujib">
                <div className="row">
                    <div className="col-lg-4">
                        <img src="images/temp1.png" alt="mujib1"></img>
                    </div>
                    <div className="col-lg-4">
                        <img src="images/temp2.png" alt="mujib1"></img>
                    </div>
                    <div className="col-lg-4">
                        <img src="images/temp3.png" alt="mujib1"></img>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="stylebutton">
                            <button>বিস্তারিত</button>
                        </div>

                    </div>
                    <div className="col-lg-4">
                        <div className="stylebutton">
                            <button>বিস্তারিত</button>
                        </div>

                    </div>
                    <div className="col-lg-4">
                        <div className="stylebutton">
                            <button>বিস্তারিত</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExtraInfo;