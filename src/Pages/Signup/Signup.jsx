import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    id: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "student", // Default to 'student'
    image: null, // Added image field
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        [name]: files[0], // Store the file object
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateFullName = () => {
    if (!formData.fullName) {
      document.getElementById("fullNameError").innerText = "Full name is required";
      return false;
    } else {
      document.getElementById("fullNameError").innerText = "";
      return true;
    }
  };

  const validateID = () => {
    if (!formData.id) {
      document.getElementById("idError").innerText = "ID is required";
      return false;
    } else {
      document.getElementById("idError").innerText = "";
      return true;
    }
  };

  const validateEmail = () => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@lus\.ac\.bd$/;
    if (!formData.email) {
      document.getElementById("emailError").innerText = "Email is required";
      return false;
    } else if (!emailPattern.test(formData.email)) {
      document.getElementById("emailError").innerText = "Email must end with @lus.ac.bd";
      return false;
    } else {
      document.getElementById("emailError").innerText = "";
      return true;
    }
  };

  const validatePassword = () => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    if (!formData.password) {
      document.getElementById("passwordError").innerText = "Password is required";
      return false;
    } else if (!passwordPattern.test(formData.password)) {
      document.getElementById("passwordError").innerText = "Password must be at least 6 characters long, contain 1 uppercase letter, 1 lowercase letter, and 1 number";
      return false;
    } else {
      document.getElementById("passwordError").innerText = "";
      return true;
    }
  };

  const validateConfirmPassword = () => {
    if (!formData.confirmPassword) {
      document.getElementById("confirmPasswordError").innerText = "Confirm password is required";
      return false;
    } else if (formData.password !== formData.confirmPassword) {
      document.getElementById("confirmPasswordError").innerText = "Passwords do not match";
      return false;
    } else {
      document.getElementById("confirmPasswordError").innerText = "";
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Run all validations
    const isFullNameValid = validateFullName();
    const isIDValid = validateID();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    // Check if all validations passed
    if (isFullNameValid && isIDValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
      // Proceed with signup logic
      console.log(formData);
      alert("Signup successful!");
    } else {
      // Handle invalid form
      alert("Please correct the errors in the form.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 lg:py-10">
      <div className="card w-full max-w-2xl shadow-2xl bg-base-100 p-2 m-4 lg:m-0">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center text-sky-600 mb-4">
            Signup
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-bold">Full Name</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={validateFullName} // Directly call validation
                className="input input-bordered w-full"
              />
              <span id="fullNameError" className="text-red-500 text-sm"></span>
            </div>

            {/* ID */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-bold">ID</span>
              </label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleChange}
                onBlur={validateID} // Directly call validation
                className="input input-bordered w-full"
              />
              <span id="idError" className="text-red-500 text-sm"></span>
            </div>

            {/* Email */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-bold">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={validateEmail} // Directly call validation
                className="input input-bordered w-full"
              />
              <span id="emailError" className="text-red-500 text-sm"></span>
            </div>

            {/* User Type Dropdown */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-bold">User Type</span>
              </label>
              <select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="staff">Staff</option>
              </select>
            </div>

            {/* Password */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-bold">Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                onBlur={validatePassword} // Directly call validation
                className="input input-bordered w-full"
              />
              <span id="passwordError" className="text-red-500 text-sm"></span>
            </div>

            {/* Confirm Password */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-bold">Confirm Password</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                onBlur={validateConfirmPassword} // Directly call validation
                className="input input-bordered w-full"
              />
              <span id="confirmPasswordError" className="text-red-500 text-sm"></span>
            </div>

            {/* Image Upload */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-bold">Profile Picture</span>
              </label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="input w-full"
                accept="image/*"
              />
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn bg-sky-600 text-white text-lg w-full"
              >
                Signup
              </button>
            </div>
          </form>

          {/* Login Redirect */}
          <div className="text-center mt-4">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-sky-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
