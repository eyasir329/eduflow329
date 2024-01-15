import React from "react";

const getCurrentYear = new Date().getFullYear(); 

function Footer(){
    return (
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
                                                    <div className="ad-tex-ex">
                                                        <span> Address<br/>
                                                        Jamalpur</span>
                                                    </div>
                                                    
                                                </div>
                                                <div className="col-lg-4 adex ad-tex">
                                                    <div className="ad-tex-ex">
                                                    <span>Phone Number<br/>
                                                    02997772112</span>
                                                    </div>
                                                    
                                                </div>
                                                <div className="col-lg-4 ad-tex">
                                                    <div className="ad-tex-ex">
                                                    <span>Email Address<br/>
                                                        jamzilsch@yahoo.com</span>
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
                                                        <img src="images/logo.png" alt="" />
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
                <ul>
                    <li><i class="fa fa-facebook-official" aria-hidden="true"></i></li>
                    <li><a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
                    <li><a href="#"><i class="fa fa-linkedin-square" aria-hidden="true"></i></a></li>
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
    <input type="text" className="form-control"  placeholder="Phone Number" />
    </div>
    <div className="col-lg-6">
    <input type="email" className="form-control" placeholder="Email Address" />
    </div>
  </div>
  <div className="row">
  <div className="col-lg-12">
    <textarea name="content" rows="4" cols="40" placeholder="Message" />
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
                        
                        <div className="row footer-main">
                        <footer>
                            <div className="col-lg-12">
                                <span className="copyright">ⓒ </span>Copyright 2023-{getCurrentYear}<a href="eyasir329.com" target="_blank"> eyasir329</a> 
                            </div>
                        </footer>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Footer;