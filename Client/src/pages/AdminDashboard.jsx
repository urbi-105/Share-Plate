import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5000/api/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDashboard(response.data);
    } catch (error) {
      console.error("Admin dashboard error:", error);
      alert("Unable to load admin dashboard.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId, userName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${userName}"?`
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `http://localhost:5000/api/admin/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      fetchDashboard();

    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
        "Failed to delete user."
      );
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Loading Admin Dashboard...
      </h2>
    );
  }

  return (
    <section className="admin-dashboard">

      <h1>Admin Dashboard</h1>

      <div className="admin-stats">

        <div className="admin-card">
          <h2>{dashboard.totalUsers}</h2>
          <p>Total Users</p>
        </div>

        <div className="admin-card">
          <h2>{dashboard.totalDonors}</h2>
          <p>Total Donors</p>
        </div>

        <div className="admin-card">
          <h2>{dashboard.totalNGOs}</h2>
          <p>Total NGOs</p>
        </div>

        <div className="admin-card">
          <h2>{dashboard.totalFoods}</h2>
          <p>Total Foods</p>
        </div>

        <div className="admin-card">
          <h2>{dashboard.totalRequests}</h2>
          <p>Total Requests</p>
        </div>

      </div>

      <h2 className="user-heading">Registered Users</h2>

      <table className="users-table">

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Joined</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {dashboard.users.map((user) => (

            <tr key={user.id}>

              <td>{user.full_name}</td>

              <td>{user.email}</td>

              <td>{user.role}</td>

              <td>
                {new Date(user.created_at).toLocaleDateString()}
              </td>

              <td>

  {currentUser.id === user.id ? (
    <span style={{ color: "#888" }}>
      Current User
    </span>
  ) : (
    <button
      className="delete-btn"
      onClick={() =>
        handleDeleteUser(
          user.id,
          user.full_name
        )
      }
    >
      Delete
    </button>
  )}

</td>

            </tr>

          ))}

        </tbody>

      </table>

    </section>
  );
}

export default AdminDashboard;