import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext"; 
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) return;

    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axiosSecure.get(
          `/users/${encodeURIComponent(currentUser.email)}`
        );

        setUser(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user data");
        console.error("Error fetching user data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser, axiosSecure]);

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4 lg:p-10">
      <div className="card w-full max-w-2xl shadow-2xl bg-white p-8 m-4 lg:m-0">
        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <img
            src={user.image || "https://via.placeholder.com/150"}
            alt="Profile"
            className="h-32 lg:w-80 lg:h-80 rounded-full border-4 border-gray-300"
          />
        </div>

        {/* Profile Information */}
        <div className="text-left">
          <div className="mb-4">
            <p className="text-lg font-semibold mb-1">Full Name:</p>
            <div className="p-4 border border-gray-300 rounded-md">{user.fullName}</div>
          </div>

          <div className="mb-4">
            <p className="text-lg font-semibold mb-1">ID:</p>
            <div className="p-4 border border-gray-300 rounded-md">{user.id}</div>
          </div>

          <div className="mb-4">
            <p className="text-lg font-semibold mb-1">Email:</p>
            <div className="p-4 border border-gray-300 rounded-md">{user.email}</div>
          </div>

          <div className="mb-4">
            <p className="text-lg font-semibold mb-1">Department:</p>
            <div className="p-4 border border-gray-300 rounded-md">{user.department || "N/A"}</div>
          </div>

          {user.userType === "faculty" || user.userType === "staff" ? (
            <div className="mb-4">
              <p className="text-lg font-semibold mb-1">Designation:</p>
              <div className="p-4 border border-gray-300 rounded-md">{user.designation || "Not Provided"}</div>
            </div>
          ) : null}
        </div>

        {/* Edit Button - Navigates to Edit Profile Page */}
        <div className="flex justify-center mt-6">
          <button
            className="btn btn-primary px-6 py-2 border border-blue-500 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={() => navigate("/editprofile")}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
