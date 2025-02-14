import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faCalendar, faFileAlt,faPlus,faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"; // For navigation

const Dashboard = () => {
  // Sample data for the dashboard
  const [totalNotices, setTotalNotices] = useState(7); // Example total notices
  const [totalUsers, setTotalUsers] = useState(500); // Example total users
  const [totalEvents, setTotalEvents] = useState(5); // Example total events
  const [recentNotices, setRecentNotices] = useState([
    { id: 1, title: "General Notice: Campus Safety Update", date: "2024-03-15" },
    { id: 2, title: "Holiday Notice: Mid-Semester Break", date: "2024-03-20" },
    { id: 3, title: "Exam Schedule: Spring Semester 2024", date: "2024-03-25" },
  ]);

  const [recentEvents, setRecentEvents] = useState([
    { id: 1, name: "Orientation Program", date: "2024-09-18", venue: "Main Auditorium" },
    { id: 2, name: "Guest Lecture: AI in Education", date: "2024-09-20", venue: "Room 302" },
    { id: 3, name: "Guest Lecture: CSE career Roadmap", date: "2024-09-25", venue: "Gallery-2" },
  ]);

  return (
    <div className="bg-gray-100 min-h-screen px-4 sm:px-6 lg:px-20 py-10">
      <h2 className="text-3xl font-semibold text-center text-cyan-600 mb-8">Admin Dashboard</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Total Notices */}
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <Link to="/notice">
            <FontAwesomeIcon icon={faFileAlt} className="text-4xl text-blue-500 mb-4" />
            <h3 className="text-2xl font-semibold">Total Notices</h3>
            <p className="text-xl font-bold text-gray-700">{totalNotices}</p>
          </Link>
        </div>
        
        {/* Total Events */}
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <Link to="/events">
            <FontAwesomeIcon icon={faCalendar} className="text-4xl text-yellow-500 mb-4" />
            <h3 className="text-2xl font-semibold">Total Events</h3>
            <p className="text-xl font-bold text-gray-700">{totalEvents}</p>
          </Link>
        </div>

        {/* Total Users */}
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <Link to="/members">
            <FontAwesomeIcon icon={faUsers} className="text-4xl text-green-500 mb-4" />
            <h3 className="text-2xl font-semibold">Total Users</h3>
            <p className="text-xl font-bold text-gray-700">{totalUsers}</p>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Notices */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Recent Notices</h3>
          <ul>
            {recentNotices.map((notice) => (
              <li key={notice.id} className="mb-4">
                <Link to={`/notices/${notice.id}`} className="text-blue-600 hover:underline">
                  {notice.title}
                </Link>
                <p className="text-sm text-gray-500">{new Date(notice.date).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-between gap-4">
            <Link to="/notice" className="bg-blue-500 text-white p-4 rounded-xl shadow-md hover:bg-blue-600 flex-1 text-center">

            <FontAwesomeIcon icon={faFileAlt} className="mr-2" />
              View All Notices
            </Link>
            <Link to="/createnotice" className="bg-blue-500 text-white p-4 rounded-xl shadow-md hover:bg-blue-600 flex-1 text-center">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Create New Notice
            </Link>
          </div>
        </div>

        {/* Recent Events */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Upcoming Events</h3>
          <ul>
            {recentEvents.map((event) => (
              <li key={event.id} className="mb-4">
                <Link to={`/events/${event.id}`} className="text-blue-600 hover:underline">
                  {event.name}
                </Link>
                <p className="text-sm text-gray-500">{event.date} at {event.venue}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-between gap-4">
            <Link to="/events" className="bg-yellow-500 text-white p-4 rounded-xl shadow-md hover:bg-yellow-600 flex-1 text-center">
            <FontAwesomeIcon icon={faCalendar} className="mr-2" />
              View All Events
            </Link>
            <Link to="/createevent" className="bg-yellow-500 text-white p-4 rounded-xl shadow-md hover:bg-yellow-600 flex-1 text-center">
            <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
              Create New Event
            </Link>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Dashboard;
