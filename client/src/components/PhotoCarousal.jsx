import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

function PhotoCarousal() {
  return (
    <div className="col-lg-8">
      <div className="photo-carousal">
        <div id="carouselIndicators" className="carousel slide" data-bs-ride="carousel">


          <div className="carousel-indicators">

            {images.map((image, key) => (
              <button
                type="button"
                data-bs-target="#carouselIndicators"
                data-bs-slide-to={key}
                className={key === 0 ? "active button" : "button"}
                aria-current={key === 0 && "true"}
                aria-label={image.alt}
                key={`indicator-${key}`}
              ></button>
            ))}

          </div>


          <div className="carousel-inner">
            {images.map((image, index) => (
              <div
                className={index === 0 ? "carousel-item active" : "carousel-item"}
                key={`carousel-item-${index}`}
              >
                <img src={image.src} className="d-block w-100" alt={image.alt} />
              </div>
            ))}

          </div>


          <button className="carousel-control-prev" type="button" data-bs-target="#carouselIndicators" data-bs-slide="prev">
            <FontAwesomeIcon icon={faAngleLeft} size="2xl" style={{ color: "#fff", }} />
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselIndicators" data-bs-slide="next">
            <FontAwesomeIcon icon={faAngleRight} size="2xl" style={{ color: "#fff", }} />
          </button>

        </div>

      </div>
    </div>
  );
}




const images = [
  {
    src: "images/pic1.jpg",
    alt: "pic1"
  },
  {
    src: "images/pic2.jpg",
    alt: "pic2"
  },
  {
    src: "images/pic3.jpg",
    alt: "pic3"
  },
  {
    src: "images/pic1.jpg",
    alt: "pic1"
  },
  {
    src: "images/pic2.jpg",
    alt: "pic2"
  },
  {
    src: "images/pic3.jpg",
    alt: "pic3"
  }
];

export default PhotoCarousal;