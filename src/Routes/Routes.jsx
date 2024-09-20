import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./../Layouts/MainLasyout"; // Fix typo from MainLasyout to MainLayout
import Home from "./../Pages/Home/Home";
import About from "./../Pages/About/About";
import Events from "./../Pages/Events/Events";
import Signup from "./../Pages/Signup/Signup";
import Login from "./../Pages/Login/Login";
import Notice from "../Pages/Notice/Notice";
import Profile from "./../Pages/Profile/Profile";
import ForgotPassword from "../Pages/ForgotPassword/ForgotPassword";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />, // Main layout that wraps the pages
    children: [
      {
        path: "/", // Root path that shows the Home page
        element: <Home />,
      },
      {
        path: "about", // Fix the About Us route to be a direct child of MainLayout
        element: <About />,
      },
      {
        path: "events", // Fix the About Us route to be a direct child of MainLayout
        element: (
          <PrivateRoute>
            <Events />
          </PrivateRoute>
        ),
      },
      {
        path: "notice", // Fix the About Us route to be a direct child of MainLayout
        element: (
          <PrivateRoute>
            <Notice />
          </PrivateRoute>
        ),
      },
      {
        path: "profile", // Fix the About Us route to be a direct child of MainLayout
        element: <PrivateRoute>
          <Profile />
        </PrivateRoute>,
      },
      {
        path: "signup", // Fix the About Us route to be a direct child of MainLayout
        element: <Signup />,
      },
      {
        path: "login", // Fix the About Us route to be a direct child of MainLayout
        element: <Login />,
      },
      {
        path: "forgotpass", // Fix the About Us route to be a direct child of MainLayout
        element: <ForgotPassword />,
      },
    ],
  },
]);

export default router;
