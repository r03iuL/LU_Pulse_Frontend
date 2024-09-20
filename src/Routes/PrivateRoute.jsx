import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth(); // Access the current user from AuthContext

  // If the user is authenticated, render the element, otherwise, redirect to login
  return currentUser ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
