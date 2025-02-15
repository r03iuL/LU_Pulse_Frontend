import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const EditEvent = () => {
  const { id } = useParams(); // Get event ID from URL
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [event, setEvent] = useState({
    name: "",
    date: "",
    time: "",
    venue: "",
    details: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch event details when page loads
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axiosSecure.get(`/events/${id}`);
        setEvent(response.data);
        setImagePreview(response.data.image); // Set existing image preview
      } catch (error) {
        setErrorMessage("Error fetching event details.");
      }
    };

    fetchEvent();
  }, [id, axiosSecure]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({
      ...event,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEvent({
      ...event,
      image: file,
    });
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImage = async () => {
    if (!event.image || typeof event.image === "string") return event.image; // Keep existing image

    setUploading(true);
    const formData = new FormData();
    formData.append("image", event.image);

    try {
      const response = await axiosSecure.post("/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploading(false);
      return response.data.imageUrl;
    } catch (error) {
      setUploading(false);
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const imageUrl = await uploadImage(); // Upload image if changed
    if (event.image && !imageUrl) {
      setErrorMessage("Failed to upload image. Please try again.");
      setLoading(false);
      return;
    }

    try {
      const eventData = { ...event, image: imageUrl };
      const response = await axiosSecure.put(`/events/${id}`, eventData);

      if (response.data.message === "Event updated successfully") {
        alert("Event updated successfully!");
        navigate("/adminevents");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error updating event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen px-4 sm:px-6 lg:px-20 py-10">
      <h2 className="text-3xl font-semibold text-center text-cyan-600 mb-8">
        Edit Event
      </h2>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg mx-auto">
        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

        <form onSubmit={handleSubmit}>
          {/* Event Name */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Event Name
            </label>
            <input
              type="text"
              name="name"
              value={event.name}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-cyan-600"
              required
            />
          </div>

          {/* Event Date */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Event Date
            </label>
            <input
              type="date"
              name="date"
              value={event.date}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-cyan-600"
              required
            />
          </div>

          {/* Event Time */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Event Time
            </label>
            <input
              type="time"
              name="time"
              value={event.time}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-cyan-600"
              required
            />
          </div>

          {/* Event Venue */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Venue
            </label>
            <input
              type="text"
              name="venue"
              value={event.venue}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-cyan-600"
              required
            />
          </div>

          {/* Event Details */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Event Details
            </label>
            <textarea
              name="details"
              value={event.details}
              onChange={handleChange}
              className="w-full px-4 py-3 mt-2 border rounded-md focus:ring-2 focus:ring-cyan-600"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Upload Event Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-cyan-600"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Event Preview"
                className="mt-4 w-full max-h-48 object-cover rounded-md shadow-md"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-cyan-600 text-white rounded-md hover:bg-cyan-700"
            disabled={loading || uploading}
          >
            {loading ? "Updating Event..." : "Update Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
