import React from "react";
import PortalHead from "../../PortalHead";
import RegisterSidebar from "./RegisterSidebar";
import RegisterContent from "./RegisterContent";

const Register = () => {

    return (
        <>
            <section id="admin">
                <div className="container">
                    <PortalHead
                        text="register"
                    />
                </div>
            </section>
            <section id="admin-main-content">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-12">
                            <div className="admin-left">
                                <RegisterSidebar />
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="admin-right">
                                <RegisterContent />
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default Register;


