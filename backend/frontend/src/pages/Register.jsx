import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import registerImg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";
import { useToast, Tooltip } from "@chakra-ui/react";
const Register = ({ color }) => {
  let name;
  let c;
  if (color === "light") {
    name = "#242526";
    c = "white";
  } else if (color === "dark") {
    name = "white";
    c = "black";
  }
  document.title = "Register | Travel World";
  const [type, setType] = useState("password");
  const [cpass, setcpass] = useState("");
  const [passcolor, setpasscolor] = useState("red");
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
    role: undefined,
    photo: undefined,
  });
  const showpass = () => {
    if (type == "password") {
      setType("text");
    } else {
      setType("password");
    }
  };
  async function checkImage(url) {
    const res = await fetch(url).catch((e) => {
      return toast({
        title: "Enter the valid URL",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    });
    const buff = await res.blob();

    return buff.type.startsWith("image/");
  }

  const checkSafe = () => {
    checkImage(credentials.photo)
      .then((res) => {
        if (res === false) {
          return toast({
            title: "Enter the valid image url",
            description: "Image url is not correct please check the url",
            status: "warning",
            duration: 9000,
            isClosable: true,
          });
        } else {
          return toast({
            title: "Image is valid",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
        }
      })
      .catch((e) => {
        toast({
          title: e,
          duration: 9000,
          status: "error",
          isClosable: true,
        });
      });
  };

  // console.log(credentials);
  const [show, setShow] = useState(false);
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const showModal = () => {
    if (show == true) {
      setShow(true);
    } else {
      setShow(true);
    }
  };
  const handleClick = async (e) => {
    e.preventDefault();
    if (credentials.password != cpass) {
      return toast({
        title: "Check password",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
    } else {
      try {
        const res = await fetch(`${BASE_URL}/api/v1/auth/register`, {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(credentials),
        });
        const result = await res.json();
        if (!res.ok) {
          console.log(!res.ok);
        return toast({
          title: "Error Occured",
          description: "UserName and Email must be unique!",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
        dispatch({ type: "REGISTER_SUCCESS" });
        navigate("/login");
        return toast({
          title: "Registration Successfully!",
          description: "We'av created your Account",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } catch (err) {
        alert(err.message);
      }
    }
  };
  useEffect(() => {
    if (credentials.password == cpass) {
      setpasscolor("green");
    } else {
      setpasscolor("red");
    }
  }, [credentials, cpass, setpasscolor]);
  return (
    <div>
      <section>
        <Container>
          <Row>
            {show && (
              <div
                className="modal fade"
                id="exampleModalCenter"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
              >
                <div
                  className="modal-dialog modal-dialog-centered"
                  role="document"
                >
                  <div
                    className="modal-content"
                    style={{ backgroundColor: `${name}`, borderRadius: "2%" }}
                  >
                    <div
                      className="modal-header"
                      style={{ backgroundColor: `${name}` }}
                    >
                      <h5
                        className="modal-title"
                        id={color}
                        style={{ backgroundColor: `${name}` }}
                      >
                        Image URL
                      </h5>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true" id={color}>
                          &times;
                        </span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <FormGroup>
                        <input
                          type="text"
                          placeholder="Enter the url..."
                          id="photo"
                          onChange={handleChange}
                          style={{
                            width: "100%",
                            outline: "none",
                            backgroundColor: `${name}`,
                            color: `${c}`,
                          }}
                        />
                      </FormGroup>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className={`btn btn-${name}`}
                        id={color}
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        className="btn btn-dark"
                        type="submit"
                        onClick={checkSafe}
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <Col lg="8" className="m-auto">
              <div className="login__container d-flex justify-content-between">
                <div
                  className="login__img"
                  style={{ backgroundColor: "white" }}
                >
                  <img src={registerImg} alt="" />
                </div>

                <div className="login__form">
                  <div className="user">
                    {credentials.photo == undefined || null ? (
                      <Tooltip label="upload image" left={"90px"} top={"-80px"}>
                        <img
                          src={userIcon}
                          alt=""
                          onClick={showModal}
                          data-toggle="modal"
                          data-target="#exampleModalCenter"
                          style={{
                            cursor: "pointer",
                          }}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip label="upload image" left={"90px"} top={"-80px"}>
                        <img
                          src={credentials.photo}
                          alt=""
                          onClick={showModal}
                          data-toggle="modal"
                          data-target="#exampleModalCenter"
                          style={{
                            cursor: "pointer",
                            borderRadius: "50%",
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </Tooltip>
                    )}
                  </div>
                  <h2>Register</h2>

                  <Form onSubmit={handleClick}>
                    <FormGroup className="d-flex">
                      <i
                        className="fa-solid fa-user my-2 mx-1"
                        style={{ fontSize: "20px" }}
                      ></i>
                      <input
                        type="text"
                        placeholder="Username"
                        id="username"
                        onChange={handleChange}
                        required
                        className="mx-2"
                      />
                    </FormGroup>
                    <FormGroup className="d-flex">
                      <i
                        className="fa-solid fa-envelope my-2 mx-1"
                        style={{ fontSize: "20px" }}
                      ></i>
                      <input
                        type="email"
                        placeholder="Email"
                        id="email"
                        onChange={handleChange}
                        required
                        className="mx-2"
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
                    <FormGroup
                      className="d-flex"
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <i
                        className="fa-solid fa-lock my-2 mx-1"
                        style={{ fontSize: "20px" }}
                      ></i>
                      <input
                        type="password"
                        value={cpass}
                        placeholder="Confirm Password"
                        id="Confirmpassword"
                        className="mx-2"
                        onChange={(e) => setcpass(e.target.value)}
                        required
                      />
                      {passcolor==='red'?<></>:<i class="fa-solid fa-check" style={{ marginRight: "-20px"}}></i>}
                    </FormGroup>
                    <Button
                      className="btn secondary__btn auth__btn"
                      type="submit"
                    >
                      Create Account
                    </Button>
                  </Form>
                  <p>
                    Already have an account? <Link to="/login">Login</Link>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Register;
