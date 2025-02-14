import axios from "axios";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

const useAxiosSecure = () => {

  const { logout } =useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.interceptors.response.use((response) => {
      return response;
    }, (error) => {
      if (error.response.status === 401 || error.response.status === 403) {
        console.error("Unauthorized request. Redirecting to login.");
        logout()
        .then(() => {
          navigate('/login')
          console.log("Logged out successfully.");
        })
        .catch((error) => { console.error("Error logging out:", error); });
        
      }
      return Promise.reject(error);
    });
  }, []);

  return axiosInstance;
};

export default useAxiosSecure;
