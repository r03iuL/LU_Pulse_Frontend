import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ViewEvent = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axiosSecure.get(`/events/${id}`);
        setEvent(response.data);
      } catch (err) {
        setError("Event not found or an error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, axiosSecure]);

  if (loading) {
    return <p className="text-center text-lg text-gray-500 mt-10">Loading event...</p>;
  }

  if (error) {
    return <p className="text-center text-lg text-red-500 mt-10">{error}</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen px-4 sm:px-6 lg:px-20 py-10">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto">
        <h2 className="text-3xl font-semibold text-blue-600 mb-4">{event.name}</h2>
        
        {/* Event Image */}
        {event.image && (
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-64 object-cover rounded-md shadow-md mb-4"
          />
        )}

        {/* Event Info */}
        <p className="text-gray-600 text-sm mb-2">
          <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}  
        </p>
        <p className="text-gray-600 text-sm mb-2">
          <strong>Time:</strong> {event.time}
        </p>
        <p className="text-gray-600 text-sm mb-2">
          <strong>Venue:</strong> {event.venue}
        </p>

        {/* Event Details */}
        <div className="mt-4 bg-gray-50 p-4 rounded-md">
          <p className="text-gray-800">{event.details}</p>
        </div>

        {/* Back to Events Button */}
        <div className="mt-6 flex justify-center">
          <Link
            to="/events"
            className="bg-blue-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-600"
          >
            Back to Events
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewEvent;
