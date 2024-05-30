import React,{useContext} from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Tours from '../pages/Tours';
import TourDetails from '../pages/TourDetails';
import Login from '../pages/Login';
import Register from '../pages/Register';
import SearchResultList from '../pages/SearchResultList';
import { AuthContext } from '../context/AuthContext';
import Bookings from '../pages/Bookings';
const Routers = ({color,mode}) => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home color={color}/>} />
      <Route path="/tour" element={<Tours color={color}/>} />
      <Route path="/bookings" element={<Bookings color={color}/>} />
      <Route path="/tours/:id" element={<TourDetails color={color} mode={mode}/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register color={color}/>} />
      <Route path="/tours/search" element={<SearchResultList color={color}/>} />
    </Routes>
  );
};

export default Routers;
