import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from '@fortawesome/free-solid-svg-icons';

const navListItems = (
  <>
    <li>
      <a href="#" className="font-semibold text-lg">Home</a>
    </li>
    <li>
      <a href="#" className="font-semibold text-lg">About</a>
    </li>
    <li>
      <a href="#" className="font-semibold  text-lg">Notice</a>
    </li>
    <li>
      <a href="#" className="font-semibold text-lg">Events</a>
    </li>
  </>
);

const NavBar = () => {
  return (
    <div className="navbar bg-base-100">
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
        <a className=" flex flex-col justify-center items-center mx-10"> <div className="text-5xl text-sky-600 font-bold ">L U</div> <div className="text-xl font-semibold ">P U L S E</div> </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navListItems}
        </ul>
      </div>
      <div className="navbar-end">

        <a className="btn btn-ghost font-semibold mx-2"> <FontAwesomeIcon icon={faBell} /> </a>
        <a className="btn btn-ghost font-semibold mx-2">Login</a>
        <a className="btn bg-black text-white">Sign up</a>
      </div>
    </div>
  );
}

export default NavBar;
