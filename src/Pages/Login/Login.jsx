import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { login } = useAuth(); // Access the login method from AuthContext
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Access email and password directly from the form
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      setLoading(true);
      setError("");

      // Call the login method from AuthContext
      const userCredential = await login(email, password);
      const user = userCredential.user;

      // Check if the email is verified
      if (!user.emailVerified) {
        setError("Please verify your email before logging in.");
        return; // Stop here if the email is not verified
      }

      // Redirect to another page after successful login
      navigate("/"); // Assuming you want to navigate to a dashboard page
    } catch (error) {
      setError(`Login failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center lg:min-h-screen bg-gray-100 py-10">
      <div className="card w-full max-w-2xl shadow-2xl bg-base-100 p-2 m-4 lg:m-0">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center text-sky-600 mb-4">
            Login
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                className="input input-bordered"
                required
              />
            </div>

            {/* Password */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                className="input input-bordered"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-sm mb-4">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn bg-sky-600 text-white text-lg ${loading ? "loading" : ""}`}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          {/* Forgot Password Link */}
          <div className="mt-4 text-sm text-right">
            <p>
              
              <Link to="/forgotpass" className="text-red-400 font-semibold">
              Forgot password ?{" "}
              </Link>
            </p>
          </div>

          {/* Signup Redirect */}
          <div className="text-center mt-4">
            <p className="text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-primary font-semibold">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
