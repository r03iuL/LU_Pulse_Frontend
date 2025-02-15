import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const CreateNotice = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [notice, setNotice] = useState({
    title: "",
    category: "",
    description: "",
    image: null,
    date: "",
    targetAudience: [],
    department: [],
  });
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotice({
      ...notice,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setNotice((prevNotice) => {
      const updatedValues = checked
        ? [...prevNotice[name], value]
        : prevNotice[name].filter((item) => item !== value);
      return {
        ...prevNotice,
        [name]: updatedValues,
      };
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNotice({
      ...notice,
      image: file,
    });
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImage = async () => {
    if (!notice.image) return null;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", notice.image);

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

    const imageUrl = await uploadImage();
    if (!imageUrl) {
      alert("Failed to upload image. Please try again.");
      return;
    }

    const noticeData = { ...notice, image: imageUrl };
    console.log("Notice Data:", noticeData);

    try {
      const response = await axiosSecure.post("/notices", noticeData);
      if (response.data.message === "Notice created successfully") {
        alert("Notice created successfully");
        navigate("/notice");
      }
    } catch (error) {
      console.error("Error creating notice:", error);
    }
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
            <label className="block text-sm font-semibold text-gray-700">
              Notice Title
            </label>
            <input
              type="text"
              name="title"
              value={notice.title}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-cyan-600"
              required
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Category
            </label>
            <select
              name="category"
              value={notice.category}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-cyan-600"
              required
            >
              <option value="">Select Category</option>
              <option value="General">General</option>
              <option value="Academic">Academic</option>
              <option value="Events">Events</option>
              <option value="Other">Transport</option>
            </select>
          </div>

          {/* Notice Date */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Notice Date
            </label>
            <input
              type="date"
              name="date"
              value={notice.date}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-cyan-600"
              required
            />
          </div>

          {/* Target Audience */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Target Audience
            </label>
            <div className="mt-2">
              {["Students", "Faculty", "Staff"].map((audience) => (
                <div key={audience} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="targetAudience"
                    value={audience}
                    checked={notice.targetAudience.includes(audience)}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  <label className="text-sm text-gray-700">{audience}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Department Selection */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Select Departments
            </label>
            <div className="mt-2">
              {["CSE", "EEE", "BBA", "LAW", "ENG", "IS"].map((dept) => (
                <div key={dept} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    name="department"
                    value={dept}
                    checked={notice.department.includes(dept)}
                    onChange={handleCheckboxChange}
                    className="mr-2"
                  />
                  <label className="text-sm text-gray-700">{dept}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:ring-2 focus:ring-cyan-600"
              required
            />
            {imagePreview && (
              <div className="mt-4">
                <img src={imagePreview} alt="Image Preview" className="w-full h-auto rounded-md" />
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={notice.description}
              onChange={handleChange}
              className="w-full px-4 py-10 mt-2 border rounded-md focus:ring-2 focus:ring-cyan-600"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-cyan-600 text-white rounded-md hover:bg-cyan-700"
            disabled={uploading}
          >
            {uploading ? "Uploading Image..." : "Create Notice"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNotice;
