import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../context/AuthContext"; 
import { useNavigate } from "react-router-dom";

const Notice = () => {
  const axiosSecure = useAxiosSecure();
  const { currentUser } = useAuth(); 
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch notices from backend
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axiosSecure.get("/notices");
        setNotices(response.data);
      } catch (error) {
        console.error("Error fetching notices:", error);
      }
    };

    fetchNotices();
  }, [axiosSecure]);

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Handle search input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Delete Notice Function
  const handleDelete = async (noticeId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this notice?");
    if (!confirmDelete) return;

    try {
      await axiosSecure.delete(`/notices/${noticeId}`);
      setNotices((prevNotices) => prevNotices.filter((notice) => notice._id !== noticeId));
      alert("Notice deleted successfully!");
    } catch (error) {
      console.error("Error deleting notice:", error);
    }
  };

  // Filtering Notices
  const filteredNotices = notices.filter((notice) => {
    const matchesCategory = selectedCategory === "all" || notice.category === selectedCategory;
    const matchesSearch = notice.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Check if the user is an admin or super admin
  const isAdmin = currentUser?.adminRole === "admin" || currentUser?.adminRole === "superadmin";
  console.log( currentUser?.adminRole);

  return (
    <div className="bg-gray-100">
      <div className="min-h-screen max-w-7xl px-4 sm:px-6 lg:px-20 py-10 mx-auto">
        
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search notices..."
              className="w-full p-5 rounded-xl shadow-md border border-gray-300 focus:outline-none pr-10"
            />
            <span className="absolute right-7 top-5 text-gray-500">
              <FontAwesomeIcon icon={faSearch} />
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          
          {/* Sidebar - Notice Categories */}
          <div className="w-full lg:w-1/4 p-4 bg-white shadow-lg rounded-xl mb-6 lg:mb-0 lg:mr-6">
            <h3 className="text-xl font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {["all", "General", "Academic", "Events", "Transport"].map((category) => (
                <li
                  key={category}
                  className={`cursor-pointer p-4 rounded-md ${
                    selectedCategory === category ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                  }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category === "all" ? "All Notices" : `${category} Notices`}
                </li>
              ))}
            </ul>
          </div>

          {/* Notice List */}
          <div className="w-full lg:w-3/4 p-6 bg-white rounded-xl shadow-lg">
            {filteredNotices.length > 0 ? (
              filteredNotices.map((notice) => (
                <div key={notice._id} className="my-6 p-4 bg-slate-50 shadow-md rounded-lg">
                  <h4 className="text-xl font-bold">
                    {notice.title}{" "}
                    <span className="text-sm font-semibold text-gray-400 px-2">
                      {notice.category}
                    </span>
                  </h4>
                  <p className="text-md font-bold text-gray-600 py-2">
                    Issued on: {new Date(notice.date).toLocaleDateString()}
                  </p>
                  <p>{notice.description}</p>
                  {notice.image && (
                    <img
                      src={notice.image}
                      alt={notice.title}
                      className="mt-3 w-full max-w-xs h-auto rounded-md"
                    />
                  )}

                  {/* Show Edit & Delete buttons ONLY for Admins & Super Admins */}
                  {isAdmin && (
                    <div className="mt-4 flex gap-4">
                      <button
                        onClick={() => navigate(`/update-notice/${notice._id}`)}
                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleDelete(notice._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>No notices found in this category.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notice;
