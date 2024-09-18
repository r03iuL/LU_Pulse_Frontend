import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const navListItems = (
  <>
    <li>
      <a href="/" className="font-semibold text-lg">
        Home
      </a>
    </li>
    <li>
      <a href="#" className="font-semibold  text-lg">
        Notice
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
  return (
    <div className="navbar bg-blue-50">
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navListItems}
          </ul>
        </div>
        {/* lupulse */}
        <Link className="p-0 lg:p- md:p-2 flex flex-col justify-center items-center mx-10 mt-5 lg:mt-0">
          <div className="text-2xl lg:text-5xl md:text-5xl text-sky-600 font-bold">
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
        <a className="btn btn-ghost font-semibold mx-2">
          {" "}
          <FontAwesomeIcon icon={faBell} />{" "}
        </a>
        <Link to="/login" className="btn btn-ghost font-semibold mx-2">Login</Link>
        <Link to="/signup"className="btn bg-black text-white">Sign up</Link>
      </div>
    </div>
  );
};

export default NavBar;
