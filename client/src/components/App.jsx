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

function App() {
  return (
    <div>
      <Header />
      <NavbarExtra />
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
      <Footer />
    </div>
  );
}

export default App;
