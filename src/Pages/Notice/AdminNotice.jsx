import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Add useNavigate
import { faSearch, faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useUserData from "../../hooks/userdata/useUserData";

const AdminNotice = () => {
  const axiosSecure = useAxiosSecure();
  const { userData, loading } = useUserData();
  const [notices, setNotices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedAudience, setSelectedAudience] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const noticesPerPage = 5;

  const navigate = useNavigate(); // Initialize navigation

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

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };
  const handleDepartmentChange = (e) => setSelectedDepartment(e.target.value);
  const handleAudienceChange = (e) => setSelectedAudience(e.target.value);

  // **Handle Notice Deletion**
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this notice?")) return;

    try {
      await axiosSecure.delete(`/notices/${id}`);
      setNotices(notices.filter((notice) => notice._id !== id));
    } catch (error) {
      console.error("Error deleting notice:", error);
    }
  };

  // **Handle Notice Editing**
  const handleEdit = (id) => {
    navigate(`/edit-notice/${id}`);
  };

  // **Filter Notices for Admins**
  const filteredNotices = notices.filter((notice) => {
    const matchesCategory =
      selectedCategory === "all" || notice.category === selectedCategory;
    const matchesSearch = notice.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "all" ||
      notice.department.includes(selectedDepartment);
    const matchesAudience =
      selectedAudience === "all" ||
      notice.targetAudience.includes(selectedAudience);

    return (
      matchesCategory && matchesSearch && matchesDepartment && matchesAudience
    );
  });

  // **Pagination Logic**
  const indexOfLastNotice = currentPage * noticesPerPage;
  const indexOfFirstNotice = indexOfLastNotice - noticesPerPage;
  const currentNotices = filteredNotices.slice(
    indexOfFirstNotice,
    indexOfLastNotice
  );

  return (
    <div className="bg-gray-100 min-h-screen max-w-8xl px-4 sm:px-6 lg:px-20 py-10 mx-auto">
      {/* Header & Search Bar */}
      <div className="items-center mb-6">
        <h3 className="my-4 text-center text-4xl font-semibold text-blue-600">Manage Notices</h3>
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

      {/* Filters (For Admins Only) */}
      {(userData?.adminRole === "admin" ||
        userData?.adminRole === "superadmin") && (
        <div className="flex justify-center">
          <div className="w-full md:w-2/3 lg:w-full mb-6 p-6 bg-white shadow-lg rounded-xl">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Filter Notices
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Department Filter */}
              <div className="text-center">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Filter by Department
                </label>
                <select
                  value={selectedDepartment}
                  onChange={handleDepartmentChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Departments</option>
                  <option value="CSE">CSE</option>
                  <option value="EEE">EEE</option>
                  <option value="BBA">BBA</option>
                  <option value="LAW">LAW</option>
                  <option value="ENG">ENG</option>
                </select>
              </div>

              {/* Audience Filter */}
              <div className="text-center">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Filter by Target Audience
                </label>
                <select
                  value={selectedAudience}
                  onChange={handleAudienceChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Audiences</option>
                  <option value="Students">Students</option>
                  <option value="Faculty">Faculty</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notices List */}
      <div className="bg-white p-10 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">All Notices</h3>
                  <Link to="/createnotice" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    Create Notice
                  </Link>
                </div>

        <ul>
          {loading ? (
            <p>Loading notices...</p>
          ) : currentNotices.length > 0 ? (
            currentNotices.map((notice) => (
              <li
                key={notice._id}
                className="mb-4 border-b pb-4 flex justify-between items-center"
              >
                <div>
                  <Link
                    to={`/notices/${notice._id}`}
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    {notice.title}
                  </Link>
                  <p className="text-sm text-gray-500">
                    {new Date(notice.date).toLocaleDateString()} |{" "}
                    {notice.category} | Audience:{" "}
                    {notice.targetAudience.join(", ")} |{" "}
                    {notice.department.join(", ")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(notice._id)}
                    className="px-3 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    onClick={() => handleDelete(notice._id)}
                    className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
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
  );
};

export default AdminNotice;
