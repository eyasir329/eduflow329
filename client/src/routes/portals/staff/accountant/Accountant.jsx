import React from "react";
import PortalHead from "../../PortalHead";
import AccountantSidebar from "./AccountantSidebar";
import AccountantContent from "./AccountantContent";

const Accountant = () => {

    return (
        <>
            <section id="admin">
                <div className="container">
                    <PortalHead
                        text="accountant"
                    />
                </div>
            </section>
            <section id="admin-main-content">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-12">
                            <div className="admin-left">
                                <AccountantSidebar />
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="admin-right">
                                <AccountantContent />
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default Accountant;


