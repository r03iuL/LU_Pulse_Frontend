import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserData from "../../hooks/userdata/useUserData";

const AdminEvents = () => {
  const axiosSecure = useAxiosSecure();
  const { userData, loading } = useUserData();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 5; // Number of events per page

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosSecure.get("/events");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [axiosSecure]);

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset pagination when searching
  };

  // Handle delete event
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this event?");
    if (!confirmDelete) return;

    try {
      await axiosSecure.delete(`/events/${id}`);
      setEvents(events.filter((event) => event._id !== id)); // Remove from UI
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  // Filter events based on search
  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  return (
    <div className="bg-gray-100 min-h-screen max-w-8xl px-4 sm:px-6 lg:px-20 py-10 mx-auto">
      {/* Header & Search Bar */}
      <div className="items-center mb-6">
        <h3 className="my-4 text-center text-4xl font-semibold text-blue-600">Manage Events</h3>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search events..."
            className="w-full p-4 rounded-xl shadow-md border border-gray-300 focus:outline-none pr-10"
          />
          <span className="absolute right-7 top-4 text-gray-500">
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </div>
      </div>

      {/* Events List */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">All Events</h3>
          <Link to="/createevent" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Create Event
          </Link>
        </div>

        <ul>
          {loading ? (
            <p>Loading events...</p>
          ) : currentEvents.length > 0 ? (
            currentEvents.map((event) => (
              <li key={event._id} className="mb-4 border-b pb-4 flex justify-between items-center">
                <div>
                  <Link to={`/events/${event._id}`} className="text-blue-600 hover:underline font-semibold">
                    {event.name}
                  </Link>
                  <p className="text-sm text-gray-500">
                    {new Date(event.date).toLocaleDateString()} | {event.time} | {event.venue}
                  </p>
                </div>
                <div className="flex gap-2">
                  {/* EDIT BUTTON */}
                  <button
                    onClick={() => navigate(`/editevent/${event._id}`)}
                    className="px-3 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  
                  {/* DELETE BUTTON */}
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p>No events found.</p>
          )}
        </ul>

        {/* Pagination Controls */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={indexOfLastEvent >= filteredEvents.length}
            className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminEvents;
