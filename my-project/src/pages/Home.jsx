import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className="home-container">
      <div className="content-box">
        <h1 className="title">Welcome to the Room Booking System</h1>
        <p className="description">Please login or register to book a room.</p>
        <Link to="/bookings"><button className="cta-button">Get Started</button></Link>
      </div>
    </div>
  );
};

export default Home;