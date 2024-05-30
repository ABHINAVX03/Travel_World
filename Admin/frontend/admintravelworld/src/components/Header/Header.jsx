import React, { useEffect, useRef, useContext } from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "./header.css";
import { AuthContext } from "../../context/AuthContext";
import { useToast, Tooltip } from "@chakra-ui/react";
import logo1 from "../../assets/images/dark_logo.png";
import logo2 from "../../assets/images/light_logo.png";

const nav__links = [
  {
    path: "/home",
    display: "Home",
  },
];
const nav__links2 = [
  {
    path: "/bookings",
    display: "Bookings",
  },
  {
    path: "/tour",
    display: "Tours",
  },
];

const Header = ({ togglemode, color, logo, mode }) => {
  const toast = useToast();
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    toast({
      title: "Logout Successfully!",
      description: "We'av logged out your account!",
      status: "success",
      duration: "9000",
      isClosable: false,
      description: "",
    });
    navigate("/");
  };

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        (document.documentElement.scrollTop > 80 && color === "dark")
      ) {
        headerRef.current.classList.add("sticky__header1");
        headerRef.current.classList.remove("sticky__header2");
      } else if (
        document.body.scrollTop > 80 ||
        (document.documentElement.scrollTop > 80 && color === "light")
      ) {
        headerRef.current.classList.remove("sticky__header1");
        headerRef.current.classList.add("sticky__header2");
      } else {
        headerRef.current.classList.remove("sticky__header1");
        headerRef.current.classList.remove("sticky__header2");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return window.removeEventListener("scroll", stickyHeaderFunc);
  });

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");
  let background;
  if (color === "light") {
    background = "#121212";
  } else {
    background = "white";
  }
  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div
            className="nav__wrapper d-flex align-items-center justify-content-between"
            id={color}
          >
            {/* ========== LOGO ========== */}
            <div className="logo">
              <Link to="/home">
                {color == "light" ? (
                  <img src={logo1} alt="" style={{ marginTop: "-10px" }} />
                ) : (
                  <img src={logo2} alt="" style={{ marginTop: "-10px" }} />
                )}
              </Link>
            </div>
            {/* ========================== */}
            {/* ========== MENU START ========== */}
            <div
              className="navigation"
              ref={menuRef}
              id={color}
              onClick={toggleMenu}
            >
              <ul
                className="menu d-flex align-items-center gap-5"
                style={{ backgroundColor: `${background}` }}
              >
                {nav__links.map((item, index) =>
                  color == "light" ? (
                    <li className="nav__item2" key={index} id={color}>
                      <NavLink
                        style={{ textDecoration: "none" }}
                        to={item.path}
                        className={(navClass) =>
                          navClass.isActive ? "active__link" : ""
                        }
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  ) : (
                    <li className="nav__item1" key={index} id={color}>
                      <NavLink
                        style={{ textDecoration: "none" }}
                        to={item.path}
                        className={(navClass) =>
                          navClass.isActive ? "active__link" : ""
                        }
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  )
                )}
              </ul>
            </div>
            {/* ================================ */}

            <div className="nav__right d-flex align-items-center gap-3">
              <div className="nav__btns d-flex align-items-center gap-2">
                {user ? (
                  <>
                    {" "}
                    <div
                      className="navigation"
                      ref={menuRef}
                      id={color}
                      onClick={toggleMenu}
                    >
                      <ul
                        className="menu d-flex align-items-center gap-5"
                        style={{ backgroundColor: `${background}` }}
                      >
                        {nav__links2.map((item, index) =>
                          color == "light" ? (
                            <li className="nav__item2" key={index} id={color}>
                              <NavLink
                                style={{ textDecoration: "none" }}
                                to={item.path}
                                className={(navClass) =>
                                  navClass.isActive ? "active__link" : ""
                                }
                              >
                                {item.display}
                              </NavLink>
                            </li>
                          ) : (
                            <li className="nav__item1" key={index} id={color}>
                              <NavLink
                                style={{ textDecoration: "none" }}
                                to={item.path}
                                className={(navClass) =>
                                  navClass.isActive ? "active__link" : ""
                                }
                              >
                                {item.display}
                              </NavLink>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                    <h5 className="mb-0 mx-4" id={color}>
                      <span style={{ color: "#faa935", fontSize: "15px" }}>
                        Hello!
                      </span>{" "}
                      {user.username}
                    </h5>
                    <Button className="btn primary__btn" onClick={logout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <button className="change" id={color}>
                      <Link
                        to="/login"
                        style={{ textDecoration: "none" }}
                        className="mx-4"
                        id={color}
                      >
                        Login
                      </Link>
                    </button>
                    <Button className="btn primary__btn">
                      <Link to="/register" style={{ textDecoration: "none" }}>
                        Register
                      </Link>
                    </Button>
                  </>
                )}
                {/* <Button className='btn secondary__btn'><Link to='/login'>Login</Link></Button>
                        <Button className='btn primary__btn'><Link to='/register'>Register</Link></Button> */}
              </div>

              <span className="mobile__menu" onClick={toggleMenu}>
                <i className="ri-menu-line" id={color}></i>
              </span>
              <Tooltip label={`Enable ${color} mode`} fontFamily={"sans-serif"}>
                <i>
                  <button onClick={togglemode}>
                    <i className={`fa-solid fa-${logo}`} style={{outline:'none'}}></i>
                  </button>
                </i>
              </Tooltip>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
