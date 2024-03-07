import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faLocationDot, faSquarePhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

function Footer() {
    return (
        <>
            <footer>
                <div className="end-section"></div>
                <section id="footer">
                    <div className="footer-section">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-12">

                                    <div className="row">
                                        <div className="col-lg-12 address-temp">
                                            <div className="row ">
                                                <div className="col-lg-12 address-up">
                                                    <div className="address-extra">

                                                        <div className="row">
                                                            <div className="col-lg-4 ad-tex">
                                                                <div className="row adr-extra">
                                                                    <div className="col-lg-12">
                                                                        <div className="row adr-icon">
                                                                            <FontAwesomeIcon icon={faLocationDot} />
                                                                        </div>
                                                                        <div className="row">
                                                                            <span className="sp-text"> Address</span>
                                                                        </div>
                                                                        <div className="row">
                                                                            <span>Jamalpur</span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                            <div className="col-lg-4 adex ad-tex">
                                                                <div className="row adr-extra">
                                                                    <div className="col-lg-12">
                                                                        <div className="row adr-icon">
                                                                            <FontAwesomeIcon icon={faSquarePhone} />
                                                                        </div>
                                                                        <div className="row">
                                                                            <span className="sp-text">Phone Number</span>
                                                                        </div>
                                                                        <div className="row">
                                                                            <span>02997772112</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-lg-4 ad-tex">
                                                                <div className="row adr-extra">
                                                                    <div className="col-lg-12">
                                                                        <div className="row adr-icon">
                                                                            <FontAwesomeIcon icon={faEnvelope} />
                                                                        </div>
                                                                        <div className="row">
                                                                            <span className="sp-text">Email Address</span>
                                                                        </div>
                                                                        <div className="row">
                                                                            <span>jamzilsch@yahoo.com</span>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="address-main">
                                                        <div className="row addr-content">
                                                            <div className="col-lg-4">
                                                                <div className="footer-logo">
                                                                    <img src="../images/logo.png" alt="" />
                                                                </div>

                                                            </div>
                                                            <div className="col-lg-4">
                                                                <div className="footer-middle">
                                                                    <ul>
                                                                        <li>প্রাতিষ্ঠানিক কার্যক্রম</li>
                                                                        <li>ভর্তি তথ্য </li>
                                                                        <li>চাকরি বিজ্ঞপ্তি</li>
                                                                        <li>রেজাল্ট অনুসন্ধান</li>
                                                                        <li>প্রতিষ্ঠান প্রশাসন</li>
                                                                    </ul>
                                                                    <ul className="icon">

                                                                        <li><FontAwesomeIcon icon={faFacebook} /></li>
                                                                        <li><FontAwesomeIcon icon={faTwitter} /></li>
                                                                        <li><FontAwesomeIcon icon={faLinkedin} /></li>

                                                                    </ul>


                                                                </div>
                                                            </div>
                                                            <div className="col-lg-4">
                                                                <div className="footer-form">
                                                                    <form className="user-form">
                                                                        <div className="row">
                                                                            <div className="col-lg-12">
                                                                                <input type="text" className="form-control" placeholder="Your Name" required />
                                                                            </div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-lg-6">
                                                                                <input type="text" className="form-control" placeholder="Phone Number" />
                                                                            </div>
                                                                            <div className="col-lg-6">
                                                                                <input type="email" className="form-control" placeholder="Email Address" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-lg-12">
                                                                                <textarea name="content" rows="6" cols="40" placeholder="  Message" />
                                                                            </div>
                                                                        </div>

                                                                        <button className="btn btn-primary" type="submit">Submit form</button>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </footer>
        </>
    );
}

export default Footer;