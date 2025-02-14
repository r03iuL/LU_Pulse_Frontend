import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate for routing

const CreateNotice = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const [notice, setNotice] = useState({
    title: "",
    category: [],
    description: "",
    image: "",
    date: "",
    targetAudience: [], // New field for target audience
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotice({
      ...notice,
      [name]: value,
    });
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setNotice({
      ...notice,
      category: value ? [value] : [], // Ensure category is an array
    });
  };

  const handleTargetAudienceChange = (e) => {
    const { value, checked } = e.target;
    setNotice((prevNotice) => {
      const newTargetAudience = checked
        ? [...prevNotice.targetAudience, value] // Add selected audience
        : prevNotice.targetAudience.filter((audience) => audience !== value); // Remove unselected audience
      return {
        ...prevNotice,
        targetAudience: newTargetAudience,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Normally, you'd send the data to the backend here
    console.log("Notice Created:", notice);

    // Redirect to the notices page after creating the notice
    navigate("/notices");
  };

  return (
    <div className="bg-gray-100 min-h-screen px-4 sm:px-6 lg:px-20 py-10">
      <h2 className="text-3xl font-semibold text-center text-cyan-600 mb-8">
        Create New Notice
      </h2>

      <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg mx-auto">
        <form onSubmit={handleSubmit}>
            {/* Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
              Notice Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={notice.title}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
              required
            />
          </div>
            {/* Category */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-semibold text-gray-700">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={notice.category}
              onChange={handleCategoryChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
              required
            >
              <option value="">Select Category</option>
              <option value="General">General</option>
              <option value="Academic">Academic</option>
              <option value="Events">Events</option>
              <option value="Other">Other</option>
            </select>
          </div>

          

          
            {/* Image Url */}
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-semibold text-gray-700">
              Image URL
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={notice.image}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
              required
            />
          </div>
            
            {/* Notice Date */}
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-semibold text-gray-700">
              Notice Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={notice.date}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
              required
            />
          </div>
          {/* Target Audience Checkboxes */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">Target Audience</label>
            <div className="mt-2">
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="students"
                  value="Students"
                  checked={notice.targetAudience.includes("Students")}
                  onChange={handleTargetAudienceChange}
                  className="mr-2"
                />
                <label htmlFor="students" className="text-sm text-gray-700">Students</label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="faculty"
                  value="Faculty"
                  checked={notice.targetAudience.includes("Faculty")}
                  onChange={handleTargetAudienceChange}
                  className="mr-2"
                />
                <label htmlFor="faculty" className="text-sm text-gray-700">Faculty Members</label>
              </div>
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="administrative"
                  value="Administrative"
                  checked={notice.targetAudience.includes("Administrative")}
                  onChange={handleTargetAudienceChange}
                  className="mr-2"
                />
                <label htmlFor="administrative" className="text-sm text-gray-700">Administrative Members</label>
              </div>
            </div>
          </div>
          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={notice.description}
              onChange={handleChange}
              className="w-full px-4 py-10 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-cyan-600 text-white rounded-md hover:bg-cyan-700"
          >
            Create Notice
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNotice;
