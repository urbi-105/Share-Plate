import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      console.log("Login response:", response.data);

      // Save JWT token
      localStorage.setItem("token", response.data.token);

      // Save logged-in user information
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      setMessage("Login successful!");

      // Go to home page
      setTimeout(() => {
        navigate("/");
      }, 800);

    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        setError(
          error.response.data.message ||
            "Invalid email or password."
        );
      } else {
        setError(
          "Unable to connect to the server. Please try again."
        );
      }
    }
  };

  return (
    <section className="auth-page">

      <div className="auth-container">

        {/* LEFT GREEN PANEL */}

        <div className="auth-welcome">

          <div className="welcome-badge">
            Welcome Back 👋
          </div>

          <h1>
            Login to
            <br />
            SharePlate
          </h1>

          <p>
            Continue sharing food and helping nearby NGOs
            across Dhaka.
          </p>

        </div>


        {/* RIGHT LOGIN FORM */}

        <div className="auth-form login-form">

          <h2>Login</h2>

          <p className="auth-form-subtitle">
            Welcome back! Continue sharing food and kindness.
          </p>


          {/* SUCCESS MESSAGE */}

          {message && (
            <div className="success-message">
              {message}
            </div>
          )}


          {/* ERROR MESSAGE */}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}


          <form onSubmit={handleSubmit}>

            {/* EMAIL */}

            <div className="form-group">

              <label>Email Address</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />

            </div>


            {/* PASSWORD */}

            <div className="form-group">

              <label>Password</label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />

            </div>


            {/* REMEMBER + FORGOT */}

            <div className="remember-row">

  <label className="remember-label">

    <input
      type="checkbox"
      name="remember"
    />

    <span>Remember Me</span>

  </label>

  <Link
    to="/forgot-password"
    className="forgot-password"
  >
    Forgot Password?
  </Link>

</div>


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="auth-submit-btn"
            >
              Login
            </button>

          </form>


          {/* REGISTER LINK */}

          <p className="auth-switch">

            Don't have an account?

            {" "}

            <Link to="/register">
              Register
            </Link>

          </p>

        </div>

      </div>

    </section>
  );
}

export default Login;