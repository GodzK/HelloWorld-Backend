import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <div>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/bookings">My Bookings</Link>
        <Link to="/book-room">Book Room</Link>
      </div>
    </div>
  );
};

export default Navbar;