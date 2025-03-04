import React from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import '../styles/thank-you.css'
import '../styles/mode.css'
const ThankYou = ({color}) => {
   document.title="Thank You | Travel World"
   return (
      <section>
         <Container>
            <Row>
               <Col lg='12' className='pt-5 text-center'>
                  <div className="thank__you">
                     <span><i className='ri-checkbox-circle-line'></i></span>
                     <h1 className='mb-3 fw-semibold' id={color}>Thank You</h1>
                     <h3 className='mb-4' id={color}>Your Tour Is Booked Successfully</h3>
                     <h5 className='mb-4' id={color}>our agent will contact you soon!</h5>

                     <Button className='btn primary__btn w-25' id={color}><Link to='/home'>Back To Home</Link></Button>
                  </div>
               </Col>
            </Row>
         </Container>
      </section>
   )
}

export default ThankYou