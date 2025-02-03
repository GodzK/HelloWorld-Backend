import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./App.css";

const Navbar = ({ user, setUser }) => (
  <nav className="navbar">
    <Link to="/" className="navbar-link">Home</Link>
    {user ? (
      <>
        <Link to="/profile" className="navbar-link">Profile</Link>
        <button onClick={() => setUser(null)} className="logout-btn">Logout</button>
      </>
    ) : (
      <Link to="/login" className="navbar-link">Login</Link>
    )}
  </nav>
);

const Login = ({ setUser }) => {
  const handleLogin = () => setUser("User");
  return (
    <div className="login-card">
      <h2>Login</h2>
      <button onClick={handleLogin} className="login-btn">Login</button>
    </div>
  );
};

const Booking = ({ room, time, setBooking, bookings, user }) => (
  <div className="booking">
    <h3>Booking for {room} at {time}</h3>
    <h4>Current Bookings:</h4>
    <ul>
      {bookings.map((b, index) => (
        <li key={index}>{b.user} booked {b.room} at {b.time}</li>
      ))}
    </ul>
    <button onClick={() => setBooking({ user, room, time })} className="confirm-btn">Confirm Booking</button>
  </div>
);

const Room = ({ selectedDate, user, bookings, setBookings }) => {
  const rooms = ["Room 101", "Room 102", "Room 103", "Room 104", "Room 105", "Room 106"];
  const times = ["09:00 AM", "11:00 AM", "01:00 PM", "03:00 PM", "05:00 PM"];
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const setBooking = (newBooking) => setBookings([...bookings, newBooking]);

  return (
    <div className="room-container">
      <h3>Available Rooms on {selectedDate.toDateString()}</h3>
      <div className="room-list">
        {rooms.map((room, index) => (
          <button
            key={index}
            className={selectedRoom === room ? "room selected" : "room"}
            onClick={() => setSelectedRoom(room)}
          >
            {room}
          </button>
        ))}
      </div>
      {selectedRoom && (
        <div className="time-selector">
          <h4>Select a Time</h4>
          {times.map((time, index) => (
            <button
              key={index}
              className={selectedTime === time ? "time selected" : "time"}
              onClick={() => setSelectedTime(time)}
            >
              {time}
            </button>
          ))}
        </div>
      )}
      {selectedRoom && selectedTime && (
        <Booking room={selectedRoom} time={selectedTime} setBooking={setBooking} bookings={bookings} user={user} />
      )}
    </div>
  );
};

const Home = ({ user }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookings, setBookings] = useState([]);

  return (
    <div className="container">
      <h2>Select a Date</h2>
      <Calendar onChange={setSelectedDate} value={selectedDate} className="react-calendar" />
      <Room selectedDate={selectedDate} user={user} bookings={bookings} setBookings={setBookings} />
    </div>
  );
};

const Profile = ({ user, bookings }) => (
  <div className="profile-container">
    <h2>{user}'s Profile</h2>
    <h3>Your Bookings</h3>
    <ul>
      {bookings.filter(b => b.user === user).map((b, index) => (
        <li key={index}>{b.room} at {b.time} on {b.date}</li>
      ))}
    </ul>
  </div>
);

const App = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<Login setUser={setUser}  />} />
        <Route path="/profile" element={<Profile user={user} bookings={bookings} />} />
      </Routes>
    </Router>
  );
};

export default App;
