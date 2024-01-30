import React from "react";

function HeaderMain() {
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
                                            <img src="https://i.postimg.cc/dV9r5NhW/logo.png" alt="logo" />
                                        </div>

                                        <div className="col-lg-10 col-sm-10">
                                            <div className="row title-midle">
                                                <div className="col-lg-12 title-item">
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
                                        <img src="https://i.postimg.cc/9wY7dQr7/mujib100.png" alt="logo" />
                                        <img src="https://i.postimg.cc/BP0FPKQ3/bd50yr.png" alt="logo" />
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

export default HeaderMain;


