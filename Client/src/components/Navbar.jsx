import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUtensils, FaSearch } from "react-icons/fa";
import "../styles/Navbar.css";

function Navbar() {
  const [search, setSearch] = useState("");
const navigate = useNavigate();

const handleSearch = (e) => {
  e.preventDefault();

  navigate(
    `/food-feed?search=${encodeURIComponent(search)}`
  );
};

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="navbar">

      <div className="logo">
        <FaUtensils />
        <Link to="/">SharePlate</Link>
      </div>

      <form
  className="search-box"
  onSubmit={handleSearch}
>
  <FaSearch className="search-icon" />

  <input
    type="text"
    placeholder="Search food..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</form>

      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/food-feed">
          Food Feed
        </Link>

        <Link to="/about">
          About
        </Link>

        {!user && (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>
        )}

        {user?.role === "donor" && (
          <>
            <Link to="/share-food">
              Share Food
            </Link>

            <Link to="/my-foods">
              My Foods
            </Link>

            <Link to="/incoming-requests">
              Incoming Requests
            </Link>

            <Link to="/donor-dashboard">
              Dashboard
            </Link>

            <span className="welcome-user">
              Hi, {user.full_name}
            </span>

            <button
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}

        {user?.role === "ngo" && (
          <>
            <Link to="/my-requests">
              My Requests
            </Link>

            <Link to="/ngo-dashboard">
              Dashboard
            </Link>

            <span className="welcome-user">
              Hi, {user.full_name}
            </span>

            <button
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}

        {user?.role === "admin" && (
          <>
            <Link to="/admin-dashboard">
              Dashboard
            </Link>

            <span className="welcome-user">
              Hi, Admin
            </span>

            <button
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;