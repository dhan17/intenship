import React from "react";
import "./Carousel.css";
import { Carousel } from "react-bootstrap";

const CarouselPart = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src="first.jpg" alt="First slide" />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="second.jpg" alt="Second slide" />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="third.jpg" alt="Third slide" />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselPart;
