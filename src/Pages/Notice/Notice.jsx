import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserData from "../../hooks/userdata/useUserData";

const Notice = () => {
  const axiosSecure = useAxiosSecure();
  const { userData, loading } = useUserData();
  const [notices, setNotices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const noticesPerPage = 5;

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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // Filter Notices Before Pagination
  const filteredNotices = notices.filter(
    (notice) =>
      (selectedCategory === "all" || notice.category === selectedCategory) &&
      notice.title.toLowerCase().includes(searchQuery)
  );

  // Pagination Logic
  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
  const currentNotices = filteredNotices.slice(indexOfFirstNotice, indexOfLastNotice);

  return (
    <div className="bg-gray-100 min-h-screen max-w-10xl px-4 sm:px-6 lg:px-20 py-10 mx-auto">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search notices..."
            className="w-full p-4 rounded-xl shadow-md border border-gray-300 focus:outline-none pr-10"
          />
          <span className="absolute right-7 top-4 text-gray-500">
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar - Notice Categories */}
        <div className="w-full lg:w-1/4 p-4 bg-white shadow-lg rounded-xl mb-6 lg:mb-0 lg:mr-6">
          <h3 className="text-xl font-semibold mb-4">Categories</h3>
          <ul className="space-y-2">
            {["all", "General", "Academic", "Events", "Transport"].map(
              (category) => (
                <li
                  key={category}
                  className={`cursor-pointer p-4 rounded-md ${
                    selectedCategory === category ? "bg-blue-500 text-white" : "hover:bg-gray-200"
                  }`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category === "all" ? "All Notices" : `${category} Notices`}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Notice List */}
        <div className="w-full lg:w-3/4 p-6 bg-white rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">All Notices</h3>
          <ul>
            {loading ? (
              <p>Loading notices...</p>
            ) : currentNotices.length > 0 ? (
              currentNotices.map((notice) => (
                <li key={notice._id} className="mb-4 border-b pb-4">
                  <Link
                    to={`/notice/${notice._id}`}
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    {notice.title}
                  </Link>
                  <p className="text-sm text-gray-500">
                    {new Date(notice.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>{notice.category}</strong> | <strong>{notice.targetAudience.join(", ")}</strong>
                  </p>
                </li>
              ))
            ) : (
              <p>No notices found.</p>
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
              disabled={indexOfLastNotice >= filteredNotices.length}
              className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notice;
