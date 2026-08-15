import "../styles/Hero.css";

function Hero() {
  return (
    <section className="hero">

      <div className="circle one"></div>
      <div className="circle two"></div>

      <div className="hero-content">

        <span className="hero-badge">
          🍽️ Reducing Food Waste
        </span>

        <h1>
          Share Food,
          <br />
          Spread Kindness.
        </h1>

        <p>
          Connect with nearby NGOs across Dhaka and donate your surplus food
          to reduce food waste while helping people in need.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">
            Share Food
          </button>

          <button className="secondary-btn">
            Browse Nearby Food
          </button>
        </div>

      </div>

      <div className="hero-image">

        <div className="image-placeholder">
          🍱
        </div>

      </div>

    </section>
  );
}

export default Hero;