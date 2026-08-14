import FoodCard from "./FoodCard";
import "../styles/FeaturedFoods.css";
import foods from "../Data/Foods";

function FeaturedFoods() {
  return (
    <section className="featured-foods">
      <h2>Featured Foods</h2>

      <p>
        Browse recently shared food available for nearby NGOs.
      </p>

      <div className="food-grid">
        {foods.slice(0, 6).map((food) => (
          <FoodCard
            key={food.id}
            food={food}
          />
        ))}
      </div>
    </section>
  );
}

export default FeaturedFoods;