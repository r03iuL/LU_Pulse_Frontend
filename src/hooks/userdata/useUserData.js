import { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../context/AuthContext";

const useUserData = () => {
  const axiosSecure = useAxiosSecure();
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser || !currentUser.email) {
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const cachedUserData = localStorage.getItem("userData");
        if (cachedUserData) {
          setUserData(JSON.parse(cachedUserData));
          setLoading(false);
          return;
        }

        const response = await axiosSecure.get(`/users/${encodeURIComponent(currentUser.email)}`);
        
        // Store all user details
        setUserData(response.data);
        localStorage.setItem("userData", JSON.stringify(response.data));
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          console.warn("Unauthorized request. User might be logged out.");
        } else {
          console.error("Error fetching user data:", error.response?.data?.message || error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser, axiosSecure]);

  return { userData, loading };
};

export default useUserData;
