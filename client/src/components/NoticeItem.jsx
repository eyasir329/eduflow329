import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function NoticeItem(props) {
    return (
        <a href="/">
            <div className="notice-content">
                <div className="col-lg-12">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="heading">
                                <span>Published on <FontAwesomeIcon icon={faCalendarDays} /> {props.publish}</span>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="title">
                                <p>{props.title}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
};