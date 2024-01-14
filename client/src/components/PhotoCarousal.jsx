import React from "react";
function PhotoCarousal(){
    
    return (
        <div className="col-lg-8 photo-carousal">
          <div id="carouselIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="images/pic1.jpg" class="d-block w-100" alt="pic1" />
    </div>
    <div class="carousel-item">
      <img src="images/pic2.jpg" class="d-block w-100" alt="pic1" />
    </div>
    <div class="carousel-item">
      <img src="images/pic3.jpg" class="d-block w-100" alt="pic1" />
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
   
        </div>
    );
}

export default PhotoCarousal;