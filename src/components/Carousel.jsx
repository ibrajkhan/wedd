import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Banner1 from "../assets/Image/Img1.jpg";
import Banner2 from "../assets/Image/Img2.png";
import Banner3 from "../assets/Image/Img3.png";
import Banner4 from "../assets/Image/Img4.png";

import Slide1 from "../assets/Image/S1.jpg";
import Slide2 from "../assets/Image/S2.png";
import Slide3 from "../assets/Image/S3.png";
import Slide4 from "../assets/Image/S4.png";

import Slide5 from "../assets/Image/S5.png";
import Slide6 from "../assets/Image/S6.png";
import Slide7 from "../assets/Image/S7.png";

import Slid8 from "../assets/Image/S5E.jpg";
import Slide9 from "../assets/Image/S6E.jpg";
import Slide10 from "../assets/Image/S7E.jpg";
import Slide11 from "../assets/Image/S1E.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./carouser.css";

function CarouselEffect() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      indicators="false"
      id="home"
      className="car_height">
      <Carousel.Item interval={2500}>
        <LazyLoadImage
          className=" d-block w-100 program_img"
          src={Banner1}
          // placeholderSrc={Banner5}
          effect="blur"
          alt="First slide"
        />
        <LazyLoadImage
          className="d-block w-100 program_img_small"
          src={Slide1}
          // placeholderSrc={Slide1E}
          effect="blur"
          alt="First slide"
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2500}>
        <LazyLoadImage
          className="d-block w-100  program_img"
          src={Banner3}
          // placeholderSrc={Banner7}
          effect="blur"
          alt="Second slide"
        />
        <LazyLoadImage
          className="d-block w-100 program_img_small"
          src={Slide5}
          // placeholderSrc={Slide5E}
          effect="blur"
          alt="First slide"
        />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2500}>
        <LazyLoadImage
          className="d-block w-100 program_img"
          src={Banner4}
          // placeholderSrc={Banner8}
          effect="blur"
          alt="Third slide"
        />
        <LazyLoadImage
          className="d-block w-100 program_img_small"
          src={Slide6}
          // placeholder={Slide6E}
          effect="blur"
          alt="First slide"
        />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2500}>
        <LazyLoadImage
          className="d-block w-100 program_img"
          src={Banner2}
          // placeholderSrc={Banner6}
          effect="blur"
          alt="Fourth slide"
        />
        <LazyLoadImage
          className="d-block w-100 program_img_small"
          src={Slide7}
          // placeholderSrc={Slide7E}
          effect="blur"
          alt="First slide"
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>

      {/* <Carousel.Item interval={2500}>
        <LazyLoadImage
          style={{ maxHeight: "95vh" }}
          className="d-block w-100 heloinm"
          src={Banner10}
          alt="First slide"
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item> */}
    </Carousel>
  );
}

export default CarouselEffect;
