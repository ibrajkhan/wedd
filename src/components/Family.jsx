import { Container, Row, Col } from "react-bootstrap";
import Header from "./Header";
import Button from "react-bootstrap/Button";
import "./Family.css";
import WhatsAppButton from "./WhatsAppButton";
import Headers from "./Headers";

const Family = () => {
  return (
    <div className="Family">
      {/* <Header /> */}
      <Headers />
      <Container id="familyC">
        <Row className="content_family text-center">
          <Col className="">
            <Button className="button-sub ki montaga-regulars">
              Ladke Wala
            </Button>
            <Button className="button-sub  montaga-regulars">Ladki Wala</Button>
          </Col>
        </Row>
      </Container>
      <WhatsAppButton />
    </div>
  );
};

export default Family;
