import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/config";
import "../styles/mode.css";
import "../styles/bookings.css";
import {Container, Row } from 'reactstrap'
import { CommonSectionBooking } from "../shared/CommonSectionBooking";

const Bookings = ({ color }) => {
  document.title = "Admin Bookings | Travel World";
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/booking/`);
        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }
        const { data } = await response.json();
        setBookings(data); // Set the array directly to bookings state
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchData();
  }, []);
  let count=0;
  return (
    <>
    <CommonSectionBooking title={"All Bookings"}></CommonSectionBooking>
    <section>
            <Container>
               <Row>
               </Row>
            </Container>
         </section>
    <div className="tableContainer">
      <table id={color}>
        <tr>
          <th>Sno.</th>
          <th>User Id</th>
          <th>Date</th>
          <th>Email</th>
          <th>Full Name</th>
          <th>Tour Name</th>
          <th>Guest Size</th>
          <th>Address</th>
          <th>from - to</th>
          <th>Phone</th>
          <th>Mode of Transport</th>
          <th>Hotel</th>
          <th>Amount</th>
        </tr>
        {bookings.map((element) => (
          <tr key={element.userId}>
            <td>{++count}</td>
            <td>{element.userId}</td>
            <td>{JSON.stringify(element.createdAt).slice(1, 11)}</td>
            <td>{element.userEmail}</td>
            <td>{element.fullName}</td>
            <td>{element.tourName}</td>
            <td>{element.guestSize}</td>
            <td>{element.address}</td>
            <td>
              {JSON.stringify(element.bookAt).slice(1, 11)} to{" "}
              {JSON.stringify(element.bookTill).slice(1, 11)}
            </td>
            <td>{element.phone}</td>
            <td>{element.ModeTransport}</td>
            <td>{element.Hotel} ⭐️</td>
            <td>{element.amount}</td>
          </tr>
        ))}
      </table>
    </div>
    <p id={color} style={{justifyContent:'center',display:'flex',marginTop:'15px'}}>*** Booking End ***</p>
    </>
  );
};

export default Bookings;
