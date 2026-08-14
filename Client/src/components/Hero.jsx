import "../styles/Hero.css";

function Hero() {
  return (
    <section className="hero">

      {/* Background Decorations */}
      <div className="circle one"></div>
      <div className="circle two"></div>

      {/* Left Side */}
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

      {/* Right Side */}
      <div className="hero-image">

        {/* Temporary Emoji */}
        <div className="image-placeholder">
          🍱
        </div>

        {/*
        Later replace with:

        <img
          src={heroImage}
          alt="Food Sharing"
          className="hero-img"
        />
        */}

      </div>

    </section>
  );
}

export default Hero;