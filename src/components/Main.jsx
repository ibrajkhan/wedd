import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./Main.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Haldi from "../assets/Image/Haldi.png";
import Engagement from "../assets/Image/Engagement.png";
import Mehandi from "../assets/Image/Mehandi.png";
import Banner6 from "../assets/Image/img1.png";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Wedding from "../assets/Image/wedding_res.png";
import Cocktail from "../assets/Image/Cocktails.png";

import HaldiB from "../assets/Image/HaldiB.jpg";
import EngagementB from "../assets/Image/EngagementB.jpg";
import MehandiB from "../assets/Image/MehandiB.jpg";
import { Link } from "react-router-dom";

import WeddingB from "../assets/Image/wedding_resB.jpg";
import CocktailB from "../assets/Image/CocktailsB.jpg";
import hote from "../assets/Image/hote.jpg";
import IconImg from "../assets/Image/icon1.svg";
import IconImg2 from "../assets/Image/icon2.svg";
import IconImg3 from "../assets/Image/icon3.svg";
import IconImg4 from "../assets/Image/icon4.svg";
import IconImg6 from "../assets/Image/icon6.svg";

import EngamentImgSmall from "../assets/Image/EngImgsmall.jpg";

import WeddingSmall from "../assets/Image/weddingSmall.png";

import HaldiSmall from "../assets/Image/haldiSmall.png";

import MehandiSmall from "../assets/Image/MehandiSmall.png";

import VenueSmall from "../assets/Image/VenueSmall.png";

import CocktailSmall from "../assets/Image/cocktailSmall.png";

import EngamentImgSmalle from "../assets/Image/EngImgsmalle.jpg";

import WeddingSmalle from "../assets/Image/weddingSmalle.jpg";
import HaldiSmalle from "../assets/Image/haldiSmalle.jpg";
import MehandiSmalle from "../assets/Image/MehandiSmalle.jpg";
import VenueSmalle from "../assets/Image/VenueSmalle.jpg";
import CocktailSmalle from "../assets/Image/cocktailSmalle.jpg";

const Main = () => {
  const [key, setKey] = useState("home");
  return (
    <div id="Program">
      <div className="program">
        <h3 className="montaga-regular text-center main_text">Program</h3>
        {/* <LazyLoadImage src={imgkk} className="img-fluid" /> */}
        {/* <Container fluid className="montaga-regular container__text">
          <Row>
            <Col xs={2}>
              <h4 className="ProgramText text-center text-center">
                Engagement
              </h4>
            </Col>
            <Col>
              <h4 className="ProgramText text-center">Mehendi</h4>
            </Col>
            <Col>
              <h4 className="ProgramText text-center">Cocktail </h4>
            </Col>
            <Col>
              <h4 className="ProgramText text-center">Haldi </h4>
            </Col>
            <Col>
              <h4 className="ProgramText text-center">Wedding </h4>
            </Col>
          </Row>
        </Container> */}
        <Row className="icon__section">
          <Col className="text-center ">
            <img src={IconImg} className="icon_img engagement" />
          </Col>
          <Col className="text-center icon_img">
            <img src={IconImg6} className="icon_img mehendi" />
          </Col>
          <Col className="text-center icon_img">
            <img src={IconImg4} className="icon_img cocktail" />
          </Col>
          <Col className="text-center icon_img">
            <img src={IconImg2} className="icon_img haldi" />
          </Col>
          <Col className="text-center icon_img">
            <img src={IconImg3} className="icon_img wedding" />
          </Col>
        </Row>

        <Tabs
          defaultActiveKey="profile"
          id="fill-tab-example"
          className="custom-tabs montaga-regular"
          fill
          activeKey={key}
          onSelect={(k) => setKey(k)}>
          <Tab
            eventKey="home"
            title="Engagement"
            tabClassName={key === "home" ? "active home" : ""}>
            <LazyLoadImage
              src={Engagement}
              className="img-fluid  program_img"
              placeholderSrc={EngagementB}
              effect="blur"
            />
            <LazyLoadImage
              src={EngamentImgSmall}
              className="img-fluid  program_img_small"
              placeholderSrc={EngamentImgSmalle}
              effect="blur"
            />
          </Tab>

          <Tab
            eventKey="profile"
            title="Mehendi"
            tabClassName={key === "profile" ? "active profile" : ""}>
            <LazyLoadImage
              src={Mehandi}
              placeholderSrc={MehandiB}
              effect="blur"
              className="img-fluid program_img"
            />
            <LazyLoadImage
              src={MehandiSmall}
              className="img-fluid  program_img_small"
              placeholderSrc={MehandiSmalle}
              effect="blur"
            />
          </Tab>
          <Tab
            eventKey="Mehendi"
            title="Cocktail"
            tabClassName={key === "Mehendi" ? "active Mehendi" : ""}>
            <LazyLoadImage
              src={Cocktail}
              placeholderSrc={CocktailB}
              effect="blur"
              className="img-fluid program_img"
            />
            <LazyLoadImage
              src={CocktailSmall}
              className="img-fluid  program_img_small"
              placeholderSrc={CocktailSmalle}
              effect="blur"
            />
          </Tab>
          <Tab
            eventKey="Haldi"
            title="Haldi"
            tabClassName={key === "Haldi" ? "active Haldi" : ""}>
            <LazyLoadImage
              src={Haldi}
              placeholderSrc={HaldiB}
              effect="blur"
              className="img-fluid program_img"
            />
            <LazyLoadImage
              src={HaldiSmall}
              className="img-fluid  program_img_small"
              placeholderSrc={HaldiSmalle}
              effect="blur"
            />
          </Tab>
          <Tab
            eventKey="Wedding"
            title="Wedding"
            tabClassName={key === "Wedding" ? "active Wedding" : ""}>
            <LazyLoadImage
              src={Wedding}
              placeholderSrc={WeddingB}
              effect="blur"
              className="img-fluid program_img"
            />
            <LazyLoadImage
              src={WeddingSmall}
              className="img-fluid  program_img_small"
              placeholderSrc={WeddingSmalle}
              effect="blur"
            />
          </Tab>
        </Tabs>
      </div>
      <div className="bannerbox imn" id="venue">
        <LazyLoadImage
          src={Banner6}
          placeholderSrc={hote}
          className=" img-fluid program_img"
          effect="blur"
        />
        <LazyLoadImage
          src={VenueSmall}
          className="img-fluid  program_img_small"
          placeholderSrc={VenueSmalle}
          effect="blur"
        />
      </div>

      {/* <Container fluid className="map">
        <Row>
          <Col md={6}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3622.3233571263827!2d73.69821187393207!3d24.784378748300444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3968084aea666db9%3A0x90ff0f546ba69fcc!2sMementos%20by%20ITC%20Hotels%2C%20Ekaaya%20Udaipur!5e0!3m2!1sen!2sin!4v1724393041998!5m2!1sen!2sin"
              className="hotel_map"
              allowfullscreen=""
              loading="lazy"></iframe>
          </Col>
          <Col md={6} className="map_text montaga-regular ">
            <div>
              <h3 className="help">Need Help in Booking Flights</h3>
              <div className="booking_button">
                <Link to="/flight-booking/#flightBooking">
                  <Button className="button-sub">Click Here</Button>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container> */}
    </div>
  );
};

export default Main;
