import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Events = () => {
  const axiosSecure = useAxiosSecure();
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosSecure.get("/events");
      const eventsData = response.data;

      const eventsByDate = eventsData.reduce((acc, event) => {
        const eventDate = event.date.split("T")[0];
        if (!acc[eventDate]) acc[eventDate] = [];
        acc[eventDate].push(event);
        return acc;
      }, {});

      setEvents(eventsByDate);
    } catch (err) {
      setError("Error fetching events");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

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

  const eventDates = Object.keys(events);

  // Adding a dot indicator for event days
  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = formatDate(date);
      if (eventDates.includes(formattedDate)) {
        return (
          <div className="flex justify-center items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mt-1"></div>
          </div>
        );
      }
    }
    return null;
  };

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
            tileContent={tileContent} // Adds the event dots
            tileClassName={({ date, view }) => {
              const formattedDate = formatDate(date);
              return view === "month" && eventDates.includes(formattedDate)
                ? "has-event"
                : null;
            }}
          />
        </div>

        {/* Event List Section */}
        <div className="w-full lg:w-2/3 bg-white shadow-xl rounded-xl p-4 lg:p-6">
          {loading ? (
            <p className="text-lg text-center">Loading events...</p>
          ) : error ? (
            <p className="text-lg text-center text-red-500">{error}</p>
          ) : eventList.length > 0 ? (
            <ul className="list-none">
              {eventList.map((event, index) => (
                <li key={index} className="mb-3 p-3 border-b border-gray-300 hover:bg-gray-100 transition duration-200 rounded-lg">
                  <Link to={`/events/${event._id}`} className="block text-md font-bold text-blue-600 hover:underline">
                    {event.name}
                  </Link>
                  <p className="text-sm text-gray-600 flex justify-between">
                    <span>{event.date} • {event.time}</span>
                    <span className="text-blue-500">{event.venue}</span>
                  </p>
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
