import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import FoodCard from "../components/FoodCard";
import "../styles/FoodFeed.css";

function FoodFeed() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const fetchFoods = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
      `http://localhost:5000/api/foods?search=${search}`
      );

      setFoods(response.data.foods);

    } catch (error) {
      console.error("Error fetching foods:", error);

      setError(
        "Unable to load food right now. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  fetchFoods();
  }, [search]);

  return (
    <section className="food-feed-page">

      <div className="food-feed-header">

        <h1>Food Feed</h1>

        <p>
          Discover food shared by generous people across Dhaka.
        </p>

      </div>


      {loading && (
        <div className="food-feed-message">
          Loading available food...
        </div>
      )}


      {error && (
        <div className="food-feed-error">
          {error}
        </div>
      )}


      {!loading && !error && foods.length === 0 && (
        <div className="food-feed-message">

          <h3>No food available right now.</h3>

          <p>
            Check back later or share some food
            with the community.
          </p>

        </div>
      )}


      {!loading && !error && foods.length > 0 && (

        <div className="food-grid">

          {foods.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
            />
          ))}

        </div>

      )}

    </section>
  );
}

export default FoodFeed;