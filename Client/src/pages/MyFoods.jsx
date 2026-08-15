import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/MyFoods.css";
import { useNavigate } from "react-router-dom";

function MyFoods() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
   const navigate = useNavigate();

  useEffect(() => {
    fetchMyFoods();
  }, []);

  const fetchMyFoods = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/foods/my-foods",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFoods(response.data.foods);
    } catch (error) {
      console.error(error);
      alert("Failed to load your foods.");
    } finally {
      setLoading(false);
    }
  };

  const deleteFood = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this food?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/foods/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Food deleted successfully!");

      fetchMyFoods();
    } catch (error) {
      console.error(error);
      alert(
  error.response?.data?.message ||
  "Unable to delete food."
);
    }
  };

  if (loading) {
    return (
      <div className="myfoods-container">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="myfoods-container">

      <h1>My Shared Foods</h1>

      {foods.length === 0 ? (
        <p>You haven't shared any food yet.</p>
      ) : (
        <div className="food-grid">

          {foods.map((food) => (

            <div className="food-card" key={food.id}>

              <h3>{food.name}</h3>

              <p>
                <strong>Category:</strong> {food.category}
              </p>

              <p>
                <strong>Quantity:</strong> {food.quantity}
              </p>

              <p>
                <strong>Area:</strong> {food.area}
              </p>

              <p>
                <strong>Pickup Date:</strong>{" "}
                {food.pickup_date}
              </p>

              <p>
                <strong>Pickup Time:</strong>{" "}
                {food.pickup_time}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span className={`status ${food.status}`}>
                  {food.status}
                </span>
              </p>

              <div className="food-actions">

  <button
    className="edit-btn"
    onClick={() => navigate(`/edit-food/${food.id}`)}
  >
    Edit
  </button>

  <button
  className="delete-btn"
  onClick={() => deleteFood(food.id)}
>
  Delete
</button>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default MyFoods;