import React, { useContext } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import "../styles/login.css";
import loginImg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";
import { AuthContext } from "../context/AuthContext";
const Profile = () => {
  document.title = "Profile | Travel World";
  
  const { user, dispatch } = useContext(AuthContext);
  
  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            
            <div className="login__container d-flex justify-content-between">
              <div className="login__img" style={{ backgroundColor: "white" }}>
                <img src={loginImg} alt="" />
              </div>

              <div className="login__form">
                <div className="user">
                  {user.photo == undefined || null || "" ? (
                    <img
                      src={userIcon}
                      alt=""
                      style={{
                        borderRadius: "50%",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  ) : (
                    <img
                      src={user.photo}
                      alt=""
                      style={{
                        borderRadius: "50%",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  )}
                </div>

                <h2>Profile</h2>

                <Form>
                  <FormGroup className="d-flex">
                    <i
                      className="fa-solid fa-user my-2 mx-1"
                      style={{ fontSize: "20px" }}
                    ></i>
                    <input
                      type="text"
                      id="password"
                      value={user.username}
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
                      id="email"
                      value={user.email}
                      readOnly
                    />
                  </FormGroup>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Profile;
