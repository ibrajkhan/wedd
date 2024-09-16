import Header from "./Header";
import { Row, Col, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import emailjs from "@emailjs/browser";
import { useState, useRef } from "react";
import Spinner from "react-bootstrap/Spinner";
import Swal from "sweetalert2";
import * as yup from "yup";
import "./Booking.css";

import withReactContent from "sweetalert2-react-content";
import WhatsAppButton from "./WhatsAppButton";

const Try = () => {
  const [loading, setLoading] = useState(false);
  const [guestFields, setGuestFields] = useState([]);
  const formRef = useRef(null);
  const MySwal = withReactContent(Swal);

  // Yup schema for validation
  const schema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email address"),
    numberOfGuests: yup
      .number()
      .required("Number of guests is required")
      .min(1, "Please select at least one guest"),
    guests: yup.array().of(
      yup.object().shape({
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("Last name is required"),
        gender: yup.string().required("Gender is required"),
      })
    ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      numberOfGuests: "",
      guests: [],
    },
    validationSchema: schema,
    validateOnChange: true,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);

      const googleSheetData = {
        Email: values.email,
        NumberOfGuests: values.numberOfGuests,
      };

      values.guests.forEach((guest, index) => {
        googleSheetData[`GuestfirstName${index}`] = guest.firstName;
        googleSheetData[`GuestlastName${index}`] = guest.lastName;
        googleSheetData[`Guestgender${index}`] = guest.gender;
      });

      // Send email and store data logic
      emailjs
        .sendForm(
          import.meta.env.VITE_SERVICE_ID,
          import.meta.env.VITE_FLIGHT_TEMPLATE,
          formRef.current,
          import.meta.env.VITE_PUBLIC_KEY
        )
        .then((res) => {
          console.log("Email sent successfully:", res);
          return fetch(import.meta.env.VITE_BOOKING_Flight_REQUESTDB, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              data: [googleSheetData],
            }),
          });
        })
        .then((response) => response.json())
        .then((data) => {
          console.log("Data submitted successfully:", data);
          MySwal.fire({
            icon: "success",
            title: "Booking successful!",
          });
          setLoading(false);
          resetForm();
          setGuestFields([]);
        })
        .catch((error) => {
          console.error("Error:", error);
          MySwal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong, please try again.",
          });
          setLoading(false);
        });
    },
  });

  const handleGuestChange = (event) => {
    const numberOfGuests = parseInt(event.target.value);
    formik.handleChange(event);

    const guests = Array.from({ length: numberOfGuests }, () => ({
      firstName: "",
      lastName: "",
      gender: "",
    }));
    setGuestFields(guests);
    formik.setFieldValue("guests", guests);
  };

  const handleInputChange = (index, field, value) => {
    formik.setFieldValue(`guests[${index}].${field}`, value);
    formik.setFieldTouched(`guests[${index}].${field}`, true);
  };

  return (
    <div id="flightBooking">
      <Header />
      <Container fluid className="booking__form">
        <h3 className="montaga-regulars">Flight Booking Form</h3>
        <Row>
          <Col>
            <Form
              name="contact"
              onSubmit={formik.handleSubmit}
              noValidate
              className="form__content"
              ref={formRef}>
              <div className="rsvp__content">
                <Row className="mb-3">
                  <Form.Group as={Col} md="4" xs="6" className="text_field">
                    <Form.Label className="montaga-regulars label_">
                      Email
                    </Form.Label>
                    <InputGroup hasValidation>
                      <Form.Control
                        type="email"
                        placeholder="Email"
                        className="custom-input"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        isValid={formik.touched.email && !formik.errors.email}
                        isInvalid={!!formik.errors.email}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.email}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group as={Col} md="4" xs="6" className="text_field">
                    <Form.Label className="montaga-regulars label_">
                      Number of Guests
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      name="numberOfGuests"
                      className="custom-input"
                      value={formik.values.numberOfGuests}
                      onChange={handleGuestChange}
                      isValid={
                        formik.touched.numberOfGuests &&
                        !formik.errors.numberOfGuests
                      }
                      isInvalid={!!formik.errors.numberOfGuests}>
                      <option>Select number</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                      <option value="4">Four</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.numberOfGuests}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                {guestFields.map((_, index) => (
                  <Row className="mb-3" key={index}>
                    <h5 className="montaga-regulars">Guest {index + 1}</h5>

                    <Form.Group as={Col} md="4" xs="6" className="text_field">
                      <Form.Label className="montaga-regulars label_">
                        First Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="First Name"
                        className="custom-input"
                        name={`guests[${index}].firstName`}
                        value={formik.values.guests[index]?.firstName}
                        onChange={(e) =>
                          handleInputChange(index, "firstName", e.target.value)
                        }
                        isInvalid={
                          formik.touched.guests?.[index]?.firstName &&
                          !!formik.errors.guests?.[index]?.firstName
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.guests?.[index]?.firstName}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" xs="6" className="text_field">
                      <Form.Label className="montaga-regulars label_">
                        Last Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Last Name"
                        className="custom-input"
                        name={`guests[${index}].lastName`}
                        value={formik.values.guests[index]?.lastName}
                        onChange={(e) =>
                          handleInputChange(index, "lastName", e.target.value)
                        }
                        isInvalid={
                          formik.touched.guests?.[index]?.lastName &&
                          !!formik.errors.guests?.[index]?.lastName
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.guests?.[index]?.lastName}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} md="4" xs="6" className="text_field">
                      <Form.Label className="montaga-regulars label_">
                        Gender
                      </Form.Label>
                      <Form.Select
                        className="custom-input"
                        name={`guests[${index}].gender`}
                        value={formik.values.guests[index]?.gender || ""}
                        onChange={(e) =>
                          handleInputChange(index, "gender", e.target.value)
                        }
                        isInvalid={
                          formik.touched.guests?.[index]?.gender &&
                          !!formik.errors.guests?.[index]?.gender
                        }>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.guests?.[index]?.gender}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                ))}

                <Row className="mb-3">
                  <Form.Group>
                    <Button
                      type="submit"
                      className="montaga-regulars send_button d-flex align-items-center">
                      {loading && (
                        <Spinner
                          animation="border"
                          size="sm"
                          className="me-2"
                        />
                      )}
                      Submit
                    </Button>
                  </Form.Group>
                </Row>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      <WhatsAppButton />
    </div>
  );
};

export default Try;
