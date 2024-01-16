import React from "react";

function SchoolInfo() {
    return (
        <div className="colored-section school-color">
            <div className="container school-info">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="school-heading">
                                    <h1>Welcome To</h1>
                                    <h1>Jamalpur Zilla School</h1>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="school-left">

                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="histo-heading">
                                                <h1>History of our Institute</h1>
                                            </div>

                                            <div className="histo-content">
                                                <p>
                                                    amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin libero nunc consequat interdum varius sit amet mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat semper viverra nam libero justo laoreet sit amet cursus sit amet dictum sit amet justo donec enim diam vulputate ut pharetra sit amet aliquam id diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui sapien eget mi proin sed libero
                                                </p>
                                                {/* <p>
                                    amet mauris commodo quis imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin libero nunc consequat interdum varius sit amet mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor posuere ac ut consequat semper viverra nam libero justo laoreet sit amet cursus sit amet dictum sit amet justo donec enim diam vulputate ut pharetra sit amet aliquam id diam maecenas ultricies mi eget mauris pharetra et ultrices neque ornare aenean euismod elementum nisi quis eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra justo nec ultrices dui sapien eget mi proin sed libero
                                            </p> */}
                                            </div>
                                        </div>
                                    </div>



                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="school-right">
                                    <img src="images/pic2.jpg" className="d-block w-100" alt="pic1" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SchoolInfo;