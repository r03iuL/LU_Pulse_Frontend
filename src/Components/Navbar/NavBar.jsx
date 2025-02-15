import { useState, useEffect } from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const NavBar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [userImage, setUserImage] = useState(null);
  const [adminRole, setAdminRole] = useState(null);
  const axiosSecure = useAxiosSecure();

  // Fetch user data from MongoDB
  useEffect(() => {
    if (!currentUser || !currentUser.email) return; // Ensure user is logged in

    const fetchUserData = async () => {
      try {
        //  Delay fetching user data to ensure authentication is set
        await new Promise((resolve) => setTimeout(resolve, 10000));

        const response = await axiosSecure.get(
          `/users/${encodeURIComponent(currentUser.email)}`
        );

        setUserImage(response.data.image);
        setAdminRole(response.data.adminRole);
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          console.warn("Unauthorized request. User might be logged out.");
        } else {
          console.error(
            "Error fetching user image:",
            error.response?.data?.message || error.message
          );
        }
      }
    };

    fetchUserData();
  }, [currentUser, axiosSecure]);

  const handleLogout = async () => {
    try {
      await axiosSecure.post("/logout", {});
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  return (
    <div className="navbar bg-blue-50 px-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[20] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a href="/" className="font-semibold text-lg">
                Home
              </a>
            </li>
            <li>
              <a href="/notice" className="font-semibold text-lg">
                Notice's
              </a>
            </li>
            <li>
              <a href="/events" className="font-semibold text-lg">
                Events
              </a>
            </li>
            {(adminRole === "admin" || adminRole === "superadmin") && (
              <li>
                <Link
                  to={
                    adminRole === "superadmin"
                      ? "/superdashboard"
                      : "/admindashboard"
                  }
                  className="font-semibold text-lg"
                >
                  Dashboard
                </Link>
              </li>
            )}
            <li>
              <a href="/about" className="font-semibold text-lg">
                About
              </a>
            </li>
          </ul>
        </div>
        {/* lupulse */}
        <Link className="p-0 lg:p- md:p-2 flex flex-col justify-center items-center mx-2 lg:mx-10 mt-5 lg:mt-0">
          <div className="text-2xl lg:text-5xl md:text-5xl text-sky-600 font-bold z-30">
            L U
          </div>
          <div className="text-[10px] lg:text-xl md:text-xl font-semibold px-">
            P U L S E
          </div>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a href="/" className="font-semibold text-lg">
              Home
            </a>
          </li>
          <li>
            <a href="/notice" className="font-semibold text-lg">
              Notice's
            </a>
          </li>
          <li>
            <a href="/events" className="font-semibold text-lg">
              Events
            </a>
          </li>
          {(adminRole === "admin" || adminRole === "superadmin") && (
            <li>
              <Link
                to={
                  adminRole === "superadmin"
                    ? "/superdashboard"
                    : "/admindashboard"
                }
                className="font-semibold text-lg"
              >
                Dashboard
              </Link>
            </li>
          )}
          <li>
            <a href="/about" className="font-semibold text-lg">
              About
            </a>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {currentUser ? (
          <>
            <Link to="/profile" className="btn btn-ghost font-semibold ">
              {userImage ? (
                <img
                  src={userImage}
                  alt="User Profile"
                  className="h-10 rounded-full "
                />
              ) : (
                <FontAwesomeIcon icon={faUser} className="text-2xl" />
              )}
            </Link>
            <button
              onClick={handleLogout}
              className="btn bg-black text-white font-semibold mx-2"
            >
              Log Out
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="btn bg-black text-white font-semibold mx-2"
          >
            Log In
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
