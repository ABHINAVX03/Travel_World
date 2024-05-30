import React, { useState, useEffect, useContext } from "react";
import emailjs from "@emailjs/browser";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import "../styles/login.css";
import loginImg from "../assets/images/login.png";
import { useToast } from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";
const Contact = () => {
  const { user, dispatch } = useContext(AuthContext);

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [message, setmessage] = useState("");
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const sendEmail = async () => {
    const serviceId = "service_szn9mz7";
    const templateId = "template_oze8uwe";
    try {
      setLoading(true);
      await emailjs.send(serviceId, templateId, {
        user_name: user.name,
        user_email: user.email,
        message: message,
      });
      toast({
        title: "Email send Successfully!",
        isClosable: true,
        duration: 6000,
        position: "bottom",
      });
      setmessage("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => emailjs.init("-8AywI-tc_J2nq4CV"), []);
  return user ? (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img" style={{ backgroundColor: "white" }}>
                <img src={loginImg} alt="" />
              </div>

              <div className="login__form">
                <h2>Contact Us</h2>

                <Form>
                  <FormGroup className="d-flex">
                    <i
                      className="fa-solid fa-user my-2 mx-1"
                      style={{ fontSize: "20px" }}
                    ></i>
                    <input
                      type="text"
                      placeholder="Name"
                      value={user.username}
                      className="mx-2"
                      readOnly
                    />
                  </FormGroup>
                  <FormGroup className="d-flex">
                    <i
                      className="fa-solid fa-envelope my-2 mx-1"
                      style={{ fontSize: "20px" }}
                    ></i>
                    <input
                      type="email"
                      value={user.email}
                      placeholder="Email"
                      name="user_email"
                      className="mx-2"
                      readOnly
                    />
                  </FormGroup>
                  <FormGroup className="d-flex">
                    <i
                      className="fa-solid fa-comment my-2 mx-1"
                      style={{ fontSize: "20px" }}
                    ></i>
                    <textarea
                      value={message}
                      onChange={(e) => setmessage(e.target.value)}
                      className="mx-2"
                      cols="30"
                      rows="10"
                      required
                    ></textarea>
                  </FormGroup>
                  <Button
                    className="btn secondary__btn auth__btn"
                    value="Send"
                    type="submit"
                    disabled={loading}
                    onClick={sendEmail}
                  >
                    Submit
                  </Button>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  ) : (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img" style={{ backgroundColor: "white" }}>
                <img src={loginImg} alt="" />
              </div>

              <div className="login__form">
                <h2>Contact Us</h2>

                <Form>
                  <FormGroup className="d-flex">
                    <i
                      className="fa-solid fa-user my-2 mx-1"
                      style={{ fontSize: "20px" }}
                    ></i>
                    <input
                      type="text"
                      placeholder="Name"
                      value={name}
                      className="mx-2"
                      onChange={(e) => setname(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="d-flex">
                    <i
                      className="fa-solid fa-envelope my-2 mx-1"
                      style={{ fontSize: "20px" }}
                    ></i>
                    <input
                      type="email"
                      value={email}
                      placeholder="Email"
                      name="user_email"
                      className="mx-2"
                      onChange={(e) => setemail(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="d-flex">
                    <i
                      className="fa-solid fa-comment my-2 mx-1"
                      style={{ fontSize: "20px" }}
                    ></i>
                    <textarea
                      value={message}
                      onChange={(e) => setmessage(e.target.value)}
                      className="mx-2"
                      cols="30"
                      rows="10"
                      required
                    ></textarea>
                  </FormGroup>
                  <Button
                    className="btn secondary__btn auth__btn"
                    value="Send"
                    type="submit"
                    disabled={loading}
                    onClick={sendEmail}
                  >
                    Submit
                  </Button>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;
