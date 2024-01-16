import React from "react";

function Header() {
    return (
        <section className="colored-section" id="title">
            <div className="container">
                <header>
                    <div className="row">

                        <div className="col-lg-12">

                            <div className="row">

                                <div className="col-lg-6 header-left">

                                    <div className="row">
                                        <div className="col-lg-2 col-sm-2">
                                            <img src="images/logo.png" alt="logo" />
                                        </div>

                                        <div className="col-lg-10 col-sm-10">
                                            <div className="row title-midle">
                                                <div className="col-lg-12">
                                                    <span className="logo-title">Jamalpur Zilla School</span>
                                                    <br />
                                                    <span className="logo-address">Jamalpur</span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                                <div className="col-lg-6 header-right">

                                    <div className="header-img">
                                        <img src="images/mujib100.png" alt="logo" />
                                        <img src="images/bd50yr.png" alt="logo" />
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>
                </header>
            </div>
        </section>
    );
}

export default Header;