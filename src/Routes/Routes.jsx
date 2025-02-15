import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./../Layouts/MainLasyout"; // Fix typo from MainLasyout to MainLayout
import Home from "./../Pages/Home/Home";
import About from "./../Pages/About/About";
import Events from "../Pages/Events/Events";
import Signup from "./../Pages/Signup/Signup";
import Login from "./../Pages/Login/Login";
import Notice from "../Pages/Notice/Notice";
import Profile from "./../Pages/Profile/Profile";
import ForgotPassword from "../Pages/ForgotPassword/ForgotPassword";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Pages/Admin/Dashboard/Dashboard";
import CreateEvent from "../Pages/Events/CreateEvent";
import CreateNotice from "../Pages/Notice/CreateNotice";
import SuperDashboard from "../Pages/Admin/SuperDashboard/SuperDashboard";
import NoticeDetails from "../Pages/Notice/NoticeDetails";
import AdminNotice from "../Pages/Notice/AdminNotice";
import EditNotice from "../Pages/Notice/EditNotice";
import ViewEvent from "../Pages/Events/ViewEvent";
import AdminEvents from "../Pages/Events/AdminEvents";
import EditEvent from "../Pages/Events/EditEvent";
import EditProfile from "../Pages/Profile/EditProfile";

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
        path: "notice/:id", // Dynamic route for individual notices
        element: (
          <PrivateRoute>
            <NoticeDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-notice/:id", // Dynamic route for individual notices
        element: (
          <PrivateRoute>
            <EditNotice />
          </PrivateRoute>
        ),
      },
      {
        path: "/events/:id", // Dynamic route for individual notices
        element: (
          <PrivateRoute>
            <ViewEvent />
          </PrivateRoute>
        ),
      },
      {
        path: "/adminevents", // Dynamic route for individual notices
        element: (
          <PrivateRoute>
            <AdminEvents />
          </PrivateRoute>
        ),
      },
      {
        path: "adminnotice", // Dynamic route for individual notices
        element: (
          <PrivateRoute>
            <AdminNotice />
          </PrivateRoute>
        ),
      },
      {
        path: "profile", // Fix the About Us route to be a direct child of MainLayout
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "editprofile", // Fix the About Us route to be a direct child of MainLayout
        element: (
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "admindashboard", // Fix the About Us route to be a direct child of MainLayout
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "superdashboard", // Fix the About Us route to be a direct child of MainLayout
        element: (
          <PrivateRoute>
            <SuperDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "createevent", // Fix the About Us route to be a direct child of MainLayout
        element: (
          <PrivateRoute>
            <CreateEvent />
          </PrivateRoute>
        ),
      },
      {
        path: "editevent/:id", // Fix the About Us route to be a direct child of MainLayout
        element: (
          <PrivateRoute>
            <EditEvent />
          </PrivateRoute>
        ),
      },
      {
        path: "createnotice", // Fix the About Us route to be a direct child of MainLayout
        element: (
          <PrivateRoute>
            <CreateNotice />
          </PrivateRoute>
        ),
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
