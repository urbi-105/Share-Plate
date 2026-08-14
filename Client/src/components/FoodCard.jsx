import { Link } from "react-router-dom";
import "../styles/FoodCard.css";

function FoodCard({ food }) {
  return (
    <div className="food-card">

      <img
        src={
          food.image ||
          "https://placehold.co/600x400?text=SharePlate+Food"
        }
        alt={food.name}
        className="food-image"
      />

      <div className="food-info">

        <h3>{food.name}</h3>

        {food.category && (
          <p className="food-category">
            {food.category}
          </p>
        )}

        <p>
          📍 {food.area}
        </p>

        <p>
          🍱 Serves {food.quantity} people
        </p>

        <p>
          ⏰ Pickup Before {food.pickup_time}
        </p>

        <Link
          to={`/food/${food.id}`}
          className="food-details-btn"
        >
          View Details
        </Link>

      </div>

    </div>
  );
}

export default FoodCard;