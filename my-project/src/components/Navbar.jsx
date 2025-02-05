import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <div>
        <Link to="/login">Login/Register</Link>
        <Link to="/bookings">Bookings</Link>
        <Link to="/book-room">Book Room</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </div>
  );
};

export default Navbar;