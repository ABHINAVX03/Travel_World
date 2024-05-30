import React, { useState, useContext, useEffect } from "react";
import "./booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";
import { useToast } from "@chakra-ui/react";
import emailjs from "@emailjs/browser";

const Booking = ({ tour, avgRating, color }) => {
  document.title = "Booking | Travel World";
  const { price, reviews, title } = tour;
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useContext(AuthContext);
  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourName: title,
    fullName: "",
    phone: "",
    address: "",
    guestSize: 1,
    bookAt: "",
    bookTill: "",
    ModeTransport: "ModeTransport",
    Hotel: 1,
  });

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  today = dd + "/" + mm + "/" + yyyy;
  const sendEmail = async () => {
    const serviceId = "service_bfvf3h9";
    const templateId = "template_nxxatkf";
    try {
      await emailjs.send(serviceId, templateId, {
        date: today,
        name: booking.fullName,
        id: booking.userId,
        Phone_number: booking.phone,
        from: booking.bookAt,
        to: booking.bookTill,
        guest: booking.guestSize,
        Address: booking.address,
        hotel: booking.Hotel,
        mode: booking.ModeTransport,
        amount: totalAmount,
        tour_name: booking.tourName,
        recipient: user.email,
      });
      toast({
        title: "Email send Successfully!",
        description:'Please Check your Mail Inbox!',
        isClosable: true,
        duration: 6000,
        position: "bottom",
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => emailjs.init("bz6iUB_snpdDr63Bb"), []);
  const handleChange = (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  let rooms = Number(booking.guestSize);
  let temp = rooms;
  if (Number(booking.guestSize) % 2 === 0) {
    rooms = rooms % 4;
    temp = temp + rooms;
    temp = Math.round(temp / 4);
  } else if (Number(booking.guestSize) % 2 !== 0) {
    rooms = rooms % 4;
    temp = temp + rooms;
    temp = Math.round(temp / 4) - 1;
  }

  let p;
  if (booking.Hotel === '1' || booking.Hotel === '2') {
    p = 19 * temp;
  } else if (booking.Hotel === '3') {
    p = 49 * temp;
  } else if (booking.Hotel === '4') {
    p = 79 * temp;
  } else if (booking.Hotel === '5') {
    p = 99 * temp;
  }
  let modePrice = 0;
  if (booking.ModeTransport === "AirPlane") {
    modePrice = 150 * Number(booking.guestSize);
  } else if (booking.ModeTransport === "Ship") {
    modePrice = 100 * Number(booking.guestSize);
  }
  const serviceFee = 10;
  const totalAmount =
    Number(price) * Number(booking.guestSize) +
    Number(serviceFee) +
    Number(p) +
    Number(modePrice);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      if (!user || user === undefined || user === null) {
        return toast({
          title: "Please Sign in!",
          description: "Login error",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }

      const res = await fetch(`${BASE_URL}/api/v1/booking`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(booking),
      });

      //const result = await res.json();
      //console.log(Booking);
      if (!res.ok) {
        return toast({
          title: "Error Occur!",
          description: "Please Enter the full information",
          status: "warning",
          duration: 9000,
          isClosable: true,
        });
      }
      navigate("/thank-you");
      toast({
        title: "Booking successfully!",
        description: "Reaching you shortly!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      toast({
        title: "Payment!",
        description: "Check you email for confirm your booking",
        status: "info",
        isClosable: true,
      });
      sendEmail()
    } catch (error) {
      error(error.message);
    }
  };

  let name;
  if (color === "light") {
    name = "#242526";
  } else if (color === "dark") {
    name = "white";
  }

  return (
    <div className="booking" style={{ backgroundColor: `${name}` }}>
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3 id={color}>
          ${price} <span id={color}>/per person</span>
        </h3>
        <span className="tour__rating d-flex align-items-center" id={color}>
          <i
            className="ri-star-fill"
            style={{ color: "var(--secondary-color)" }}
          ></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      {/* =============== BOOKING FORM START ============== */}
      <div className="booking__form">
        <h5 id={color}>Information</h5>
        <Form
          className={`${color === "dark" ? "booking__info-form" : ""}`}
          onSubmit={handleClick}
        >
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="tel"
              placeholder="Phone"
              id="phone"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              placeholder=""
              id="bookAt"
              required
              onChange={handleChange}
            />
            <input
              type="date"
              placeholder=""
              id="bookTill"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="number"
              placeholder="Number of Guests..."
              id="guestSize"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="text"
              placeholder="Address..."
              id="address"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="" id={color}>
              Hotel
            </label>
            <div
              className=""
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
              id={color}
            >
              <input
                type="radio"
                value={1}
                id="Hotel"
                name="Hotel"
                onChange={handleChange}
              />
              1⭐️
              <input
                type="radio"
                value={2}
                id="Hotel"
                name="Hotel"
                onChange={handleChange}
              />
              2⭐️
              <input
                type="radio"
                value={3}
                id="Hotel"
                name="Hotel"
                onChange={handleChange}
              />
              3⭐️
              <input
                type="radio"
                value={4}
                id="Hotel"
                name="Hotel"
                onChange={handleChange}
              />
              4⭐️
              <input
                type="radio"
                value={5}
                id="Hotel"
                name="Hotel"
                onChange={handleChange}
              />
              5⭐️
            </div>
          </FormGroup>
          <FormGroup>
            <label id={color}>Mode Transport</label>
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
              id={color}
            >
              <input
                type="radio"
                value="AirPlane"
                name="ModeTransport"
                id="ModeTransport"
                onChange={handleChange}
              />
              AirPlane
              <input
                type="radio"
                value="Ship"
                id="ModeTransport"
                name="ModeTransport"
                onChange={handleChange}
              />
              Ship/Ferry
            </div>
          </FormGroup>
        </Form>
      </div>
      {/* =============== BOOKING FORM END ================ */}

      {/* =============== BOOKING BOTTOM ================ */}

      <div className="booking__bottom">
        {name === "#242526" ? (
          <hr id={color} style={{ width: "100%", borderWidth: "2.5px" }}></hr>
        ) : (
          <></>
        )}

        <h6 id={color}>Bill</h6>

        <ListGroup>
          <ListGroupItem
            className="border-0 px-0"
            style={{ backgroundColor: `${name}` }}
          >
            <h5 className="d-flex align-items-center gap-1" id={color}>
              ${price} <i className="ri-close-line"></i>
              {booking.guestSize} person
            </h5>
            <span id={color}> ${price * booking.guestSize}</span>
          </ListGroupItem>
          <ListGroupItem
            className="border-0 px-0"
            style={{ backgroundColor: `${name}` }}
          >
            <h5 className="d-flex align-items-center gap-1" id={color}>
              {booking.Hotel}⭐️<i className="ri-close-line"></i>
              {booking.guestSize} person
            </h5>
            <span id={color}> ${p}</span>
          </ListGroupItem>
          <ListGroupItem
            className="border-0 px-0"
            style={{ backgroundColor: `${name}` }}
          >
            <h5 className="d-flex align-items-center gap-1" id={color}>
              {booking.ModeTransport}
              <i className="ri-close-line"></i>
              {booking.guestSize} person
            </h5>
            <span id={color}> ${modePrice}</span>
          </ListGroupItem>
          <ListGroupItem
            className="border-0 px-0"
            style={{ backgroundColor: `${name}` }}
          >
            <h5 id={color}>Service charge</h5>
            <span id={color}>${serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem
            className="border-0 px-0 total"
            style={{ backgroundColor: `${name}` }}
          >
            <h5 id={color}>Total</h5>
            <span id={color}>${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>

        <Button className="btn primary__btn w-100 mt-4" onClick={handleClick}>
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default Booking;
