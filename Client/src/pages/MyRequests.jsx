import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/MyRequests.css";

function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMyRequests = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login to view your requests.");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/api/requests/my-requests",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRequests(response.data.requests || []);
    } catch (error) {
      console.error("Get requests error:", error);

      if (error.response) {
        setError(
          error.response.data.message ||
            "Failed to load your requests."
        );
      } else {
        setError("Unable to connect to the server.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRequests();
  }, []);

  // Loading
  if (loading) {
    return (
      <section className="my-requests-page">
        <div className="my-requests-message">
          Loading your requests...
        </div>
      </section>
    );
  }

  return (
    <section className="my-requests-page">

      <div className="my-requests-container">

        {/* PAGE HEADER */}

        <div className="my-requests-header">

          <div>
            <span className="page-badge">
              NGO Dashboard
            </span>

            <h1>My Requests</h1>

            <p>
              Track the food you have requested from
              SharePlate donors.
            </p>
          </div>

          <Link
            to="/food-feed"
            className="browse-food-btn"
          >
            Browse Food
          </Link>

        </div>


        {/* ERROR */}

        {error && (
          <div className="requests-error">
            {error}
          </div>
        )}


        {/* NO REQUESTS */}

        {!error && requests.length === 0 && (
          <div className="empty-requests">

            <div className="empty-icon">
              🍱
            </div>

            <h2>No requests yet</h2>

            <p>
              You haven't requested any food yet.
              Browse available food and make your first
              request.
            </p>

            <Link
              to="/food-feed"
              className="browse-food-btn"
            >
              Browse Food
            </Link>

          </div>
        )}


        {/* REQUEST LIST */}

        {requests.length > 0 && (
          <div className="requests-grid">

            {requests.map((request) => (

              <div
                className="request-card"
                key={request.id}
              >

                <div className="request-card-top">

                  <div>

                    <span className="request-category">
                      {request.category || "Food"}
                    </span>

                    <h2>
                      {request.name}
                    </h2>

                  </div>

                  <span
                    className={`request-status ${request.status}`}
                  >
                    {request.status}
                  </span>

                </div>


                <div className="request-details">

                  <div>
                    <span>🍱 Quantity</span>
                    <strong>
                      {request.quantity}
                    </strong>
                  </div>

                  <div>
                    <span>📍 Area</span>
                    <strong>
                      {request.area}
                    </strong>
                  </div>

                  <div>
                    <span>📅 Pickup Date</span>
                    <strong>
                      {request.pickup_date}
                    </strong>
                  </div>

                  <div>
                    <span>⏰ Pickup Time</span>
                    <strong>
                      {request.pickup_time}
                    </strong>
                  </div>

                </div>


                {request.message && (
                  <div className="request-message">

                    <span>Your message</span>

                    <p>
                      "{request.message}"
                    </p>

                  </div>
                )}


                <Link
                  to={`/food/${request.food_id}`}
                  className="view-food-btn"
                >
                  View Food Details →
                </Link>

              </div>

            ))}

          </div>
        )}

      </div>

    </section>
  );
}

export default MyRequests;