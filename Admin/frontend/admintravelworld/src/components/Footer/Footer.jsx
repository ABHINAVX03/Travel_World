import React from 'react'
import './footer.css'
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import logo1 from '../../assets/images/dark_logo.png'
import logo2 from '../../assets/images/light_logo.png'

const quick__links = [
  {
    path: '/home',
    display: 'Home'
  },
  {
    path: '/about',
    display: 'About'
  },
  {
    path: '/tours',
    display: 'Tours'
  },
]

const quick__links2 = [
  {
    path: '/gallery',
    display: 'Gallery'
  },
  {
    path: '/login',
    display: 'Login'
  },
  {
    path: '/register',
    display: 'Register'
  },
]
const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
};
const Footer = ({color}) => {

  const year = new Date().getFullYear()
  let name
  let background
  if(color==='light'){
    name='black'
    background='#121212'
  }
  if(color==='dark'){
    name='white';
    background='white'
  }
  return (
    <footer className='footer'>
      <Container>
        <Row>
          <Col lg='3'>
            <div className="logo">
              <Link to={'/home'} onClick={scrollToTop}>{color=='light'?<img src={logo1} alt="" />:<img src={logo2} alt="" />}</Link>
              <p id={color}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, enim.</p>
              <div className="social__link d-flex align-items-center gap-4">
                <span>
                  <Link to='#'>
                    <i className='ri-youtube-line' id={color}></i>
                  </Link>
                </span>
                <span>
                  <Link to='#'>
                    <i className='ri-github-fill' id={color}></i>
                  </Link>
                </span>
                <span>
                  <Link to='#'>
                    <i className='ri-facebook-circle-line' id={color}></i>
                  </Link>
                </span>
                <span>
                  <Link to='#'>
                    <i className='ri-instagram-line' id={color}></i>
                  </Link>
                </span>
              </div>
            </div>
          </Col>

          <Col lg='3'>
            <h5 className="footer__link-title" id={color}>Discover</h5>

            <ListGroup className='footer__quick-links' >
              {
                quick__links.map((item, index) => (
                  <ListGroupItem key={index} className='ps-0 border-0' style={{background:`${background}`}}>
                    <Link to={item.path} id={color}>{item.display}</Link>
                  </ListGroupItem>
                ))
              }
            </ListGroup>
          </Col>
          <Col lg='3'>
            <h5 className="footer__link-title" id={color}>Quick Links</h5>

            <ListGroup className='footer__quick-links'>
              {
                quick__links2.map((item, index) => (
                  <ListGroupItem key={index} className='ps-0 border-0' style={{background:`${background}`}}>
                    <Link to={item.path} id={color}>{item.display}</Link>
                  </ListGroupItem>
                ))
              }
            </ListGroup>
          </Col>
          <Col lg='3'>
            <h5 className="footer__link-title" id={color}>Contact</h5>

            <ListGroup className='footer__quick-links'>
              <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3' style={{background:`${background}`}}>
                <h6 className='mb-0 d-flex align-items-center gap-2' id={color}>
                  <span><i className='ri-map-pin-line'></i></span>
                  Address:
                </h6>
                <p className='mb-0' id={color}>DELHI</p>
              </ListGroupItem>

              <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3' style={{background:`${background}`}}>
                <h6 className='mb-0 d-flex align-items-center gap-2' id={color}>
                  <span><i className='ri-mail-line'></i></span>
                  Email:
                </h6>

                <p className='mb-0' id={color}>guptaabhinav697@gmail.com</p>
              </ListGroupItem>

              <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3' style={{background:`${background}`}}>
                <h6 className='mb-0 d-flex align-items-center gap-2' id={color}>
                  <span><i className='ri-phone-fill'></i></span>
                  Phone:
                </h6>

                <p className='mb-0' id={color}>95556754XX</p>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col lg='12' className='text-center pt-5'>
            <p className='copyright d-flex justify-content-center' id={color}>
              <span>
                <i className="ri-copyright-line"></i></span>
              Copyright {year}, designed and developed by Abhinav Gupta.
              All rights reserved.
            </p>

          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer