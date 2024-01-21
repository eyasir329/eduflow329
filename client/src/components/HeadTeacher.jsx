import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faLink } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

function HeadTeacher() {
    const [showMoreContent, setShowMoreContent] = useState(false);
    const handleChange = () => {
        setShowMoreContent(!showMoreContent);
    };

    return (
        <div className="head-teacher" id="head-teacher">
            <div className=" colored-section">
            </div>
            <div className="white-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="teacher-extra">
                                <div className="teacher-content">
                                    <div className="row">

                                        <div className="col-lg-8">
                                            <div className="teacher-left">
                                                <div className="row">
                                                    <div className="col-lg-4">
                                                        <div className="tll">
                                                            <div className="row">
                                                                <div className="col-lg-12">
                                                                    <div className="tll-image">
                                                                        <img src={headteacher.photo} alt="head-teacher" ></img>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-lg-12">
                                                                    <div className="tll-list">
                                                                        <ul className="icon">
                                                                            <li><FontAwesomeIcon icon={faEnvelope} /></li>
                                                                            <li><FontAwesomeIcon icon={faFacebook} /></li>
                                                                            <li><FontAwesomeIcon icon={faLinkedin} /></li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-8">
                                                        <div className="tlr">
                                                            <h5>Head Teacher</h5>
                                                            <h4>{headteacher.name}</h4>
                                                            <hr />
                                                            <p>{showMoreContent ? headteacher.content : headteacher.content.substring(0, 550) + "..."}</p>
                                                            {showMoreContent ? <div><p>{headteacher.name}</p>
                                                                <p>Head Teacher</p>
                                                                <p>Jamalpur Zilla School</p></div> : ""}
                                                            <button onClick={handleChange}>{showMoreContent ? "Show Less" : "For More"}</button>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-4">
                                            <div className="teacher-right-link">
                                                <div className="row">

                                                    <div className="col-lg-12">

                                                        <div class="link-main">
                                                            <div className="link-title">
                                                                <span className="link-icon"><FontAwesomeIcon icon={faLink} /></span>
                                                                <span className="link-content">Important Links</span>
                                                            </div>
                                                            <ul>
                                                                <li><span>1</span>  মাধ্যমিক ও উচ্চমাধ্যমিক শিক্ষাবোর্ড, ময়নসিংহ</li>
                                                                <li><span>2</span> অনলাইন ক্লাশ</li>
                                                                <li><span>3</span> ইউটিউব চ্যানেল</li>

                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <Link to="/ImportantLink"><button className="imp-button">Explore all</button> </Link>

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
    );
}

const headteacher = {
    name: "Halima Khatun",
    photo: "images/head.png",
    content: "It is my pleasure to welcome all of you to Jamalpur Zilla School. It has started its long journey long long years ago in 1881 as a dream of T. A Donough, former S.D.O. Jamalpur subdivision, coming true. It stands on the southern bank of the old Brahmaputra in a marvelous scenario – one side with natural beauty and other on with urban privilege. Here you can find about all the facilities of digital era. Whole campus is under network of CCTV camera. Class rooms are equipped with multimedia. About 1600 students from classes 3 to 10 study here within two shifts. Results of internal examinations are published online. Students can pay their fees through mobile banking. Guardians are informed their query, notice, important message, students attendance and every aspects of school through SMS. The school offers courses of studies science, humanities and business studies. Students choose any one according to their aptitude. The standard teaching is highly appreciated by the higher authorities concerned and the guardians. The students get chance to take part in a lot of co-curricular activities including Scouts, BNCC, Red Crescent, Sports and games, Debate, Science fair and other cultural activities. It has a library with an adequate number of books on various subjects. It has also different science laboratories. The school has a good reputation of its outstanding results of PEC, JSC and SSC examination that made it the best school in the district of Jamalpur. Good luck to all and may the life be a prosperous one filled with fun and success .",
    mail: "abc@gmail.com",
    fb: "fb.com/abc",
    linkedin: "abc"
}

export default HeadTeacher;