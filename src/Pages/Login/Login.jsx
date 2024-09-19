import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic
    console.log(formData);
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
                value={formData.email}
                onChange={handleChange}
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
                value={formData.password}
                onChange={handleChange}
                className="input input-bordered"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button type="submit" className="btn bg-sky-600 text-white text-lg">
                Login
              </button>
            </div>
          </form>

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
