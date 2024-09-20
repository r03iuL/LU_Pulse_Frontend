import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Signup = () => {

  const { signup } = useAuth(); // Access the signup method from AuthContext
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const fullName = form.fullName.value;
    const id = form.id.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const userType = form.userType.value;
    const image = form.image.files[0];

    const userData = {
      fullName,
      id,
      email,
      userType,
      image,
    };

    const modal = document.getElementById("my_modal_2");

    // Validate form inputs before proceeding
    if (
      validateFullName(fullName) &&
      validateID(id) &&
      validateEmail(email) &&
      validatePassword(password) &&
      validateConfirmPassword(password, confirmPassword)
    ) {
      try {
        setLoading(true);
        setError("");
        
        // Call the signup method from AuthContext
        await signup(email, password);
        modal.showModal(); // Show success modal
        console.log("User Data :", userData);

        //Redirect to another page after signup
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (error) {
        setError(`Signup failed: ${error.message}`);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please correctly fill up the form.");
    }
  };

  const validateFullName = (fullName) => {
    const errorElement = document.getElementById("fullNameError");
    if (!fullName) {
      errorElement.innerText = "Full name is required";
      return false;
    } else {
      errorElement.innerText = "";
      return true;
    }
  };

  const validateID = (id) => {
    const errorElement = document.getElementById("idError");
    if (!id) {
      errorElement.innerText = "ID is required";
      return false;
    } else {
      errorElement.innerText = "";
      return true;
    }
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@lus\.ac\.bd$/;
    const errorElement = document.getElementById("emailError");
    if (!email) {
      errorElement.innerText = "Email is required";
      return false;
    } else if (!emailPattern.test(email)) {
      errorElement.innerText = "Email must end with @lus.ac.bd";
      return false;
    } else {
      errorElement.innerText = "";
      return true;
    }
  };

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    const errorElement = document.getElementById("passwordError");
    if (!password) {
      errorElement.innerText = "Password is required";
      return false;
    } else if (!passwordPattern.test(password)) {
      errorElement.innerText =
        "Password must be at least 6 characters long, contain 1 uppercase letter, 1 lowercase letter, and 1 number";
      return false;
    } else {
      errorElement.innerText = "";
      return true;
    }
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    const errorElement = document.getElementById("confirmPasswordError");
    if (!confirmPassword) {
      errorElement.innerText = "Confirm password is required";
      return false;
    } else if (password !== confirmPassword) {
      errorElement.innerText = "Passwords do not match";
      return false;
    } else {
      errorElement.innerText = "";
      return true;
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
                className="input input-bordered w-full"
                onBlur={(e) => validateFullName(e.target.value)}
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
                className="input input-bordered w-full"
                onBlur={(e) => validateID(e.target.value)}
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
                className="input input-bordered w-full"
                onBlur={(e) => validateEmail(e.target.value)}
              />
              <span id="emailError" className="text-red-500 text-sm"></span>
            </div>

            {/* User Type Dropdown */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-bold">User Type</span>
              </label>
              <select name="userType" className="select select-bordered w-full">
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
                className="input input-bordered w-full"
                onBlur={(e) => validatePassword(e.target.value)}
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
                className="input input-bordered w-full"
                onBlur={(e) =>
                  validateConfirmPassword(
                    e.target.form.password.value,
                    e.target.value
                  )
                }
              />
              <span
                id="confirmPasswordError"
                className="text-red-500 text-sm"
              ></span>
            </div>

            {/* Image Upload */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text font-bold">Profile Picture</span>
              </label>
              <input
                type="file"
                name="image"
                className="input w-full"
                accept="image/*"
              />
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn bg-sky-600 text-white text-lg ${loading ? "loading" : ""}`}
              >
                {loading ? "Signing Up..." : "Submit"}
              </button>
            </div>
          </form>

          {/* Modal for Email Verification */}
          <dialog id="my_modal_2" className="modal text-center">
            <div className="modal-box">
              <h3 className="font-bold text-lg">SignUp successfull!</h3>
              <p className="py-4">Please verify your email.</p>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>

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
