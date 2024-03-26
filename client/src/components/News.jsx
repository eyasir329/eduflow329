import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";

function News() {
  // Define news items
  const newsItems = [
    {
      title: "’বঙ্গবন্ধু সৃজনশীল মেধা অন্বেষণ প্রতিযোগিতা- ২০২৪' আয়োজন সংক্রান্ত",
      link: "/news1"
    },
    {
      title: "CRVS ব্যবস্থার আলোকে UID প্রদান সংক্রান্ত শিক্ষার্থী প্রোফাইল Update ও তথ্য হালনাগাদ সংক্রান্ত",
      link: "/news2"
    },
    {
      title: "২০২৪ সালের মাধ্যমিক স্কুল সার্টিফিকেট (এসএসসি) পরীক্ষার সময়সূচি",
      link: "/news3"
    }
  ];

  // State to manage the currently displayed news item index
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  useEffect(() => {
    // Function to update the current item index after a delay
    const intervalId = setInterval(() => {
      // Move to the next item or loop back to the first item if at the end
      setCurrentItemIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
    }, 25000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [newsItems.length]);

  // Render the current news item
  return (
    <div className="news-heading">
      <div className="container">
        <div className="row">
          <div className="col-lg-2 news-title">
            <div className="animate-charcter">
              Latest News <FontAwesomeIcon className="newsIcon" icon={faNewspaper} />
            </div>

          </div>
          <div className="col-lg-10">
            <div id="scroll-container">
              {/* Render only the current news item */}
              <div id="scroll-text">
                <a href={newsItems[currentItemIndex].link}>
                  <span>{newsItems[currentItemIndex].title}</span>
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
