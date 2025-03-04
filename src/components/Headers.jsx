import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import "./Head.css";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons

function Headers() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const [menuOpen, setMenuOpen] = useState(false);
  const [navbarBackground, setNavbarBackground] = useState("transparent");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle menu state
  };

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);

      if (position > 50) {
        setNavbarBackground("#382037"); // Change to red background when scrolled past 50px
      } else {
        setNavbarBackground("transparent"); // Transparent background at top
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      fixed="top"
      style={{
        backgroundColor: navbarBackground,
        transition: "background-color 0.3s ease",
      }}
      className="header_main montaga-regulars">
      <Container>
        {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={toggleMenu}>
          {/* Show cross icon if menu is open, otherwise show hamburger icon */}
          {menuOpen ? (
            <FaTimes size={30} color="white" />
          ) : (
            <FaBars size={30} color="white" />
          )}
        </Navbar.Toggle>
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className={menuOpen ? "show" : ""}>
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
