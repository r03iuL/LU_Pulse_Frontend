import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Events = () => {
  const [date, setDate] = useState(new Date());

  
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
    ],
    "2024-09-20": [
      {
        name: "Guest Lecture: AI in Education",
        date: "2024-09-20",
        time: "2:00 PM",
        venue: "Room 302, Engineering Building",
        details: "An insightful lecture on the applications of AI in modern education systems.",
      },
    ],
    "2024-09-22": [
      {
        name: "Workshop: Time Management for Students",
        date: "2024-09-22",
        time: "9:00 AM",
        venue: "Library Conference Room",
        details: "A practical workshop on improving time management skills for students.",
      },
      {
        name: "Football Match: Students vs Faculty",
        date: "2024-09-22",
        time: "3:00 PM",
        venue: "University Football Ground",
        details: "A fun and competitive football match between students and faculty.",
      },
    ],
    "2024-09-23": [
      {
        name: "Coding Bootcamp: Introduction to Web Development",
        date: "2024-09-23",
        time: "10:00 AM",
        venue: "Computer Science Lab",
        details: "A beginner-friendly workshop on building websites using HTML, CSS, and JavaScript.",
      },
      {
        name: "Open Mic Night",
        date: "2024-09-23",
        time: "6:00 PM",
        venue: "Student Lounge",
        details: "An open mic night for students to showcase their talents, from poetry to music.",
      },
    ],
    "2024-09-24": [
      {
        name: "Career Fair",
        date: "2024-09-24",
        time: "10:00 AM",
        venue: "Main Hall",
        details: "Meet with potential employers and explore job opportunities at the annual career fair.",
      },
      {
        name: "Photography Exhibition: Student Works",
        date: "2024-09-24",
        time: "2:00 PM",
        venue: "Art Gallery",
        details: "An exhibition showcasing the best photography work by students from various departments.",
      },
    ],
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
    <div className="bg-slate-200 min-h-screen">
      <h2 className="text-3xl pt-6 font-semibold text-center text-cyan-600">
        Upcoming Events
      </h2>
      <div className="flex flex-col lg:flex-row max-w-[90%] mx-auto px-4 lg:px-20 py-6 lg:py-10 justify-center gap-6">
        {/* Calendar Section */}
        <div className="w-full lg:w-1/3 mb-6 lg:mb-0 mx-auto">
          <Calendar
            onChange={handleDateChange}
            value={date}
            className="shadow-xl rounded-xl border-0 p-4 lg:p-6"
          />
        </div>

        {/* Event Viewer Section */}
        <div className="w-full lg:w-2/3 bg-white shadow-xl rounded-xl p-4 lg:p-6">
          {eventList.length > 0 ? (
            <ul className="list-none">
              {eventList.map((event, index) => (
                <li key={index} className="mb-6 p-4 border-b border-gray-300">
                  <h3 className="text-lg lg:text-xl font-bold">{event.name}</h3>
                  <div className="text-sm lg:text-base text-gray-500 mt-2">
                    <p>Date: {event.date}</p>
                    <p>Time: {event.time}</p>
                    <p>Venue: {event.venue}</p>
                  </div>
                  <div className="mt-2 bg-slate-100 p-4 rounded-md">
                    <p className="text-gray-800">{event.details}</p>
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
