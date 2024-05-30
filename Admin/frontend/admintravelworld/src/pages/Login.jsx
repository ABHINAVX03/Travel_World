import React, { useContext, useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../assets/images/login.png";
import { AuthContext } from "../context/AuthContext";

import { useToast } from "@chakra-ui/react";
const Login = () => {
  document.title = "Admin Login | Travel World";
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });
  const [type, setType] = useState("password");
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const showpass = () => {
    if (type == "password") {
      setType("text");
    } else {
      setType("password");
    }
  };
  const handleClick = async (e) => {
    e.preventDefault();

    dispatch({ type: "LOGIN_START" });

    try {
      const res = await fetch("http://localhost:2222/api/v1/auth/login", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
      });

      const result = await res.json();
      if (!res.ok) {
        toast({
          title: result.message,
          description: "Error!",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        //console.log(result.data)
        dispatch({ type: "LOGIN_SUCCESS", payload: result.data });
        toast({
          title: "Login Successfully",
          description: "We've logged your account for you.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/");
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.message });
    }
  };

  return (
    <section>
      <Container>
        <Row>
        <Col lg="8" className="m-auto">
              <div className="login__container d-flex justify-content-between">
                <div
                  className="login__img"
                  style={{ backgroundColor: "white" }}
                >
                  <img src={loginImg} alt="" />
                </div>

              <div className="login__form">
                <h2>Admin Login</h2>

                <Form onSubmit={handleClick}>
                  <FormGroup className="d-flex">
                    <i
                      className="fa-solid fa-envelope my-2 mx-1"
                      style={{ fontSize: "20px" }}
                    ></i>
                    <input
                      type="email"
                      placeholder="Email"
                      id="email"
                      className="mx-2"
                      onChange={handleChange}
                      required
                    />
                  </FormGroup>
                  <FormGroup
                    className="d-flex"
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <i
                      className="fa-solid fa-lock my-2 mx-1"
                      style={{ fontSize: "20px" }}
                    ></i>
                    <input
                      type={`${type}`}
                      placeholder="Password"
                      id="password"
                      className="mx-2"
                      onChange={handleChange}
                      required
                    />
                    <i
                      className="fa-solid fa-eye"
                      style={{ marginRight: "-20px", cursor: "pointer" }}
                      onClick={showpass}
                    ></i>
                  </FormGroup>
                  <Button
                    className="btn secondary__btn auth__btn"
                    type="submit"
                  >
                    Login
                  </Button>
                </Form>
                <p>
                  Don't have an account? <Link to="/register">Create</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
