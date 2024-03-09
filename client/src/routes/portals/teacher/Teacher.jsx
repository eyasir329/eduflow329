import React from "react";
import TeacherSidebar from "./TeacherSidebar";
import PortalHead from "../PortalHead";
import TeacherContent from "./TeacherContent";

const Teacher = () => {

    return (
        <>
            <section id="admin">
                <div className="container">
                    <PortalHead
                        text="teacher"
                    />
                </div>
            </section>
            <section id="admin-main-content">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-12">
                            <div className="admin-left">
                               <TeacherSidebar />
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="admin-right">
                                <TeacherContent />
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default Teacher;


