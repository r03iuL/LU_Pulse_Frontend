import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUserShield, faTrash } from "@fortawesome/free-solid-svg-icons";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axiosSecure.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (e) => {
    setFilterRole(e.target.value);
    setCurrentPage(1);
  };

  const promoteToAdmin = async (email) => {
    if (!window.confirm("Are you sure you want to make this user an Admin?")) return;
    
    try {
      await axiosSecure.patch(`/users/${email}/role`, { adminRole: "admin" });
      fetchUsers(); // Refresh users after update
      alert("User promoted to Admin successfully!");
    } catch (error) {
      console.error("Error promoting user:", error);
      alert("Failed to promote user to Admin.");
    }
  };

  const deleteUser = async (email, adminRole) => {
    if (adminRole === "superadmin") {
      alert("Super admins cannot be deleted.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this user? This action is irreversible!")) return;
    
    try {
      await axiosSecure.delete(`/users/${email}`);
      setUsers(users.filter(user => user.email !== email));
      alert("User deleted successfully.");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user.");
    }
  };

  const isAdminOrSuperAdmin = (adminRole) => {
    return adminRole === "admin" || adminRole === "superadmin";
  };

  // Filter users based on search and role filter
  const filteredUsers = users.filter(user => 
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (filterRole ? user.userType === filterRole || user.adminRole === filterRole : true)
  );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="bg-gray-100 min-h-screen px-4 sm:px-6 lg:px-20 py-10">
      <h2 className="text-3xl font-semibold text-center text-cyan-600 mb-8">
        Manage Users
      </h2>

      <div className="flex flex-col lg:flex-row justify-between mb-6">
        {/* Search Bar */}
        <div className="relative w-full lg:w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search users..."
            className="w-full p-3 rounded-xl shadow-md border border-gray-300 focus:outline-none pr-10"
          />
          <span className="absolute right-4 top-3 text-gray-500">
            <FontAwesomeIcon icon={faSearch} />
          </span>
        </div>

        {/* Filter Dropdown */}
        <select
          value={filterRole}
          onChange={handleFilterChange}
          className="p-3 rounded-xl border border-gray-300 shadow-md lg:ml-4"
        >
          <option value="">All Users</option>
          <option value="student">Students</option>
          <option value="faculty">Faculty</option>
          <option value="staff">Staff</option>
          <option value="admin">Admins</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        {loading ? (
          <p className="text-center">Loading users...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : currentUsers.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3 text-left">Profile</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">User Type</th>
                <th className="p-3 text-left">Admin Role</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.email} className="border-b">
                  <td className="p-3">
                    <img
                      src={user.image || "https://via.placeholder.com/150"}
                      alt="User Profile"
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                  </td>
                  <td className="p-3">{user.fullName}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3 capitalize">{user.userType}</td>
                  <td className="p-3 capitalize">{user.adminRole || "User"}</td>
                  <td className="p-3 flex gap-3">
                    {user.adminRole !== "superadmin" && (
                      <button
                        onClick={() => deleteUser(user.email, user.adminRole)}
                        className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        <FontAwesomeIcon icon={faTrash} /> Delete
                      </button>
                    )}
                    {!isAdminOrSuperAdmin(user.adminRole) && (
                      <button
                        onClick={() => promoteToAdmin(user.email)}
                        className="px-3 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
                      >
                        <FontAwesomeIcon icon={faUserShield} /> Promote
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center">No users found.</p>
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

export default ManageUsers;
