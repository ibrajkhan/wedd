// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import WhatsImg from "../assets/Image/whatsap.png";
// import "./header.css";

// const Header = () => {
//   return (
//     <Navbar
//       fixed="top"
//       // data-bs-theme="dark"\
//       bg="transparnet"
//       className="header_text montaga-regular ">
//       <Container>
//         <Navbar.Brand href="#home"></Navbar.Brand>
//         <Nav className="me-auto montaga-regular">
//           <Nav.Link href="#home" className="hell">
//             Home
//           </Nav.Link>
//           <Nav.Link href="#features" className="hell">
//             Our Story
//           </Nav.Link>
//           <Nav.Link href="#pricing" className="hell">
//             Family
//           </Nav.Link>
//           <Nav.Link href="#pricing" className="hell">
//             Program
//           </Nav.Link>
//           <Nav.Link href="#pricing" className="hell">
//             Book Flight
//           </Nav.Link>
//           <Nav.Link href="#pricing" className="hell">
//             RSVP
//           </Nav.Link>

//         </Nav>
//       </Container>
//     </Navbar>
//   );
// };

// export default Header;

import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./header.css"; // Add custom styles here
import { Link } from "react-router-dom";

import NavDropdown from "react-bootstrap/NavDropdown";

const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [navbarBackground, setNavbarBackground] = useState("transparent");

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
      fixed="top"
      // className="he"
      // id="home"

      style={{
        backgroundColor: navbarBackground,
        transition: "background-color 0.3s ease",
      }}
      className="header_text montaga-regular">
      <Navbar.Brand href="#home"></Navbar.Brand>
      <Nav className="me-auto montaga-regular ">
        <Nav.Link className="hell">
          <Link
            to="/#home"
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

        <Nav.Link className="hell">
          <Link
            to="/family/"
            style={{ color: "white", textDecoration: "none" }}
            onClick={() => {
              setTimeout(() => {
                const element = document.getElementById("Main");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }, 100);
            }}>
            Family
          </Link>
        </Nav.Link>
        <Nav.Link className="hell">
          <Link
            to="/our-story/#story"
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

        <Nav.Link className="hell">
          <Link
            to="/#Program"
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
        <Nav.Link className="hell">
          <Link
            to="/flight-booking/#flightBooking"
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
        <Nav.Link className="hell">
          <Link
            to="/#rsvp"
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

        {/* <NavDropdown
          title="Family"
          id="basic-nav-dropdown"
          className="custom-dropdown">
          <NavDropdown.Item href="#action/3.1" className="custom-dropdown-item">
            Ladki Wale
          </NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2" className="custom-dropdown-item">
            Ladke Wale
          </NavDropdown.Item>
        </NavDropdown> */}
      </Nav>
    </Navbar>
  );
};

export default Header;
