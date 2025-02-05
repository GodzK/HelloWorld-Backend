import React, { useState } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const Booking = () => {
  const [events, setEvents] = useState([]);

  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt('Enter Booking Title');
    if (title) {
      setEvents([...events, { start, end, title }]);
    }
  };

  return (
    <div className="booking-container">
      <h2>Book Your Room</h2>
      <Calendar
        selectable
        localizer={localizer}
        events={events}
        
        startAccessor="start"
        endAccessor="end"
        defaultView={Views.WEEK}
        onSelectSlot={handleSelectSlot}
        style={{ height: 600 ,}}

      />
    </div>
  );
};

export default Booking;
