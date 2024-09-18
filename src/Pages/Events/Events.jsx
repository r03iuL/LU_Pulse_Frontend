import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Events = () => {
  const [date, setDate] = useState(new Date());

  // Updated event structure to include more details
  const [events, setEvents] = useState({
    "2024-09-18": [
      {
        name: "Orientation Program",
        date: "2024-09-18",
        time: "10:00 AM",
        venue: "Main Auditorium",
        details: "Welcoming ceremony for new students.",
      },
      {
        name: "Campus Tour",
        date: "2024-09-18",
        time: "12:00 PM",
        venue: "University Campus",
        details: "Guided tour of the university campus.",
      },
      {
        name: "Campus Tour",
        date: "2024-09-18",
        time: "12:00 PM",
        venue: "University Campus",
        details: "Guided tour of the university campus.",
      },
      {
        name: "Campus Tour",
        date: "2024-09-18",
        time: "12:00 PM",
        venue: "University Campus",
        details: "Guided tour of the university campus.",
      },
    ],
    "2024-09-20": [
      {
        name: "Guest Lecture: AI in Education",
        date: "2024-09-20",
        time: "2:00 PM",
        venue: "Room 302, Engineering Building",
        details:
          "An insightful lecture on the applications of AI in modern education systems.",
      },
    ],
    // Add more dates and events as needed
  });

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const selectedDate = formatDate(date);
  const eventList = events[selectedDate] || [];

  return (
    <div className="bg-slate-100">
      <div className="flex flex-col md:flex-row min-h-screen max-w-[90%] px-20 py-10 mx-auto">
        {/* Calendar Section */}
        <div className="w-full md:w-1/3 p-5">
          <h2 className="text-2xl font-semibold mb-4 text-center">Calendar</h2>
          <Calendar
            onChange={handleDateChange}
            value={date}
            className="shadow-xl rounded-xl border-0 p-6"
          />
        </div>

        {/* Event Viewer Section */}
        <div className="w-full md:w-2/3 p-5 bg-white shadow-xl ml-0 md:ml-4 rounded-xl p-10">
          <h2 className="text-2xl font-semibold mb-4 text-center">Events</h2>
          {eventList.length > 0 ? (
            <ul className="list-none">
              {eventList.map((event, index) => (
                <li key={index} className="mb-6 p-4 border-b-2">
                  <h3 className="text-xl font-bold">{event.name}</h3>
                  <div className="flex justify-between items-center mt-2 font-bold w-3/4 py-2">
                    <span className="text-gray-600">Date: {event.date}</span>
                    <span className="text-gray-600">Time: {event.time}</span>
                    <span className="text-gray-600">Venue: {event.venue}</span>
                  </div>
                  <div className="mt-2 bg-slate-100 p-6 rounded-md">
                    <p className=" text-gray-800 ">{event.details}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-lg text-center">No events for this date.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
