import React from "react";
import PortalHead from "../../PortalHead";
import LibrarianSidebar from "./LibrarianSidebar";
import LibrarianContent from "./LibrarianContent";

const Librarian = () => {

    return (
        <>
            <section id="admin">
                <div className="container">
                    <PortalHead
                        text="librarian"
                    />
                </div>
            </section>
            <section id="admin-main-content">
                <div className="container">
                    <div className="row">

                        <div className="col-lg-12">
                            <div className="admin-left">
                                <LibrarianSidebar />
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="admin-right">
                                <LibrarianContent />
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
};

export default Librarian;


