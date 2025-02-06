import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getBookings, createBooking, cancelBooking } from "../api.js";

const localizer = momentLocalizer(moment);

const BookingsCalendar = () => {
  const [bookings, setBookings] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserInfo();
    fetchBookings();
  }, []);

  // ✅ Fetch Bookings from API
  const fetchBookings = async () => {
    try {
      const response = await getBookings();
      const formattedBookings = response.data.map((booking) => ({
        id: booking.booking_id,
        title: booking.description,
        start: new Date(booking.start_time),
        end: new Date(booking.end_time),
        room_id: booking.room_id,
        user_id: booking.user_id,
      }));
      setBookings(formattedBookings);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      alert("Failed to load bookings. Please try again later.");
    } finally {
      setLoading(false);
    }
  };


  const fetchUserInfo = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users/role", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: "student" }), 
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setUserRole(data.role);
      setUserId(data.user_id);
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      alert("Failed to load user info. Please try again later.");
    }
  };

  const handleSelectSlot = (slotInfo) => {
    if (userRole !== "student") {
      alert("Only students can book rooms.");
      return;
    }

    const { start, end } = slotInfo;
    const room_id = prompt("Enter the room ID:");
    const title = prompt("Enter a title for the booking:");

    if (title && room_id) {
      handleCreateBooking({ title, start, end, room_id });
    }
  };

  const handleCreateBooking = async (bookingDetails) => {
    try {
      const { title, start, end, room_id } = bookingDetails;
      const bookingData = {
        room_id,
        start_time: start.toISOString(),
        end_time: end.toISOString(),
        status: "pending",
        description: title,
        user_id: userId,
      };
      await createBooking(bookingData);
      fetchBookings();
    } catch (error) {
      console.error("Failed to create booking:", error);
      alert("Failed to create booking. Please try again later.");
    }
  };

  // ✅ Cancel a Booking
  const handleSelectEvent = (event) => {
    if (event.user_id !== userId) {
      alert("You can only cancel your own bookings.");
      return;
    }

    const confirmCancel = window.confirm(`Cancel booking: ${event.title}?`);
    if (confirmCancel) {
      handleCancelBooking(event.id);
    }
  };

  // ✅ Handle Booking Cancellation
  const handleCancelBooking = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      fetchBookings();
    } catch (error) {
      console.error("Failed to cancel booking:", error);
      alert("Failed to cancel booking. Please try again later.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (userRole === "student" || userRole === "lecturer") {
    return (
      <div style={{ height: "500px", margin: "20px" }}>
        <h1>Bookings Calendar</h1>
        <Calendar
          localizer={localizer}
          events={bookings}
          startAccessor="start"
          endAccessor="end"
          selectable={userRole === "student"}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          defaultView="week"
          views={["month", "week", "day"]}
        />
      </div>
    );
  // } else {
  //   return <div>You do not have permission to access the bookings calendar.</div>;
  // }
};

export default BookingsCalendar;
