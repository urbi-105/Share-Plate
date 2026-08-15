import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/DonorDashboard.css";

function DonorDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [dashboard, setDashboard] = useState({
    totalFoods: 0,
    pendingRequests: 0,
    collected: 0,
    recentFoods: [],
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/dashboard/donor",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDashboard(response.data);
    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  };

  return (
    <section className="dashboard-page">
      <div className="dashboard-container">

        <div className="dashboard-header">
          <h1>Donor Dashboard</h1>

          <p>
            Welcome back,
            <span> {user?.full_name || "Donor"} 👋</span>
          </p>
        </div>

        <div className="stats-grid">

          <div className="stat-card">
            <h2>{dashboard.totalFoods}</h2>
            <p>Foods Shared</p>
          </div>

          <div className="stat-card">
            <h2>{dashboard.pendingRequests}</h2>
            <p>Pending Requests</p>
          </div>

          <div className="stat-card">
            <h2>{dashboard.collected}</h2>
            <p>Collected</p>
          </div>

        </div>

        <div className="quick-actions">

          <h2>Quick Actions</h2>

          <div className="action-grid">

            <Link
              to="/share-food"
              className="action-card"
            >
              🍛
              <span>Share Food</span>
            </Link>

            <Link
              to="/my-foods"
              className="action-card"
            >
              📦
              <span>My Foods</span>
            </Link>

            <Link
              to="/incoming-requests"
              className="action-card"
            >
              📨
              <span>Incoming Requests</span>
            </Link>

          </div>

        </div>

        <div className="recent-foods">

          <h2>Recent Shared Foods</h2>

          {dashboard.recentFoods.length === 0 ? (

            <div className="empty-card">

              <h3>No foods shared yet</h3>

              <p>
                Start helping your community by sharing
                your first meal.
              </p>

              <Link
                to="/share-food"
                className="share-btn"
              >
                Share Food
              </Link>

            </div>

          ) : (

            <div className="food-list">

              {dashboard.recentFoods.map((food) => (

                <div
                  className="food-card"
                  key={food.id}
                >

                  <h3>{food.name}</h3>

                  <p>
                    <strong>Quantity:</strong>{" "}
                    {food.quantity}
                  </p>

                  <p>
                    <strong>Area:</strong>{" "}
                    {food.area}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`status ${food.status}`}
                    >
                      {food.status}
                    </span>
                  </p>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>
    </section>
  );
}

export default DonorDashboard;