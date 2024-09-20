import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import useAuth

const navListItems = (
  <>
    <li>
      <a href="/" className="font-semibold text-lg">
        Home
      </a>
    </li>
    <li>
      <a href="/notice" className="font-semibold  text-lg">
        Notice&apos;s
      </a>
    </li>
    <li>
      <a href="/events" className="font-semibold text-lg">
        Events
      </a>
    </li>
    <li>
      <a href="/about" className="font-semibold text-lg">
        About
      </a>
    </li>
  </>
);

const NavBar = () => {
  const { currentUser, logout } = useAuth(); // Get current user and logout function from AuthContext
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout method
      navigate("/login"); // Redirect to login after logout
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
            {navListItems}
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
        <ul className="menu menu-horizontal px-1">{navListItems}</ul>
      </div>
      <div className="navbar-end">
        {/* Conditionally render Profile, Login, and Signup */}
        {currentUser ? (
          <>
            <Link to="/profile" className="btn btn-ghost font-semibold mx-2 p-4 border-cyan-700 rounded-full border-2">
              <FontAwesomeIcon icon={faUser} /> 
            </Link>
            <button onClick={handleLogout} className="btn bg-black text-white font-semibold mx-2">
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn bg-black text-white font-semibold mx-2">
              Log In
            </Link>
            
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
