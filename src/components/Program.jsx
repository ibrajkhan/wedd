import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Program.css";

const Program = () => {
  return (
    <div>
      <h3 className="programs montaga-regular">Program</h3>
      <Container>
        <Row className="montaga-regular container__row">
          <div>
            <Col> Engagement </Col>
            <Col>Mehendi</Col>
            <Col>Cocktail</Col>
            <Col>Haldi</Col>
            <Col>Wedding</Col>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Program;
