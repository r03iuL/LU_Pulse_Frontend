import  { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Events = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({
    '2024-09-18': ['Orientation Program', 'Campus Tour'],
    '2024-09-20': ['Guest Lecture: AI in Education'],
    // Add more dates and events as needed
  });

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const selectedDate = formatDate(date);
  const eventList = events[selectedDate] || [];

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full px-20">
      {/* Calendar Section */}
      <div className="w-full md:w-1/3 p-5 bg-white shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">Calendar</h2>
        <Calendar
          onChange={handleDateChange}
          value={date}
          className="shadow-md"
        />
      </div>

      {/* Event Viewer Section */}
      <div className="w-full md:w-2/3 p-5 bg-white shadow-lg ml-0 md:ml-4">
        <h2 className="text-2xl font-semibold mb-4 text-center">Events</h2>
        {eventList.length > 0 ? (
          <ul className="list-disc list-inside">
            {eventList.map((event, index) => (
              <li key={index} className="text-lg mb-2">
                {event}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-center">No events for this date.</p>
        )}
      </div>
    </div>
  );
};

export default Events;
