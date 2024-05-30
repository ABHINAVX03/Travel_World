import React, { useState, useEffect, useId } from 'react'
import '../styles/tour-details.css'
import { Container, Row, Col } from 'reactstrap'
import { useParams } from 'react-router-dom'
import calculateAvgRating from '../utils/avgRating'
import Booking from '../components/Booking/Booking'
import Newsletter from '../shared/Newsletter'
import useFetch from '../hooks/useFetch'
import { BASE_URL } from '../utils/config'
const TourDetails = ({color,mode}) => {
   const { id } = useParams()
  
   const [tourRating, setTourRating] = useState(null)
   const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`)

   const { photo, title, desc, price, reviews, city, address, distance, maxGroupSize } = tour

   const { totalRating, avgRating } = calculateAvgRating(reviews)

   const options = { day: 'numeric', month: 'long', year: 'numeric' }
   // additional code to make change color once review clicked
   const [clickedStarIndex, setClickedStarIndex] = useState(null);
   const handleClick = (index) => {
      setClickedStarIndex(index);
      const rating = index + 1; // Convert index to rating (1-based)
      setTourRating(rating);
   };
   var name;
   var background
   if(mode==='dark'){
      name='black'
      background='#242526'
   }
   if(mode==='light'){
      name='white'
      background='white'
   }


   useEffect(() => {
      window.scrollTo(0, 0)
   }, [tour])
   const unique_id=useId();
   
   return (
      <section>
         <Container>
            {loading && <h4 className='text-center pt-5' id={color}>LOADING.........</h4>}
            {error && <h4 className='text-center pt-5' id={color}>{error}</h4>}
            {
               !loading && !error &&
               <Row>
                  <Col lg='8'>
                     <div className="tour__content">
                        <img src={photo} alt="" />

                        <div className="tour__info" style={{backgroundColor:`${background}`}}>
                           <h2 id={color}>{title}</h2>
                           <div className="d-flex align-items-center gap-5" id={color}>
                              <span className="tour__rating d-flex align-items-center gap-1" id={color}>
                                 <i className='ri-star-fill' id={color} style={{ 'color': 'var(--secondary-color)' }}></i> {avgRating === 0 ? null : avgRating}
                                 {avgRating === 0 ? ('Not rated') : (<span id={color}>({reviews?.length})</span>)}
                              </span>

                              <span id={color}><i className='ri-map-pin-fill'></i> {address}</span>
                           </div>

                           <div className="tour__extra-details" >
                              <span id={color}><i className='ri-map-pin-2-line'></i> {city}</span>
                              <span id={color}><i className='ri-money-dollar-circle-line'></i> {price}/ per person</span>
                              <span id={color}><i className='ri-map-pin-time-line'></i> {distance} k/m</span>
                              <span id={color}><i className='ri-group-line'></i> {maxGroupSize} people</span>
                           </div>
                           <h5 id={color}>Description</h5>
                           <p id={color}>{desc}</p>
                        </div>
                     </div>
                  </Col>

                  <Col lg='4'>
                     <Booking color={color} tour={tour} avgRating={avgRating} id={id}/>
                  </Col>
               </Row>
            }
         </Container>
         <Newsletter />
      </section>

   )
}

export default TourDetails