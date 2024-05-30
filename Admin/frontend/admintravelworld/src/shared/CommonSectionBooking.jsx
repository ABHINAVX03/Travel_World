import React from 'react'
import './common-section-booking.css'
import { Container, Row, Col } from 'reactstrap'

export const CommonSectionBooking = ({title}) => {
  return (
    <section className="common__section2">
         <Container>
            <Row>
               <Col lg='12'>
                  <h1>{title}</h1>
               </Col>
            </Row>
         </Container>
      </section>
  )
}
