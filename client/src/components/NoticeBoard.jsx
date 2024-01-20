import React from "react";
import NoticeItem from "./NoticeItem";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NoticeBoard() {
    return (
        <div className="col-lg-4">
            <div id="notice">
                <div className="container">
                    <div className="notices">
                        <div className="row">

                            <div className="col-lg-12 ">

                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="notice-heading">
                                            <h4>
                                                <FontAwesomeIcon icon={faMessage} size="" style={{ color: "#4F6F52", marginRight: "10px", marginLeft: "10px" }} />
                                                Notice Board
                                            </h4>
                                        </div>
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="notice-main">
                                            {
                                                notice
                                                    .filter((item, index) => index < 3)
                                                    .map((item, index) => (
                                                        <NoticeItem
                                                            key={index}
                                                            title={item.title}
                                                            publish={item.publish}
                                                        />
                                                    ))
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="notice-more">
                                            <a href="/"> <span>READ ALL</span></a>
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

const notice = [
    {
        publish: "January 09,2024",
        title: "২০২৪ সালের মাধ্যমিক স্কুল সার্টিফিকেট (এসএসসি) পরীক্ষার সময়সূচি",
        src: ""
    },
    {
        publish: "January 08,2024",
        title: "২০২3 সালের মাধ্যমিক স্কুল সার্টিফিকেট (এসএসসি) পরীক্ষার সময়সূচি",
        src: ""
    },
    {
        publish: "January 07,2024",
        title: "২০২2 সালের মাধ্যমিক স্কুল সার্টিফিকেট (এসএসসি) পরীক্ষার সময়সূচি",
        src: ""
    },
    {
        publish: "January 09,2024",
        title: "২০২৪ সালের মাধ্যমিক স্কুল সার্টিফিকেট (এসএসসি) পরীক্ষার সময়সূচি",
        src: ""
    },
    {
        publish: "January 08,2024",
        title: "২০২3 সালের মাধ্যমিক স্কুল সার্টিফিকেট (এসএসসি) পরীক্ষার সময়সূচি",
        src: ""
    },
    {
        publish: "January 07,2024",
        title: "২০২2 সালের মাধ্যমিক স্কুল সার্টিফিকেট (এসএসসি) পরীক্ষার সময়সূচি",
        src: ""
    }
]

export default NoticeBoard;