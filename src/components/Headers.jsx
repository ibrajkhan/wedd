import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import "./Head.css";

function Headers() {
  const [scrolled, setScrolled] = useState(false);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      fixed="top"
      className="header_main montaga-regulars">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="header__text">
              <Link
                to="/#home"
                className="link_text"
                style={{ color: "white", textDecoration: "none" }}
                onClick={() => {
                  setTimeout(() => {
                    const element = document.getElementById("Main");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }, 100);
                }}>
                Home
              </Link>
            </Nav.Link>
            <Nav.Link className="header__text">
              <Link
                to="/our-story/#story"
                className="link_text"
                style={{ color: "white", textDecoration: "none" }}
                onClick={() => {
                  setTimeout(() => {
                    const element = document.getElementById("story");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }, 100);
                }}>
                <span> Our</span> Story
              </Link>
            </Nav.Link>
            <Nav.Link className="header__text">
              <Link
                to="/#Program"
                className="link_text"
                style={{ color: "white", textDecoration: "none" }}
                onClick={() => {
                  setTimeout(() => {
                    const element = document.getElementById("Program");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }, 100);
                }}>
                Program
              </Link>
            </Nav.Link>
            <Nav.Link className="header__text">
              <Link
                to="/flight-booking/#flightBooking"
                className="link_text"
                style={{ color: "white", textDecoration: "none" }}
                onClick={() => {
                  setTimeout(() => {
                    const element = document.getElementById("flightBooking");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }, 100);
                }}>
                <span> Book</span> Flight
              </Link>
            </Nav.Link>
            <Nav.Link>
              <Link
                to="/#rsvp"
                className="link_text"
                style={{ color: "white", textDecoration: "none" }}
                onClick={() => {
                  setTimeout(() => {
                    const element = document.getElementById("rsvp");
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }, 100);
                }}>
                RSVP
              </Link>
            </Nav.Link>
            <NavDropdown title="Family" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Ladke Wale</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Ladke Wale</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Headers;
