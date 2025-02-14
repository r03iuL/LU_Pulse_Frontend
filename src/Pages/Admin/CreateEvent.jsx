import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory

const CreateEvent = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const [event, setEvent] = useState({
    name: "",
    date: "",
    time: "",
    venue: "",
    details: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({
      ...event,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You would typically send the data to the server here
    console.log("Event Created:", event);

    // After the event is created, redirect to the events page
    navigate("/events");
  };

  return (
    <div className="bg-gray-100 min-h-screen px-4 sm:px-6 lg:px-20 py-10">
      <h2 className="text-3xl font-semibold text-center text-cyan-600 mb-8">
        Create New Event
      </h2>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
              Event Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={event.name}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-semibold text-gray-700">
              Event Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={event.date}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="time" className="block text-sm font-semibold text-gray-700">
              Event Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={event.time}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="venue" className="block text-sm font-semibold text-gray-700">
              Venue
            </label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={event.venue}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="details" className="block text-sm font-semibold text-gray-700">
              Event Details
            </label>
            <textarea
              id="details"
              name="details"
              value={event.details}
              onChange={handleChange}
              className="w-full px-4 py-20 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-cyan-600 text-white rounded-md hover:bg-cyan-700"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
