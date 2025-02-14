import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const NoticeDetails = () => {
  const { id } = useParams(); // Get notice ID from URL
  const axiosSecure = useAxiosSecure();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await axiosSecure.get(`/notices/${id}`);
        setNotice(response.data);
      } catch (error) {
        console.error("Error fetching notice details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotice();
  }, [id, axiosSecure]);

  if (loading) {
    return <p className="text-center py-10">Loading notice details...</p>;
  }

  if (!notice) {
    return <p className="text-center py-10">Notice not found.</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen px-4 sm:px-6 lg:px-20 py-10 flex justify-center">
  <div className="bg-white px-16 py-10 rounded-xl shadow-lg max-w-6xl w-full">
    <h1 className="text-3xl font-bold text-blue-600 mb-4 ">{notice.title}</h1>
    <p className="text-gray-600 text-sm mb-2 ">
      <strong>Category:</strong> {notice.category} | <strong>Audience:</strong> {notice.targetAudience.join(", ")}
    </p>
    <p className="text-gray-600 text-sm mb-4 ">
      <strong>Published on:</strong> {new Date(notice.date).toLocaleDateString()}
    </p>
    <p className="text-lg text-gray-800 leading-relaxed">{notice.description}</p>
    {notice.image && (
      <img
        src={notice.image}
        alt={notice.title}
        className="mt-10 mx-auto w-full max-w-lg h-auto rounded-md shadow-md"
      />
    )}
  </div>
</div>
  );
};

export default NoticeDetails;