import React from "react";
function PhotoCarousal() {

  return (
    <div className="col-lg-8 photo-carousal">
      <div id="carouselIndicators" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="images/pic1.jpg" className="d-block w-100" alt="pic1" />
          </div>
          <div className="carousel-item">
            <img src="images/pic2.jpg" className="d-block w-100" alt="pic1" />
          </div>
          <div className="carousel-item">
            <img src="images/pic3.jpg" className="d-block w-100" alt="pic1" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

    </div>
  );
}

export default PhotoCarousal;