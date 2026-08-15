import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/MyRequests.css";

function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/requests/my-requests",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRequests(response.data.requests);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) {
    return (
      <h2 style={{ textAlign: "center" }}>
        Loading...
      </h2>
    );
  }

  return (
    <section className="my-requests-page">

      <div className="page-header">

        <h1>My Requests</h1>

        <p>
          Track every food request you've made.
        </p>

      </div>

      {requests.length === 0 ? (

        <div className="empty-card">

          <h3>No Requests Yet</h3>

          <p>
            Browse available foods and send your first request.
          </p>

        </div>

      ) : (

        <div className="requests-grid">

          {requests.map((request) => (

            <div
              className="request-card"
              key={request.id}
            >

              <div className="request-top">

                <h2>{request.name}</h2>

                <span className={`status ${request.status}`}>
                  {request.status}
                </span>

              </div>

              <p>
                <strong>Category:</strong>{" "}
                {request.category}
              </p>

              <p>
                <strong>Quantity:</strong>{" "}
                {request.quantity}
              </p>

              <p>
                <strong>Area:</strong>{" "}
                {request.area}
              </p>

              <p>
                <strong>Pickup Date:</strong>{" "}
                {formatDate(request.pickup_date)}
              </p>

              <p>
                <strong>Pickup Time:</strong>{" "}
                {formatTime(request.pickup_time)}
              </p>

              <p>
                <strong>Pickup Address:</strong>{" "}
                {request.pickup_address}
              </p>

              {request.message && (
                <>
                  <hr />

                  <p>
                    <strong>Your Message</strong>
                  </p>

                  <p>{request.message}</p>
                </>
              )}

            </div>

          ))}

        </div>

      )}

    </section>
  );
}

export default MyRequests;