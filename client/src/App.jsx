import React from "react";
import PhotoCarousal from "./components/PhotoCarousal";
import NoticeBoard from "./components/NoticeBoard";
import HeadTeacher from "./components/HeadTeacher";
import SchoolInfo from "./components/SchoolInfo";
import MujibCorner from "./components/MujibCorner";
import ExtraInfo from "./components/ExtraInfo";
import InstituteInfo from "./components/InstituteInfo";
import Corner from "./components/Carner";
import AcademicInfo from "./components/AcademicInfo";
import AttendanceInfo from "./components/AttendanceInfo";
import RoutineInfo from "./components/RoutineInfo";
import SemesterExamInfo from "./components/SemesterExamInfo";
import Portal from "./components/Portal";

const App = () => {
    return (
        <div>
            <section className="white-section" id="banner">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">
                                <PhotoCarousal />
                                <NoticeBoard />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <HeadTeacher />

            <SchoolInfo />
            <MujibCorner />
            <ExtraInfo />

            <div className="colored-section institute-head" id="institute-info">
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
            <div className="white-section end-section"></div>
        </div>
    );
};

export default App;
