import React, { useState, useEffect } from "react";

function HeaderMain() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/public/viewSchool");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                console.log(data)
                
                setData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    const {
        // eiin_number,
        school_name,
        // established_at,
        logo,
        // street_address,
        // email,
        // phone,
        // facebook,
        // linkedin,
        city,
        // division,
        // zip,
        // history,
    } = data;

    // Truncate history to 20 characters
    //   const truncatedHistory = history.substring(0, 20);


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
                                            <img src={logo} alt="logo" style={{ borderRadius: '50%' }} />
                                        </div>

                                        <div className="col-lg-10 col-sm-10">
                                            <div className="row title-midle">
                                                <div className="col-lg-12 title-item">
                                                    <span className="logo-title">{school_name}</span>
                                                    <br />
                                                    <span className="logo-address">{city}</span>
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
