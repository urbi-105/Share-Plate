import { formatDate, formatTime } from "../utils/formatDate";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/FoodDetails.css";

function FoodDetails() {
 
  const { id } = useParams();
  const navigate = useNavigate();

  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFood();
  }, []);

  const fetchFood = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/foods/${id}`
      );

      setFood(response.data.food);
    } catch (err) {
      console.error("Fetch food error:", err);
      setError("Unable to load food details.");
    } finally {
      setLoading(false);
    }
  };

  const handleRequestFood = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/requests",
        {
          food_id: food.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Food requested successfully!");

      navigate("/my-requests");
    } catch (error) {
      console.error("Request Food Error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to request food."
      );
    }
  };

  if (loading) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        Loading...
      </h2>
    );
  }

  if (error) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "40px" }}>
        {error}
      </h2>
    );
  }

  return (
    <section className="food-details-page">
      <div className="food-details-container">

        <img
          src={
            food.image ||
            "https://placehold.co/700x450?text=SharePlate"
          }
          alt={food.name}
          className="details-image"
        />

        <div className="details-info">

          <h1>{food.name}</h1>

          <span className={`status ${food.status}`}>
            {food.status}
          </span>

          <p>
            <strong>Category:</strong>{" "}
            {food.category || "N/A"}
          </p>

          <p>
            <strong>Description:</strong>
          </p>

          <p>
            {food.description ||
              "No description provided."}
          </p>

          <hr />

          <p>
            <strong>Quantity:</strong>{" "}
            {food.quantity}
          </p>

          <p>
            <strong>Area:</strong>{" "}
            {food.area}
          </p>

          <p>
            <strong>Pickup Date:</strong>{" "}
            {food.pickup_date}
          </p>

          <p>
            <strong>Pickup Time:</strong>{" "}
            {formatTime(food.pickup_time)}
          </p>

          <p>
            <strong>Pickup Address:</strong>{" "}
            {food.pickup_address}
          </p>

          <button
            className="request-btn"
            onClick={handleRequestFood}
          >
            Request Food
          </button>

        </div>

      </div>
    </section>
  );
}

export default FoodDetails;