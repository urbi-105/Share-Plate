const db = require("../config/db");

// =====================================================
// CREATE FOOD REQUEST
// POST /api/requests
// =====================================================

const createRequest = (req, res) => {
  const { food_id, message } = req.body;

  // Logged-in NGO
  const ngo_id = req.user.id;

  // Check food ID
  if (!food_id) {
    return res.status(400).json({
      success: false,
      message: "Food ID is required.",
    });
  }

  // Check whether food exists and is available
  const checkFoodSql = `
    SELECT id, status
    FROM foods
    WHERE id = ?
  `;

  db.query(checkFoodSql, [food_id], (err, results) => {
    if (err) {
      console.error("Check food error:", err);

      return res.status(500).json({
        success: false,
        message: "Database error.",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Food not found.",
      });
    }

    if (results[0].status !== "available") {
      return res.status(400).json({
        success: false,
        message: "This food is no longer available.",
      });
    }

    // Create request
    const sql = `
      INSERT INTO food_requests
      (
        food_id,
        ngo_id,
        message
      )
      VALUES (?, ?, ?)
    `;

    db.query(
      sql,
      [food_id, ngo_id, message || null],
      (err, result) => {
        if (err) {
          console.error("Create request error:", err);

          return res.status(500).json({
            success: false,
            message: "Failed to create food request.",
          });
        }

        return res.status(201).json({
          success: true,
          message: "Food request submitted successfully!",
          requestId: result.insertId,
        });
      }
    );
  });
};


// =====================================================
// GET MY REQUESTS
// GET /api/requests/my-requests
// =====================================================

const getMyRequests = (req, res) => {
  const ngo_id = req.user.id;

  const sql = `
    SELECT
      fr.id,
      fr.food_id,
      fr.ngo_id,
      fr.message,
      fr.status,
      fr.created_at,

      f.name,
      f.category,
      f.quantity,
      f.area,
      f.pickup_date,
      f.pickup_time,
      f.pickup_address

    FROM food_requests fr

    INNER JOIN foods f
      ON fr.food_id = f.id

    WHERE fr.ngo_id = ?

    ORDER BY fr.created_at DESC
  `;

  db.query(sql, [ngo_id], (err, results) => {
    if (err) {
      console.error("Get requests error:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to retrieve requests.",
      });
    }

    return res.status(200).json({
      success: true,
      requests: results,
    });
  });
};

// Get requests received for donor's foods
const getIncomingRequests = (req, res) => {
  const donor_id = req.user.id;

  const sql = `
    SELECT
      fr.id,
      fr.food_id,
      fr.ngo_id,
      fr.message,
      fr.status,
      fr.created_at,

      f.name AS food_name,
      f.category,
      f.quantity,
      f.area,
      f.pickup_date,
      f.pickup_time,
      f.pickup_address,

      u.full_name AS ngo_name,
      u.email AS ngo_email,
      u.phone AS ngo_phone

    FROM food_requests fr

    INNER JOIN foods f
      ON fr.food_id = f.id

    INNER JOIN users u
      ON fr.ngo_id = u.id

    WHERE f.donor_id = ?

    ORDER BY fr.created_at DESC
  `;

  db.query(sql, [donor_id], (err, results) => {
    if (err) {
      console.error("Get incoming requests error:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to retrieve incoming requests.",
      });
    }

    return res.status(200).json({
      success: true,
      requests: results,
    });
  });
};

// Update request status
const updateRequestStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = [
    "pending",
    "accepted",
    "rejected",
    "completed",
  ];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid request status.",
    });
  }

  const sql = `
    UPDATE food_requests
    SET status = ?
    WHERE id = ?
  `;

  db.query(sql, [status, id], (err, result) => {
    if (err) {
      console.error("Update request status error:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to update request status.",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Request not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Request status updated successfully.",
    });
  });
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  createRequest,
  getMyRequests,
  getIncomingRequests,
  updateRequestStatus,
};