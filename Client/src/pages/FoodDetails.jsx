import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../styles/FoodDetails.css";

function FoodDetails() {
  const { id } = useParams();

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  const [requesting, setRequesting] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");
  const [requestError, setRequestError] = useState("");

  const fetchFood = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `http://localhost:5000/api/foods/${id}`
      );

      setFood(response.data.food);

    } catch (error) {
      console.error("Error fetching food details:", error);

      setRequestError(
        "Unable to load this food information."
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFood();
  }, [id]);


  // ==========================================
  // REQUEST FOOD
  // ==========================================

  const handleRequestFood = async () => {

    setRequestMessage("");
    setRequestError("");

    const token = localStorage.getItem("token");

    // User is not logged in
    if (!token) {
      setRequestError(
        "Please login as an NGO to request food."
      );

      return;
    }

    try {

      setRequesting(true);

      const response = await axios.post(
        "http://localhost:5000/api/requests",
        {
          food_id: food.id,
          message:
            "We would like to collect this food for our beneficiaries.",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRequestMessage(
        response.data.message ||
        "Food request submitted successfully!"
      );

    } catch (error) {

      console.error(
        "Request food error:",
        error
      );

      if (error.response) {

        setRequestError(
          error.response.data.message ||
          "Failed to request food."
        );

      } else {

        setRequestError(
          "Unable to connect to the server."
        );

      }

    } finally {

      setRequesting(false);

    }
  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <section className="food-details-page">

        <div className="food-details-message">
          Loading food details...
        </div>

      </section>
    );
  }


  // ==========================================
  // FOOD NOT FOUND
  // ==========================================

  if (!food) {
    return (
      <section className="food-details-page">

        <div className="food-details-message">

          {requestError || "Food not found."}

          <br />

          <Link to="/food-feed">
            Back to Food Feed
          </Link>

        </div>

      </section>
    );
  }


  // ==========================================
  // MAIN UI
  // ==========================================

  return (
    <section className="food-details-page">

      <div className="food-details-container">

        {/* IMAGE */}

        <div className="food-details-image-wrapper">

          <img
            src={
              food.image ||
              "https://placehold.co/600x400?text=SharePlate+Food"
            }
            alt={food.name}
            className="food-details-image"
          />

        </div>


        {/* INFORMATION */}

        <div className="food-details-content">

          <span className="food-details-category">
            {food.category || "Food"}
          </span>


          <h1>
            {food.name}
          </h1>


          <p className="food-description">

            {food.description ||
              "No description has been provided for this food."}

          </p>


          {/* FOOD INFORMATION */}

          <div className="food-info-list">

            <div className="food-info-item">

              <span>
                🍱 Quantity
              </span>

              <strong>
                {food.quantity} people
              </strong>

            </div>


            <div className="food-info-item">

              <span>
                📍 Area
              </span>

              <strong>
                {food.area}
              </strong>

            </div>


            <div className="food-info-item">

              <span>
                📅 Pickup Date
              </span>

              <strong>
                {food.pickup_date}
              </strong>

            </div>


            <div className="food-info-item">

              <span>
                ⏰ Pickup Time
              </span>

              <strong>
                {food.pickup_time}
              </strong>

            </div>


            <div className="food-info-item">

              <span>
                🏠 Pickup Address
              </span>

              <strong>
                {food.pickup_address}
              </strong>

            </div>

          </div>


          {/* SUCCESS MESSAGE */}

          {requestMessage && (

            <div className="request-success">
              {requestMessage}
            </div>

          )}


          {/* ERROR MESSAGE */}

          {requestError && (

            <div className="request-error">
              {requestError}
            </div>

          )}


          {/* BUTTONS */}

          <div className="food-details-actions">

            <button
              className="request-food-btn"
              onClick={handleRequestFood}
              disabled={requesting}
            >

              {requesting
                ? "Requesting..."
                : "Request Food"}

            </button>


            <Link
              to="/food-feed"
              className="back-food-btn"
            >
              ← Back to Food Feed
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}

export default FoodDetails;