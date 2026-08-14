import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Register.css";

function Register() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    role: "donor",
    password: "",
    confirmPassword: "",
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

    // Clear previous messages
    setMessage("");
    setError("");

    // Check password
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
          password: formData.password,
        }
      );

      console.log("Registration response:", response.data);

      // Show success message
      setMessage(
        response.data.message || "Registration successful!"
      );

      // Clear form
      setFormData({
        full_name: "",
        email: "",
        phone: "",
        role: "donor",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Registration error:", error);

      // Backend error message
      if (error.response) {
        setError(
          error.response.data.message ||
            "Registration failed."
        );
      } else {
        setError(
          "Unable to connect to the server. Please make sure the server is running."
        );
      }
    }
  };

  return (
    <section className="auth-page">

      {/* LEFT GREEN PANEL */}

      <div className="auth-container">

        <div className="auth-welcome">

          <div className="welcome-badge">
            Join SharePlate 🍃
          </div>

          <h1>
            Share Food,
            <br />
            Spread Kindness.
          </h1>

          <p>
            Create an account and help reduce food waste
            by connecting extra food with nearby NGOs
            across Dhaka.
          </p>

        </div>


        {/* RIGHT FORM */}

        <div className="auth-form register-form">

          <h2>Create Your Account</h2>

          <p className="auth-form-subtitle">
            Join SharePlate and help reduce food waste.
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

            {/* FULL NAME */}

            <div className="form-group">

              <label>Full Name</label>

              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
              />

            </div>


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


            {/* PHONE */}

            <div className="form-group">

              <label>Phone Number</label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="01XXXXXXXXX"
              />

            </div>


            {/* ROLE */}

            <div className="form-group">

              <label>I want to</label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
              >

                <option value="donor">
                  Share Food
                </option>

                <option value="ngo">
                  Receive Food as an NGO
                </option>

              </select>

            </div>


            {/* PASSWORD */}

            <div className="form-group">

              <label>Password</label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
              />

            </div>


            {/* CONFIRM PASSWORD */}

            <div className="form-group">

              <label>Confirm Password</label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />

            </div>


            {/* SUBMIT */}

            <button
              type="submit"
              className="auth-submit-btn"
            >
              Create Account
            </button>

          </form>


          {/* LOGIN LINK */}

          <p className="auth-switch">

            Already have an account?

            {" "}

            <Link to="/login">
              Login
            </Link>

          </p>

        </div>

      </div>

    </section>
  );
}

export default Register;