import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";
import registerImg from "../assets/images/login.png";
import userIcon from "../assets/images/user.png";
import { AuthContext } from "../context/AuthContext";
import { useToast } from "@chakra-ui/react";
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
  document.title = "Admin Register | Travel World";
  const [type, setType] = useState("password");
  const [cpass, setcpass] = useState("");
  const [passcolor, setpasscolor] = useState("red");
  const [showpasskey,setpasskey]=useState("password")
  const [key,setkey]=useState('')
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
  const showkey = () => {
    if (showpasskey == "password") {
      setpasskey("text");
    } else {
      setpasskey("password");
    }
  };
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const CheckPassKey=()=>{
    if(key==='ABCD'){
      return true;
    }
    else{
      return false;
    }
  }
  const handleClick = async (e) => {
    e.preventDefault();
    if(CheckPassKey()){
    if (credentials.password != cpass) {
      return toast({
        title: "Check password",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
    } else {
      try {
        const res = await fetch("http://localhost:2222/api/v1/auth/register", {
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
    }}else{
      toast({
        title:'Invalid Pass Key!',
        description:'Enter the valid Pass Key',
        duration:9000,
        isClosable:true,
        position:'bottom',
        status:'error'
      })
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
                        <img
                          src={userIcon}
                        />
                  </div>
                  <h2>Admin Register</h2>

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
                    <FormGroup
                      className="d-flex"
                      style={{ justifyContent: "center", alignItems: "center" }}
                    >
                      <i class="fa-solid fa-key my-2 mx-1" style={{fontSize:'20px'}}></i>
                      <input
                        type={`${showpasskey}`}
                        placeholder="Admin Pass Key!"
                        id="key"
                        value={key}
                        className="mx-2"
                        onChange={(e)=>setkey(e.target.value)}
                        required
                      />
                      <i
                        className="fa-solid fa-eye"
                        style={{ marginRight: "-20px", cursor: "pointer" }}
                        onClick={showkey}
                      ></i>
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
