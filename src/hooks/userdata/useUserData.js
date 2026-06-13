import { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../context/AuthContext";

const useUserData = () => {
  const axiosSecure = useAxiosSecure();
  const { currentUser, jwtReady } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // No user — nothing to fetch.
    if (!currentUser || !currentUser.email) {
      setLoading(false);
      return;
    }

    // JWT cookie not confirmed yet — wait; keep loading=true so consumers
    // know data is still incoming.
    if (!jwtReady) {
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

        const response = await axiosSecure.get(
          `/users/${encodeURIComponent(currentUser.email)}`,
        );

        setUserData(response.data);
        localStorage.setItem("userData", JSON.stringify(response.data));
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          console.warn(
            "Session expired or unauthorised. User data unavailable.",
          );
          localStorage.removeItem("userData");
        } else {
          console.error(
            "Error fetching user data:",
            error.response?.data?.message || error.message,
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser, jwtReady, axiosSecure]);

  return { userData, loading };
};

export default useUserData;
