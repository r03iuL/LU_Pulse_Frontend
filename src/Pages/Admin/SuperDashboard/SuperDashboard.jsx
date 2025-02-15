import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faCalendar, faFileAlt, faUserShield, faUserPlus, faPlus, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useAxiosSecure from './../../../hooks/useAxiosSecure';

const SuperDashboard = () => {
  const axiosSecure = useAxiosSecure();
  
  // State for dynamic data
  const [totalNotices, setTotalNotices] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalEvents, setTotalEvents] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [recentNotices, setRecentNotices] = useState([]);
  const [recentEvents, setRecentEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        // Fetch all required dashboard stats
        const [usersRes, eventsRes, noticesRes, adminsRes] = await Promise.all([
          axiosSecure.get("/users"), // Fetch total users
          axiosSecure.get("/events"), // Fetch total events
          axiosSecure.get("/notices"), // Fetch total notices
          axiosSecure.get("/users?role=admin"), // Fetch total admins
        ]);

        // Set state with response data
        setTotalUsers(usersRes.data.length);
        setTotalEvents(eventsRes.data.length);
        setTotalNotices(noticesRes.data.length);
        setTotalAdmins(adminsRes.data.length);

        // Set recent notices & events (fetching latest 3)
        setRecentNotices(noticesRes.data.slice(-3).reverse());
        setRecentEvents(eventsRes.data.slice(-3).reverse());

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError("Failed to fetch dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [axiosSecure]);

  return (
    <div className="bg-gray-100 min-h-screen px-4 sm:px-6 lg:px-20 py-10">
      <h2 className="text-3xl font-semibold text-center text-cyan-600 mb-8">Super Admin Dashboard</h2>

      {loading ? (
        <p className="text-center text-lg">Loading dashboard data...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
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
              <Link to="/manageusers">
                <FontAwesomeIcon icon={faUsers} className="text-4xl text-green-500 mb-4" />
                <h3 className="text-2xl font-semibold">Total Users</h3>
                <p className="text-xl font-bold text-gray-700">{totalUsers}</p>
              </Link>
            </div>

            {/* Total Admins */}
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <Link to="/manageadmins">
                <FontAwesomeIcon icon={faUserShield} className="text-4xl text-purple-500 mb-4" />
                <h3 className="text-2xl font-semibold">Total Admins</h3>
                <p className="text-xl font-bold text-gray-700">{totalAdmins}</p>
              </Link>
            </div>
          </div>

          {/* Recent Notices */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Recent Notices</h3>
              <ul>
                {recentNotices.map((notice) => (
                  <li key={notice._id} className="mb-4">
                    <Link to={`/notices/${notice._id}`} className="text-blue-600 hover:underline">
                      {notice.title}
                    </Link>
                    <p className="text-sm text-gray-500">
                      {new Date(notice.date).toLocaleDateString()}
                    </p>
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
                  <li key={event._id} className="mb-4">
                    <Link to={`/events/${event._id}`} className="text-blue-600 hover:underline">
                      {event.name}
                    </Link>
                    <p className="text-sm text-gray-500">
                      {new Date(event.date).toLocaleDateString()} at {event.venue}
                    </p>
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
        </>
      )}
    </div>
  );
};

export default SuperDashboard;
