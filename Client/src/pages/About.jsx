import "../styles/About.css";

function About() {
  return (
    <section className="about-page">

  <h1>About SharePlate</h1>

  <p>
    SharePlate is a food-sharing platform that connects individual donors
    with nearby NGOs across Dhaka to reduce food waste and help people
    in need. Our goal is to make food donation simple, fast, and impactful.
  </p>

  <div className="about-grid">

    <div className="about-card">
      <h3>🎯 Our Mission</h3>

      <p>
        Every day, large amounts of perfectly edible food are wasted while
        many people struggle to find a meal. SharePlate bridges this gap by
        connecting generous donors with trusted NGOs.
      </p>
    </div>

    <div className="about-card">
      <h3>⚡ How It Works</h3>

      <ul>
        <li>Donors share available food.</li>
        <li>NGOs browse nearby food donations.</li>
        <li>NGOs send pickup requests.</li>
        <li>Donors approve or reject requests.</li>
        <li>Food is collected before it goes to waste.</li>
      </ul>
    </div>

    <div className="about-card">
      <h3>🌱 Why SharePlate?</h3>

      <ul>
        <li>Reduce food waste</li>
        <li>Support local communities</li>
        <li>Fast and secure donation process</li>
        <li>Easy communication between donors and NGOs</li>
      </ul>
    </div>

  </div>

</section>
  );
}

export default About;