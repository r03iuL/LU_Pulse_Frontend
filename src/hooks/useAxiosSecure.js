import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true, // ✅ Ensure cookies are sent in requests
});

const useAxiosSecure = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        //  Prevent redirecting if it's a login request
        if (error.config.url === "/login") {
          return Promise.reject(error);
        }

        if (error.response?.status === 401 || error.response?.status === 403) {
          console.error("Unauthorized request. Logging out and redirecting.");

          try {
            // Call backend logout API to clear cookies
            await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });

            // Ensure Firebase logout is also called
            await logout();

            // Redirect to login
            navigate("/login");
            console.log("Logged out successfully.");
          } catch (err) {
            console.error("Error logging out:", err);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(interceptor); // ✅ Cleanup on unmount
    };
  }, [logout, navigate]);

  return axiosInstance;
};

export default useAxiosSecure;
