import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function Carrousel() {
  return (
    <>
      <div id="carouselExampleIndicators" className="carousel slide w-100" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://via.placeholder.com/1920x500.png?text=Welcome+to+DSS" className="d-block w-100" alt="Slide 1" />
          </div>
          <div className="carousel-item">
            <img src="https://via.placeholder.com/1920x500.png?text=Secure+Data+Storage" className="d-block w-100" alt="Slide 2" />
          </div>
          <div className="carousel-item">
            <img src="https://via.placeholder.com/1920x500.png?text=Scalable+Cloud+Solutions" className="d-block w-100" alt="Slide 3" />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}