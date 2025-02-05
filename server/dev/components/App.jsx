import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookRoom from './pages/BookRoom';
import Bookings from './pages/Booking';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/book-room" element={<BookRoom />} />
        <Route path="/bookings" element={<Bookings />} />
      </Routes>
    </Router>
    
  );
}

export default App;