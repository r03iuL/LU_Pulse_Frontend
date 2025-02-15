import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { currentUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({});
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Fetch the user data on component mount
  useEffect(() => {
    if (!currentUser) return;

    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axiosSecure.get(
          `/users/${encodeURIComponent(currentUser.email)}`
        );

        setUser(response.data);
        setUpdatedUser(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser, axiosSecure]);

  // Handle input changes for Full Name and Designation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file selection for profile image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Upload image to server and return the image URL
  const uploadImage = async () => {
    if (!image) return user.image; // Return current image if no new one

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axiosSecure.post("/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      return user.image; // Return current image on failure
    }
  };

  // Handle save functionality
  const handleSave = async () => {
    if (!updatedUser.fullName || !updatedUser.designation) {
      setError("Full Name and Designation are required.");
      return;
    }

    setSaving(true);
    try {
      const imageUrl = await uploadImage();

      const updatedProfile = {
        ...updatedUser,
        image: imageUrl,
      };

      // Update user data on the server
      await axiosSecure.patch(`/users/${encodeURIComponent(user.email)}`, updatedProfile);

      // Trigger the default browser confirmation modal
      const confirmUpdate = window.confirm("Profile updated successfully! Do you want to view your profile?");
      if (confirmUpdate) {
        navigate("/profile"); // Navigate to profile page if the user confirms
      }

    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  // Show loading message if the data is still fetching
  if (loading) return <p className="text-center mt-10">Loading profile...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Edit Profile</h2>

      {/* Full Name Field */}
      <label className="block text-sm font-semibold mb-1">Full Name:</label>
      <input
        type="text"
        name="fullName"
        value={updatedUser.fullName}
        onChange={handleInputChange}
        className="w-full p-2 border rounded-md mb-4"
        required
      />

      {/* Designation Field */}
      <label className="block text-sm font-semibold mb-1">Designation:</label>
      <input
        type="text"
        name="designation"
        value={updatedUser.designation}
        onChange={handleInputChange}
        className="w-full p-2 border rounded-md mb-4"
        required
      />

      {/* Profile Picture */}
      <label className="block text-sm font-semibold mb-1">Profile Picture:</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full p-2 border rounded-md mb-4"
      />
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          className="mt-4 w-full rounded-md shadow-md"
        />
      )}

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full py-2 mt-4 bg-blue-500 text-white rounded-md"
        disabled={saving}
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
};

export default EditProfile;
