import React from "react";
import PortalHead from "../../PortalHead";
import PublisherSidebar from "./PublisherSidebar";
import PublisherContent from "./PublisherContent";

const Admin = () => {

    return (
        <>
            <section id="admin">
                <div className="container">
                    <PortalHead
                        text="publisher"
                    />
                </div>
            </section>
            <section id="admin-main-content">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-12">
                            <div className="admin-left">
                                <PublisherSidebar />
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="admin-right">
                                <PublisherContent />
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default Admin;


