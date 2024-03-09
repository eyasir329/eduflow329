import React from "react";
import Profile from '../SignInfoProfile'
import PresentInfo from "./PresentInfo";
import ResultInfo from "./ResultInfo";

export default function Parent() {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <Profile
                            title="Parent Portal"
                        />
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="teacher-view-ex">
                            <div className="teacher-view">
                                <h1>Attendance Info</h1>
                                <PresentInfo />
                            </div>
                        </div>

                    </div>

                </div>

            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="teacher-view-ex">
                            <div className="teacher-view">
                                <h1>Result Info</h1>
                                <ResultInfo />
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </>
    );
}