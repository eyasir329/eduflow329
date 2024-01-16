import React from "react";
import Header from "./Header";
import NavbarExtra from "./NavbarExtra";
import News from "./News";
import Footer from "./Footer";
import PhotoCarousal from "./PhotoCarousal";
import NoticeBoard from "./NoticeBoard";
import HeadTeacher from "./HeadTeacher";
import SchoolInfo from "./SchoolInfo";
import MujibCorner from "./MujibCorner";
import ExtraInfo from "./ExtraInfo";
import InstituteInfo from "./InstituteInfo";
import Corner from "./Carner";
import AcademicInfo from "./AcademicInfo";
import AttendanceInfo from "./AttendanceInfo";
import RoutineInfo from "./RoutineInfo";
import SemesterExamInfo from "./SemesterExamInfo";
import Portal from "./Portal";


function App() {
    return (
        <div>
           



            <News />
            <div className="white-section article">
                <div className="container">
                    <div className="row">
                        <PhotoCarousal />
                        <NoticeBoard />
                    </div>
                </div>
            </div>
            <HeadTeacher />
            <SchoolInfo />
            <MujibCorner />
            <ExtraInfo />

            <div className="colored-section institute-head">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2>Institute Information</h2>
                        </div>
                    </div>
                </div>
            </div>

            <InstituteInfo />

            <div className="colored-section institute-head">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2>Corner</h2>
                        </div>
                    </div>
                </div>
            </div>

            <Corner />

            <div className="colored-section institute-head">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2>Academic Information</h2>
                        </div>
                    </div>
                </div>
            </div>

            <AcademicInfo />

            <div className="colored-section institute-head">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2>Attendance Information</h2>
                        </div>
                    </div>
                </div>
            </div>

            <AttendanceInfo />

            <div className="colored-section institute-head">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2>Routine Information</h2>
                        </div>
                    </div>
                </div>
            </div>

            <RoutineInfo />

            <div className="colored-section institute-head">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h2>Semester Exam Information</h2>
                        </div>
                    </div>
                </div>
            </div>

            <SemesterExamInfo />
            <Portal />
            
        </div>
    );
}

export default App;
