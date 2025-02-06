import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import Swal from "sweetalert2";

const API_URL = "http://localhost:3000/api";
const localizer = momentLocalizer(moment);

const BookingCalendar = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [user, setUser] = useState(null);

  const getUserProfile = async () => {
    return await axios.get(`${API_URL}/users/Profile`, {
      withCredentials: true,
    });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();
        setUser(response.data);
        fetchAllBookings();
      } catch (error) {
        Swal.fire("Error", "You haven't logged in yet", "error");
        window.location.href = "/login";
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (selectedSlot) {
      handleConfirmBooking();
    }
  }, [selectedSlot]); 

  const fetchAllBookings = async () => {
    try {
      const res = await axios.get(`${API_URL}/bookings`, {
        withCredentials: true,
      });
      const formattedBookings = res.data.bookings.map((booking) => ({
        id: booking.booking_id,
        title: `Booked by ${booking.email}`,
        description:` ${booking.description}`,
        start: new Date(booking.start_time),
        end: new Date(booking.end_time),
      }));
      setBookings(formattedBookings);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const handleSelectSlot = ({ start, end }) => {
    setSelectedSlot({ start, end });
  };

  const createBooking = async (bookingData) => {
    return await axios.post(`${API_URL}/bookings`, bookingData, {
      withCredentials: true,
    });
  };

  const handleConfirmBooking = async () => {
    if (!user) {
      Swal.fire("Error", "You need to log in first!", "error");
      return;
    }
  
    const { value: description } = await Swal.fire({
      title: "Confirm Booking",
      input: "text",
      inputLabel: "Enter a description for your booking",
      inputPlaceholder: "e.g., Team meeting, study session...",
      showCancelButton: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to provide a description!";
        }
      },
    });
  
    if (!description) return; 
  
    try {
      await createBooking({
        user_id: user.id,
        room_id: 1,
        start_time: moment(selectedSlot.start).format("YYYY-MM-DD HH:mm:ss"),
        end_time: moment(selectedSlot.end).format("YYYY-MM-DD HH:mm:ss"),
        status: "Pending",
        description,
        created_by: user.id,
      });
  
      fetchAllBookings();
      setSelectedSlot(null);
      Swal.fire("Success", "Booking confirmed", "success");
    } catch (err) {
      console.error("Booking failed:", err);
      Swal.fire("Error", "Booking failed", "error");
    }
  };
  

  const handleDeleteBooking = async (bookingId) => {
    try {
      await axios.delete(`${API_URL}/bookings/${bookingId}`, {
        withCredentials: true,
      });
      fetchAllBookings();
      Swal.fire("Success", "Booking deleted", "success");
    } catch (err) {
      console.error("Deletion failed:", err);
      Swal.fire("Error", "Deletion failed", "error");
    }
  };

  return (
    <div style={{ height: "500px", margin: "20px" }}>
      <h1>Bookings Calendar</h1>
      <Calendar
        localizer={localizer}
        events={bookings}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        defaultView="week"
        views={["month", "week", "day"]}
        components={{
          event: ({ event }) => (
            <div>
              <span>{event.title}</span>
              <br />
              <small>{event.description}</small> 
              
              {user && event.user_id === user.id && (
                <button onClick={() => handleDeleteBooking(event.id)}>Delete</button>
              )}
            </div>
          ),
        }}
      />
    </div>
  );
};

export default BookingCalendar;
