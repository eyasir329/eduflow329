import React from "react";

const getCurrentYear = new Date().getFullYear(); 

function Footer(){
    return (
        <div className="footer-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <footer>
                            <span className="copyright">ⓒ</span>Copyright 2023-{getCurrentYear}<a href="eyasir329.com" target="_blank"> eyasir329</a> 
                        </footer>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Footer;