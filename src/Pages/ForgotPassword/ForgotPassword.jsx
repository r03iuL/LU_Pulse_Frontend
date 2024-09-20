import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const { resetPassword } = useAuth(); // Get the resetPassword method from AuthContext
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await resetPassword(email);
      setMessage("Password reset email sent. Please check your inbox.");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setError(`Failed to reset password: ${error.message}`);
    } finally {
      setLoading(false);

    }
  };

  return (
    <div className="flex items-center justify-center lg:min-h-screen bg-gray-100 py-10">
      <div className="card w-full max-w-2xl shadow-2xl bg-base-100 p-2 m-4 lg:m-0">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center text-sky-600 mb-4">
            Reset Password
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered"
                required
              />
            </div>

            {/* Error Message */}
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

            {/* Success Message */}
            {message && <div className="text-green-500 text-sm mb-4">{message}</div>}

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn bg-sky-600 text-white text-lg ${
                  loading ? "loading" : ""
                }`}
              >
                {loading ? "Sending..." : "Send Password Reset Email"}
              </button>
            </div>
          </form>

          {/* Back to Login Link */}
          <div className="text-center mt-4">
            <p className="text-sm">
              Remembered your password?{" "}
              <Link to="/login" className="text-primary font-semibold">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
