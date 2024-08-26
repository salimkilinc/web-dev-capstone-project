import React, { useState } from "react";
import { data, web } from "../data/projectsData";
import { GrPrevious, GrNext } from "react-icons/gr";

const Carousel = (props) => {
  const activeSection = props.section === "data" ? data : web;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? activeSection.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === activeSection.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="carousel">
      <button className="carousel-control prev" onClick={handlePrevious}>
        <GrPrevious />
      </button>
      <div className="carousel-slides">
        {activeSection.map((slide, index) => (
          <div
            key={index}
            className={`carousel-slide ${
              index === currentIndex ? "active" : ""
            }`}
          >
            <img
              src={slide.imagePath}
              alt={slide.title}
              className="carousel-image"
            />
            <div className="carousel-caption">
              <h3>{slide.title}</h3>
              <h4>{slide.subtitle}</h4>
              <p>
                {slide.description}{" "}
                <a href={slide.link} className="external-link" target="_blank">
                  Read More
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-control next" onClick={handleNext}>
        <GrNext />
      </button>
      <div className="carousel-indicators">
        {activeSection.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
