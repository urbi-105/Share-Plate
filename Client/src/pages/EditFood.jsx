import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ShareFood.css";

function EditFood() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [foodData, setFoodData] = useState({
    name: "",
    category: "",
    description: "",
    quantity: "",
    area: "",
    pickup_date: "",
    pickup_time: "",
    pickup_address: "",
    image: "",
  });

  useEffect(() => {
    fetchFood();
  }, []);

  const fetchFood = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/foods/${id}`
      );

      setFoodData({
        ...response.data.food,
        pickup_date: response.data.food.pickup_date
          ?.split("T")[0],
      });
    } catch (error) {
      console.error(error);
      alert("Failed to load food details.");
    }
  };

  const handleChange = (e) => {
    setFoodData({
      ...foodData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:5000/api/foods/${id}`,
        foodData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      navigate("/my-foods");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to update food."
      );
    }
  };

  return (
    <section className="share-food-page">

      <div className="share-header">
        <h1>Edit Food</h1>

        <p>
          Update your shared food information.
        </p>
      </div>

      <form
        className="share-form"
        onSubmit={handleSubmit}
      >

        <h2>Food Information</h2>

        <div className="form-grid">

          <div className="form-group">
            <label>Food Name</label>

            <input
              type="text"
              name="name"
              value={foodData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>

            <select
              name="category"
              value={foodData.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              <option>Biryani</option>
              <option>Rice</option>
              <option>Curry</option>
              <option>Bread</option>
              <option>Dessert</option>
              <option>Snacks</option>
            </select>
          </div>

          <div className="form-group">
            <label>Quantity (Serves)</label>

            <input
              type="number"
              name="quantity"
              value={foodData.quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Area</label>

            <select
              name="area"
              value={foodData.area}
              onChange={handleChange}
              required
            >
              <option value="">Select Area</option>
              <option>Mirpur</option>
              <option>Dhanmondi</option>
              <option>Mohammadpur</option>
              <option>Banani</option>
              <option>Gulshan</option>
              <option>Uttara</option>
              <option>Badda</option>
              <option>Rampura</option>
            </select>
          </div>

        </div>

        <div className="form-group">
          <label>Description</label>

          <textarea
            rows="5"
            name="description"
            value={foodData.description || ""}
            onChange={handleChange}
          />
        </div>

        <h2>Pickup Information</h2>

        <div className="form-grid">

          <div className="form-group">
            <label>Pickup Date</label>

            <input
              type="date"
              name="pickup_date"
              value={foodData.pickup_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Pickup Time</label>

            <input
              type="time"
              name="pickup_time"
              value={foodData.pickup_time}
              onChange={handleChange}
              required
            />
          </div>

        </div>

        <div className="form-group">
          <label>Pickup Address</label>

          <input
            type="text"
            name="pickup_address"
            value={foodData.pickup_address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Image URL (Optional)</label>

          <input
            type="text"
            name="image"
            value={foodData.image || ""}
            onChange={handleChange}
          />
        </div>

        <div className="button-group">

          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/my-foods")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="submit-btn"
          >
            Update Food
          </button>

        </div>

      </form>

    </section>
  );
}

export default EditFood;