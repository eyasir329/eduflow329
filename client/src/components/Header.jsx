import React from "react";

function Header(){
    return (
        <div className="colored-section">
            <div className="container">
                <header>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-lg-1 header-left">
                                    <img src="images/logo.png" alt="logo"/>
                                </div>
                                <div className="col-lg-5 header-left-title">
                                    <span>Jamalpur Zilla School</span>
                                    <br />
                                    <span className="address">Jamalpur</span>
                                </div>
                                <div className="col-lg-6 header-right">
                                    <div className="header-img">
                                        <img src="images/mujib100.png" alt="logo"/>
                                        <img src="images/bd50yr.png" alt="logo"/>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        </div>
    );
}

export default Header;