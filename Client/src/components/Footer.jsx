import "../styles/Footer.css";
import { PiBowlFoodFill } from "react-icons/pi";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-about">

          <div className="footer-logo">

            <PiBowlFoodFill />

            <h2>SharePlate</h2>

          </div>

          <p>
            Helping reduce food waste by connecting generous
            individuals with nearby NGOs across Dhaka.
          </p>

        </div>

        <div className="footer-links">

          <h3>Quick Links</h3>

          <a href="/">Home</a>

          <a href="/food-feed">Food Feed</a>

          <a href="/share-food">Share Food</a>

          <a href="/login">Login</a>

        </div>

        <div className="footer-contact">

          <h3>Contact</h3>

          <p>📍 Dhaka, Bangladesh</p>

          <p>📧 support@shareplate.com</p>

          <p>☎ +880 1234-567890</p>

        </div>

      </div>

      <div className="footer-bottom">

        <div className="social-icons">

          <FaFacebookF />

          <FaLinkedinIn />

          <FaGithub />

        </div>

        <p>
          © 2026 SharePlate. All rights reserved.
        </p>

      </div>

    </footer>
  );
}

export default Footer;