import { Row, Col, Container } from "react-bootstrap";
import CustomCard from "./CustomeCard";
import Header from "./Header";
import Img1 from "../assets/Image/ClientImg.png";
import Img2 from "../assets/Image/Client2.png";
import Img3 from "../assets/Image/Client3.png";
import Img4 from "../assets/Image/Client4.png";
import "./story.css";
import imgGr from "../assets/Image/Group.png";
import { LazyLoadImage } from "react-lazy-load-image-component";
import WhatsAppButton from "./WhatsAppButton";

const OurStory = () => {
  return (
    <div id="story">
      <Header />

      <div className="story-row px-4">
        <div className="imgjj">
          <div>
            <h3 className="montaga-regular loveStory">A Love Story</h3>
            <LazyLoadImage src={imgGr} className="img-fluid imgText" />
          </div>
        </div>
        <Container>
          <Row>
            <Col md={6} className="img_story ">
              <LazyLoadImage
                src={Img1}
                className="img-fluid rounded img_section"
              />
            </Col>
            <Col md={6} className="img_section_text">
              <p className="montaga-regular tin ">
                In the bustling heart of Delhi, the families of Ranvir and
                Gayatri were preparing for an arranged marriage that would
                intertwine their futures. Ranvir, a young entrepreneur in his
                late twenties, was taking his family's manufacturing business to
                new heights. On the other hand, Gayatri, 26, managed her
                family’s catering business, known for its exquisite culinary
                offerings. Both felt the pressure to settle down but were
                focused on their respective careers.
              </p>
            </Col>
          </Row>

          <Row className="contain">
            <Col md={6} className="img_section_text" order={{ xs: 2, md: 1 }}>
              <p className="montaga-regular tin ">
                Their paths crossed at a family gathering, and the initial
                nervousness soon faded as they discovered a shared passion for
                entrepreneurship. Over several meetings, they engaged in lively
                discussions about business strategies, blending their ambitions
                with laughter and camaraderie. Ranvir admired Gayatri’s
                innovative ideas, while Gayatri respected Ranvir’s ambitious
                vision for his company.
              </p>
            </Col>
            <Col md={6} className="img_story " order={{ xs: 1, md: 2 }}>
              <LazyLoadImage
                src={Img2}
                className="img-fluid rounded img_section"
              />
            </Col>
          </Row>

          <Row className="contain">
            <Col md={6} className="img_story " order={{ xs: 2, md: 1 }}>
              <LazyLoadImage
                src={Img3}
                className="img-fluid rounded img_section"
              />
            </Col>
            <Col md={6} className="img_section_text" order={{ xs: 1, md: 2 }}>
              <p className="montaga-regular tin ">
                One evening, in a vibrant café, Ranvir invited Gayatri to
                brainstorm potential collaboration between their businesses. The
                chemistry between them was undeniable, and as they talked about
                dreams and aspirations, Ranvir realized he was falling for her.
                “I don’t just want a business partner; I want a life partner,”
                he confessed. To his delight, Gayatri felt the same.
              </p>
            </Col>
          </Row>

          <Row className="contain">
            <Col md={6} className="img_section_text" order={{ xs: 2, md: 1 }}>
              <p className="montaga-regular tin ">
                With family support, their relationship blossomed into a
                beautiful romance founded on mutual respect and shared goals.
                Months later, they exchanged vows at a joyful wedding,
                celebrating their love and the exciting journey ahead. Together,
                Ranvir and Gayatri proved that even in the traditional framework
                of arranged marriages, love can flourish in unexpected and
                beautiful ways, combining their dreams to create a promising
                future.
              </p>
            </Col>

            <Col md={6} className="img_story " order={{ xs: 1, md: 2 }}>
              <LazyLoadImage
                src={Img4}
                className="img-fluid rounded img_section"
              />
            </Col>
          </Row>
        </Container>
      </div>
      <WhatsAppButton />
    </div>
  );
};

export default OurStory;
