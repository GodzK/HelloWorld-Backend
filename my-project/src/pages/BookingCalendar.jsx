import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getBookings, createBooking, cancelBooking } from "../api.js";

const localizer = momentLocalizer(moment);

const BookingsCalendar = () => {
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({
    title: "",
    start: "",
    end: "",
    room_id: "",
    description: "",
  });

  // Fetch bookings on component mount
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await getBookings();
      const formattedBookings = response.data.map((booking) => ({
        id: booking.booking_id,
        title: booking.description,
        start: new Date(booking.start_time),
        end: new Date(booking.end_time),
        room_id: booking.room_id,
      }));
      setBookings(formattedBookings);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  };

  const handleSelectSlot = (slotInfo) => {
    const { start, end } = slotInfo;
    setNewBooking({
      ...newBooking,
      start: start.toISOString(),
      end: end.toISOString(),
    });
   
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
      };
      await createBooking(bookingData);
      fetchBookings(); 
    } catch (error) {
      console.error("Failed to create booking:", error);
    }
  };

  const handleSelectEvent = (event) => {
    const confirmCancel = window.confirm(
      `Cancel booking: ${event.title}?`
    );
    if (confirmCancel) {
      handleCancelBooking(event.id);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await cancelBooking(bookingId);
      fetchBookings(); // Refresh bookings
    } catch (error) {
      console.error("Failed to cancel booking:", error);
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
        onSelectEvent={handleSelectEvent}
        defaultView="week"
        views={["month", "week", "day"]}
      />
    </div>
  );
};

export default BookingsCalendar;