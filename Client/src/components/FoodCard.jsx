import { Link } from "react-router-dom";
import "../styles/FoodCard.css";
import { formatDate, formatTime } from "../utils/formatDate";

function FoodCard({ food }) {
  return (
    <div className="food-card">

      <img
        src={
          food.image ||
          "https://placehold.co/600x400?text=SharePlate"
        }
        alt={food.name}
        className="food-image"
      />

      <div className="food-info">

        <div className="food-header">
          <h3>{food.name}</h3>

          <span className={`food-status ${food.status}`}>
            {food.status}
          </span>
        </div>

        {food.category && (
          <p className="food-category">
            🍽 {food.category}
          </p>
        )}

        {food.description && (
          <p className="food-description">
            {food.description.length > 80
              ? food.description.substring(0, 80) + "..."
              : food.description}
          </p>
        )}

        <div className="food-meta">

          <p>📍 {food.area}</p>

          <p>🍱 {food.quantity}</p>

          <p>📅 {formatDate(food.pickup_date)}</p>

          <p>⏰ {formatTime(food.pickup_time)}</p>

        </div>

        <Link
          to={`/food/${food.id}`}
          className="food-details-btn"
        >
          View Details →
        </Link>

      </div>

    </div>
  );
}

export default FoodCard;