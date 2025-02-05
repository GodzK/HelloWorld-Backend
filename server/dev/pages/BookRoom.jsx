import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BookRoom = () => {
  const [roomId, setRoomId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:3000/api/bookings',
        { room_id: roomId, start_time: startTime, end_time: endTime, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/bookings');
    } catch (error) {
      alert('Booking failed');
    }
  };

  return (
    <div className="form-container">
      <h2>Book a Room</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Room ID" value={roomId} onChange={(e) => setRoomId(e.target.value)} required />
        <input type="datetime-local" placeholder="Start Time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
        <input type="datetime-local" placeholder="End Time" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <button type="submit">Book Room</button>
      </form>
    </div>
  );
};

export default BookRoom;