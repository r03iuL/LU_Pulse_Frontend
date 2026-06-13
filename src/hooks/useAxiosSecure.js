import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "https://lu-pulse-backend.onrender.com",
  withCredentials: true, // Keep for cookie fallback
});

// Attach the JWT from localStorage as Authorization: Bearer <token> on every
// request. This is set up once at module level so it is always active,
// regardless of which component is currently mounted.
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

const useAxiosSecure = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        console.log(error.config.url);
        // Prevent redirecting if it's a login, signup, or user data request
        if (
          error.config.url.endsWith("/login") ||
          error.config.url.endsWith("/signup") ||
          error.config.url.includes("/users/")
        ) {
          return Promise.reject(error);
        }

        if (error.response?.status === 401 || error.response?.status === 403) {
          console.error("Unauthorized request. Logging out and redirecting.");

          try {
            await new Promise((resolve) => setTimeout(resolve, 1500)); // add delay
            // Call backend logout API to clear cookies
            await axios.post(
              "https://lu-pulse-backend.onrender.com/auth/logout",
              {},
              { withCredentials: true },
            );

            // Clear stored token and user data
            localStorage.removeItem("jwtToken");
            localStorage.removeItem("userData");

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
      },
    );

    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [logout, navigate]);

  return axiosInstance;
};

export default useAxiosSecure;
