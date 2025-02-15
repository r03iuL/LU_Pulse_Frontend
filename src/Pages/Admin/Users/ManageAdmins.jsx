import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUserShield, faTrash, faUserSlash } from "@fortawesome/free-solid-svg-icons";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageAdmins = () => {
  const axiosSecure = useAxiosSecure();
  const [admins, setAdmins] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const adminsPerPage = 5;

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axiosSecure.get("/users");
      const filteredAdmins = response.data.filter(user => 
        user.adminRole === "admin" || user.adminRole === "superadmin"
      );
      setAdmins(filteredAdmins);
    } catch (error) {
      console.error("Error fetching admins:", error);
      setError("Failed to fetch admins.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const demoteAdmin = async (email) => {
    if (!window.confirm("Are you sure you want to demote this admin to a regular user?")) return;
    
    try {
      await axiosSecure.patch(`/users/${email}/demote`);  // No need to send role, backend knows
      fetchAdmins();
      alert("Admin demoted to regular user successfully!");
    } catch (error) {
      console.error("Error demoting admin:", error);
      alert("Failed to demote admin.");
    }
  };

  const deleteAdmin = async (email, adminRole) => {
    if (adminRole === "superadmin") {
      alert("Super admins cannot be deleted.");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this admin? This action is irreversible!")) return;
    
    try {
      await axiosSecure.delete(`/users/${email}`);
      setAdmins(admins.filter(admin => admin.email !== email));
      alert("Admin deleted successfully.");
    } catch (error) {
      console.error("Error deleting admin:", error);
      alert("Failed to delete admin.");
    }
  };

  // Filter admins based on search query
  const filteredAdmins = admins.filter(admin =>
    admin.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastAdmin = currentPage * adminsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage;
  const currentAdmins = filteredAdmins.slice(indexOfFirstAdmin, indexOfLastAdmin);
  const totalPages = Math.ceil(filteredAdmins.length / adminsPerPage);

  return (
    <div className="bg-gray-100 min-h-screen px-4 sm:px-6 lg:px-20 py-10">
      <h2 className="text-3xl font-semibold text-center text-cyan-600 mb-8">
        Manage Admins
      </h2>

      <div className="flex flex-col lg:flex-row justify-between mb-6">
        {/* Search Bar */}
        <div className="relative w-full lg:w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search admins..."
            className="w-full p-3 rounded-xl shadow-md border border-gray-300 focus:outline-none pr-10"
          />
          <span className="absolute right-4 top-3 text-gray-500">
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </div>
      </div>

      {/* Admins Table */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        {loading ? (
          <p className="text-center">Loading admins...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : currentAdmins.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3 text-left">Profile</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Admin Role</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentAdmins.map((admin, index) => (
                <tr key={`${admin.email}-${index}`} className="border-b">
                  <td className="p-3">
                    <img
                      src={admin.image || "https://via.placeholder.com/150"}
                      alt="Admin Profile"
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                  </td>
                  <td className="p-3">{admin.fullName}</td>
                  <td className="p-3">{admin.email}</td>
                  <td className="p-3 capitalize">{admin.adminRole}</td>
                  <td className="p-3 flex gap-3">
                    {admin.adminRole !== "superadmin" && (
                      <button
                        onClick={() => demoteAdmin(admin.email)}
                        className="px-3 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                      >
                        <FontAwesomeIcon icon={faUserSlash} /> Demote
                      </button>
                    )}
                    {admin.adminRole !== "superadmin" && (
                      <button
                        onClick={() => deleteAdmin(admin.email, admin.adminRole)}
                        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        <FontAwesomeIcon icon={faTrash} /> Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No admins found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`mx-1 px-4 py-2 rounded-md ${
              currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ManageAdmins;
