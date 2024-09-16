import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import "./CardStyle.css"; // For custom styles

const CustomCard = ({ Img }) => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}>
      <Row>
        <Col>
          <Card className="custom-card">
            <Card.Body className="p-0">
              <div className="card-image-container">
                <img
                  src={Img} // Replace with your image path
                  alt="Card Image"
                  className="img-fluid"
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomCard;
