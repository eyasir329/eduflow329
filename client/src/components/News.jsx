import React from "react";

function News() {
  return (
    <div className="news-heading">
      <div className="container">
        <div className="row">
          <div className="col-lg-2 news-title">
            <span className="animate-charcter">Latest News</span>
          </div>
          <div className="col-lg-10">
            <div id="scroll-container">
              <div id="scroll-text">
                <a href="/" >
                  <span>২০২৪ সালের মাধ্যমিক স্কুল সার্টিফিকেট (এসএসসি) পরীক্ষার সময়সূচি</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;