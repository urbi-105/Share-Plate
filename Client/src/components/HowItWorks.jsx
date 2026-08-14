import "../styles/HowItWorks.css";
import { FaUtensils, FaMapMarkerAlt, FaHandsHelping } from "react-icons/fa";

function HowItWorks() {
  return (
    <section className="how-it-works">

      <div className="section-title">
        <span>How It Works</span>

        <h2>How SharePlate Works</h2>

        <p>
          Share your extra food with nearby NGOs in three simple steps.
        </p>
      </div>

      <div className="steps">

        <div className="step-card">
          <div className="step-icon">
            <FaUtensils />
          </div>

          <h3>Share Food</h3>

          <p>
            Add food details, quantity, pickup time and your area within Dhaka.
          </p>
        </div>

        <div className="step-card">
          <div className="step-icon">
            <FaMapMarkerAlt />
          </div>

          <h3>Nearby NGO</h3>

          <p>
            NGOs in the same area can browse your food and send a request.
          </p>
        </div>

        <div className="step-card">
          <div className="step-icon">
            <FaHandsHelping />
          </div>

          <h3>Pickup & Help</h3>

          <p>
            The donor approves the request and the NGO collects the food safely.
          </p>
        </div>

      </div>

    </section>
  );
}

export default HowItWorks;