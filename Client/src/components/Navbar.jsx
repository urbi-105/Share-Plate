import { Link } from "react-router-dom";
import { FaUtensils, FaSearch } from "react-icons/fa";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <FaUtensils />
        <Link to="/">SharePlate</Link>
      </div>

      <div className="search-box">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search food..."
        />
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/food-feed">Food Feed</Link>
        <Link to="/share-food">Share Food</Link>
        <Link to="/about">About</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}

export default Navbar;