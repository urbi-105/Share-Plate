import { useState } from "react";
import "../styles/ShareFood.css";

function ShareFood() {
  const [formData, setFormData] = useState({
    foodName: "",
    category: "",
    foodType: "",
    serves: "",
    description: "",
    area: "",
    address: "",
    pickupDate: "",
    pickupTime: "",
    condition: "Freshly Cooked",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    alert("Food shared successfully!");
  };

  return (
    <section className="share-food-page">

      <div className="share-header">
        <h1>Share Your Extra Food</h1>

        <p>
          Help reduce food waste by donating your extra food to
          nearby NGOs across Dhaka.
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
              name="foodName"
              placeholder="Chicken Biryani"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Category</label>

            <select
              name="category"
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
            <label>Food Type</label>

            <select
              name="foodType"
              onChange={handleChange}
            >
              <option>Veg</option>
              <option>Non-Veg</option>
            </select>
          </div>

          <div className="form-group">
            <label>Serves</label>

            <input
              type="number"
              name="serves"
              placeholder="8"
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="form-group">
          <label>Description</label>

          <textarea
            rows="5"
            name="description"
            placeholder="Describe the food..."
            onChange={handleChange}
          />
        </div>

        <h2>Pickup Information</h2>

        <div className="form-grid">

          <div className="form-group">
            <label>Area</label>

            <select
              name="area"
              onChange={handleChange}
            >
              <option>Select Area</option>
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

          <div className="form-group">
            <label>Pickup Date</label>

            <input
              type="date"
              name="pickupDate"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Pickup Time</label>

            <input
              type="time"
              name="pickupTime"
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="form-group">
          <label>Pickup Address</label>

          <input
            type="text"
            name="address"
            placeholder="House 12, Road 5, Mirpur DOHS"
            onChange={handleChange}
          />
        </div>

        <h2>Food Condition</h2>

        <div className="radio-group">

          <label>
            <input
              type="radio"
              name="condition"
              value="Freshly Cooked"
              defaultChecked
              onChange={handleChange}
            />
            Freshly Cooked
          </label>

          <label>
            <input
              type="radio"
              name="condition"
              value="Packed"
              onChange={handleChange}
            />
            Packed
          </label>

          <label>
            <input
              type="radio"
              name="condition"
              value="Refrigerated"
              onChange={handleChange}
            />
            Refrigerated
          </label>

        </div>

        <div className="form-group">
          <label>Food Image</label>

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <div className="button-group">

          <button
            type="button"
            className="cancel-btn"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="submit-btn"
          >
            Share Food
          </button>

        </div>

      </form>

    </section>
  );
}

export default ShareFood;