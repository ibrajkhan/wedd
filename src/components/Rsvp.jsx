import "./Rsvp.css";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import * as formik from "formik";
import * as yup from "yup";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import emailjs from "@emailjs/browser";
import { useState, useRef } from "react";
import Spinner from "react-bootstrap/Spinner";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Rsvp = () => {
  // const { Formik } = formik;
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const MySwal = withReactContent(Swal);

  const schema = yup.object().shape({
    firstName: yup.string().required("First Name Required"),
    lastName: yup.string().required("Last Name Required"),
    email: yup
      .string()
      .required("Email Required")
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z]{2,}$/i,
        "Invalid email address"
      ),
    numberOfGuests: yup
      .string()
      .required("Number of Guests is required")
      .notOneOf(["Select from list"], "Please select a valid number of guests"),
  });
  const allowedEmails = [
    "ibraj.grd@gmail.com",
    "ibraj.senocare@gmail.com",
    "ibrajkhan.grd@gmail.com",
  ];
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      numberOfGuests: "",
    },
    validationSchema: schema,
    // onSubmit: (values, { resetForm }) => {
    //   console.log(values);
    //   setLoading(true);
    //   const googleSheetData = {
    //     FirstName: values.firstName,
    //     LastName: values.lastName,
    //     Email: values.email,
    //     NumberOfGuests: values.numberOfGuests,
    //   };
    //   // MySwal.fire({
    //   //   icon: "success",
    //   //   title: "You are welcome",
    //   // });
    //   // setLoading(false);

    //   emailjs
    //     .sendForm(
    //       import.meta.env.VITE_SERVICE_ID,
    //       import.meta.env.VITE_HOTEL_TEMPLATE,
    //       formRef.current,
    //       import.meta.env.VITE_PUBLIC_KEY
    //     )
    //     .then((res) => {
    //       console.log("Email sent successfully:", res);
    //       // Proceed to submit to Google Sheets
    //       return fetch(import.meta.env.VITE_BOOKING_REQUESTDB, {
    //         method: "POST",
    //         headers: {
    //           Accept: "application/json",
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //           data: [googleSheetData],
    //         }),
    //       });
    //     })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log("Data submitted to sucessful:", data);
    //       MySwal.fire({
    //         icon: "success",
    //         title: "You are welcome",
    //       });
    //       setTimeout(() => {
    //         setLoading(false);
    //         resetForm();
    //       }, 1000);
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //       MySwal.fire({
    //         icon: "error",
    //         title: "Oops...",
    //         text: "Pls Enter correct Email id or Try after some time",
    //       });
    //       setTimeout(() => {
    //         setLoading(false);
    //         resetForm();
    //       }, 2000);
    //     });

    //   //   emailjs
    //   //     .sendForm(
    //   //       import.meta.env.VITE_SERVICE_ID,
    //   //       import.meta.env.VITE_TEMPLATE,
    //   //       formRef.current,
    //   //       import.meta.env.VITE_PUBLIC_KEY
    //   //     )
    //   //     .then((res) => {
    //   //       MySwal.fire({
    //   //         icon: "success",
    //   //         title: "Form Submitted Sucessfully",
    //   //         time: 1000,
    //   //       });
    //   //       console.log(res);
    //   //     })
    //   //     .catch((err) => {
    //   //       MySwal.fire({
    //   //         icon: "error",
    //   //         title: "Failed to Submit",
    //   //         time: 1000,
    //   //       });
    //   //       console.log(err, "hello");
    //   //     });
    //   //   setTimeout(() => {
    //   //     setLoading(false);
    //   //     resetForm();
    //   //   }, 1000 * 2);
    // },
    onSubmit: async (values, { resetForm }) => {
      console.log(values);

      // Check if the email is in the allowed list
      // if (!allowedEmails.includes(values.email)) {
      //   MySwal.fire({
      //     icon: "error",
      //     title: "Not Allowed",
      //     text: "You are not allowed to fill this form.",
      //   });
      //   return;
      // }
      // setLoading(true);
      // Fetch data from the Google Sheet to check if the email has already been submitted
      // const response = await fetch(import.meta.env.VITE_BOOKING_REQUESTDB);
      // const data = await response.json();

      // const emailAlreadySubmitted = data.some(
      //   (entry) => entry.Email === values.email
      // );

      // if (emailAlreadySubmitted) {
      //   MySwal.fire({
      //     icon: "warning",
      //     title: "Already Submitted",
      //     text: "You have already submitted the form.",
      //   });
      //   setLoading(false);
      //   return;
      // }

      setLoading(true);
      const googleSheetData = {
        FirstName: values.firstName,
        LastName: values.lastName,
        Email: values.email,
        NumberOfGuests: values.numberOfGuests,
      };

      emailjs
        .sendForm(
          import.meta.env.VITE_SERVICE_ID,
          import.meta.env.VITE_HOTEL_TEMPLATE,
          formRef.current,
          import.meta.env.VITE_PUBLIC_KEY
        )
        .then((res) => {
          console.log("Email sent successfully:", res);
          // Proceed to submit to Google Sheets
          return fetch(import.meta.env.VITE_BOOKING_REQUESTDB, {
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
          console.log("Data submitted to Google Sheets successfully:", data);
          MySwal.fire({
            icon: "success",
            title: "You are welcome",
          });
          setTimeout(() => {
            setLoading(false);
            resetForm();
          }, 1000);
        })
        .catch((error) => {
          console.error("Error:", error);
          MySwal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please enter a correct Email ID or try again later.",
          });
          setTimeout(() => {
            setLoading(false);
            resetForm();
          }, 2000);
        });
    },
  });

  return (
    <div id="rsvp">
      <div className="rsvp">
        <div className="rsvp__content">
          <h3 className="montaga-regulars ">RSVP</h3>
          <p className="montaga-regulars">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. 
          </p>
        </div>
      </div>

      <Form
        name="contact"
        onSubmit={formik.handleSubmit}
        noValidate
        className="form__content"
        // onSubmit={() => handleSubmit(submitFormData())}
        ref={formRef}>
        <div className="rsvp__content">
          <Row className="mb-3">
            <Form.Group
              as={Col}
              md="4"
              xs="6"
              controlId="validationFormik101"
              className="position-relative mb-2">
              <Form.Label className="montaga-regulars label_">
                First name
              </Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                className="custom-input"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                placeholder="First name"
                isInvalid={!!formik.errors.firstName}
                isValid={formik.touched.firstName && !formik.errors.firstName}
              />
              <Form.Control.Feedback className="montaga-regulars">
                Looks Good!
              </Form.Control.Feedback>
              <Form.Control.Feedback
                type="invalid"
                className="montaga-regulars">
                {formik.errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              md="4"
              xs="6"
              controlId="validationCustom02 "
              className="mb-2">
              <Form.Label className="montaga-regulars label_">
                Last name
              </Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                className="custom-input"
                onChange={formik.handleChange}
                value={formik.values.lastName}
                placeholder="Last name"
                isValid={formik.touched.lastName && !formik.errors.lastName}
                isInvalid={!!formik.errors.lastName}
              />
              <Form.Control.Feedback className="montaga-regulars">
                Looks Good!
              </Form.Control.Feedback>

              <Form.Control.Feedback
                type="invalid"
                className="montaga-regulars">
                {formik.errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              md="4"
              xs="6"
              controlId="validationCustomUsername"
              className="mb-2">
              <Form.Label className="montaga-regulars label_">Email</Form.Label>
              <InputGroup hasValidation>
                {/* <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text> */}
                <Form.Control
                  type="text"
                  placeholder="Email"
                  className="custom-input"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  aria-describedby="inputGroupPrepend"
                  isValid={formik.touched.email && !formik.errors.email}
                  isInvalid={!!formik.errors.email}
                />
                <Form.Control.Feedback
                  type="invalid"
                  className="montaga-regulars">
                  {formik.errors.email}
                </Form.Control.Feedback>
                <Form.Control.Feedback className="montaga-regulars">
                  Looks Good!
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group
              as={Col}
              md="12"
              xs="6"
              controlId="validationFormikUsername2">
              <Form.Label className="montaga-regulars label_">
                Number of Guests
              </Form.Label>
              <Form.Select
                aria-label="Default select example"
                className="custom-input"
                name="numberOfGuests"
                placeholder="select"
                value={formik.values.numberOfGuests}
                onChange={formik.handleChange}
                isValid={
                  formik.touched.numberOfGuests && !formik.errors.numberOfGuests
                }
                isInvalid={!!formik.errors.numberOfGuests}>
                <option>Select from list</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                <option value="4">Four</option>
              </Form.Select>
              <Form.Control.Feedback
                type="invalid"
                className="montaga-regulars">
                {formik.errors.numberOfGuests}
              </Form.Control.Feedback>
              <Form.Control.Feedback className="montaga-regulars">
                Looks Good!
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Button type="submit" className="button-sub montaga-regulars mt-2">
            {loading && (
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
            {loading ? "Processing..." : "Submit"}
          </Button>
        </div>
      </Form>
      {/* Whats App */}
      {/* <a
        href="https://wa.me/9665080749"
        className="whatsapp-link"
        target="_blank">
        Chat with us on WhatsApp
      </a> */}

      {/* Live Streaming */}

      {/* <iframe
        width="100%"
        height="500"
        src="YOUR_LIVE_STREAM_LINK"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Live Stream"></iframe> */}
    </div>
  );
};

export default Rsvp;
