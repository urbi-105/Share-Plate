import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/IncomingRequests.css";

function IncomingRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchIncomingRequests = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login to view incoming requests.");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/api/requests/incoming",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRequests(response.data.requests || []);
    } catch (error) {
      console.error(
        "Get incoming requests error:",
        error
      );

      if (error.response) {
        setError(
          error.response.data.message ||
            "Failed to load incoming requests."
        );
      } else {
        setError(
          "Unable to connect to the server."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (requestId, status) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login again.");
      return;
    }

    const response = await axios.put(
      `http://localhost:5000/api/requests/${requestId}/status`,
      {
        status: status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert(response.data.message);

    // Refresh the requests
    fetchIncomingRequests();

  } catch (error) {
    console.error("Update request status error:", error);

    if (error.response) {
      alert(
        error.response.data.message ||
        "Failed to update request."
      );
    } else {
      alert("Unable to connect to the server.");
    }
  }
};

  useEffect(() => {
    fetchIncomingRequests();
  }, []);

  // Loading
  if (loading) {
    return (
      <section className="incoming-requests-page">
        <div className="incoming-message">
          Loading incoming requests...
        </div>
      </section>
    );
  }

  return (
    <section className="incoming-requests-page">

      <div className="incoming-requests-container">

        {/* HEADER */}

        <div className="incoming-header">

          <div>

            <span className="page-badge">
              Donor Dashboard
            </span>

            <h1>Incoming Requests</h1>

            <p>
              See NGOs that have requested the
              food you shared.
            </p>

          </div>

          <Link
            to="/my-foods"
            className="my-foods-btn"
          >
            My Foods
          </Link>

        </div>


        {/* ERROR */}

        {error && (
          <div className="incoming-error">
            {error}
          </div>
        )}


        {/* EMPTY */}

        {!error && requests.length === 0 && (

          <div className="empty-incoming">

            <div className="empty-icon">
              📬
            </div>

            <h2>No requests yet</h2>

            <p>
              When an NGO requests one of your
              shared foods, it will appear here.
            </p>

            <Link
              to="/share-food"
              className="my-foods-btn"
            >
              Share Food
            </Link>

          </div>

        )}


        {/* REQUESTS */}

        {requests.length > 0 && (

          <div className="incoming-grid">

            {requests.map((request) => (

              <div
                className="incoming-card"
                key={request.id}
              >

                {/* TOP */}

                <div className="incoming-card-top">

                  <div>

                    <span className="request-category">
                      {request.category || "Food"}
                    </span>

                    <h2>
                      {request.food_name}
                    </h2>

                  </div>

                  <span
                    className={`request-status ${request.status}`}
                  >
                    {request.status}
                  </span>

                </div>


                {/* NGO */}

                <div className="ngo-section">

                  <h3>
                    Requested by
                  </h3>

                  <p>
                    <strong>
                      {request.ngo_name}
                    </strong>
                  </p>

                  <p>
                    📧 {request.ngo_email}
                  </p>

                  {request.ngo_phone && (
                    <p>
                      📞 {request.ngo_phone}
                    </p>
                  )}

                </div>


                {/* FOOD INFO */}

                <div className="incoming-details">

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


                {/* MESSAGE */}

                {request.message && (

                  <div className="ngo-message">

                    <span>
                      NGO Message
                    </span>

                    <p>
                      "{request.message}"
                    </p>

                  </div>

                )}


                {/* VIEW FOOD */}

                <Link
                  to={`/food/${request.food_id}`}
                  className="view-food-btn"
                >
                  View Food Details →
                </Link>


                {/* ACTIONS */}

                {request.status === "pending" && (

                  <div className="request-actions">

                    <button
  className="accept-btn"
  onClick={() =>
    updateRequestStatus(
      request.id,
      "accepted"
    )
  }
>
  Accept Request
</button>

                    <button
  className="reject-btn"
  onClick={() =>
    updateRequestStatus(
      request.id,
      "rejected"
    )
  }
>
  Reject
</button>

                  </div>

                )}

              </div>

            ))}

          </div>

        )}

      </div>

    </section>
  );
}

export default IncomingRequests;