const db = require("../config/db");

// =====================================================
// CREATE / SHARE FOOD
// POST /api/foods
// =====================================================

const createFood = (req, res) => {
  const {
    name,
    category,
    description,
    quantity,
    area,
    pickup_date,
    pickup_time,
    pickup_address,
    image,
  } = req.body;

  // Get donor ID from logged-in user
  const donor_id = req.user.id;

  // Check required fields
  if (
    !name ||
    !quantity ||
    !area ||
    !pickup_date ||
    !pickup_time ||
    !pickup_address
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required food information.",
    });
  }

  const sql = `
    INSERT INTO foods
    (
      donor_id,
      name,
      category,
      description,
      quantity,
      area,
      pickup_date,
      pickup_time,
      pickup_address,
      image,
      status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'available')
  `;

  const values = [
    donor_id,
    name,
    category || null,
    description || null,
    quantity,
    area,
    pickup_date,
    pickup_time,
    pickup_address,
    image || null,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Create food error:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to share food.",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Food shared successfully!",
      foodId: result.insertId,
    });
  });
};


// =====================================================
// GET ALL AVAILABLE FOODS
// GET /api/foods
// =====================================================

const getAllFoods = (req, res) => {
  const sql = `
    SELECT
      id,
      donor_id,
      name,
      category,
      description,
      quantity,
      area,
      pickup_date,
      pickup_time,
      pickup_address,
      image,
      status,
      created_at
    FROM foods
    WHERE status = 'available'
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Get foods error:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to retrieve foods.",
      });
    }

    return res.status(200).json({
      success: true,
      foods: results,
    });
  });
};


// =====================================================
// GET SINGLE FOOD
// GET /api/foods/:id
// =====================================================

const getFoodById = (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT
      id,
      donor_id,
      name,
      category,
      description,
      quantity,
      area,
      pickup_date,
      pickup_time,
      pickup_address,
      image,
      status,
      created_at
    FROM foods
    WHERE id = ?
  `;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Get food error:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to retrieve food.",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Food not found.",
      });
    }

    return res.status(200).json({
      success: true,
      food: results[0],
    });
  });
};


// =====================================================
// GET MY FOODS
// GET /api/foods/my-foods
// =====================================================

const getMyFoods = (req, res) => {
  const donor_id = req.user.id;

  const sql = `
    SELECT
      id,
      donor_id,
      name,
      category,
      description,
      quantity,
      area,
      pickup_date,
      pickup_time,
      pickup_address,
      image,
      status,
      created_at
    FROM foods
    WHERE donor_id = ?
    ORDER BY created_at DESC
  `;

  db.query(sql, [donor_id], (err, results) => {
    if (err) {
      console.error("Get my foods error:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to retrieve your foods.",
      });
    }

    return res.status(200).json({
      success: true,
      foods: results,
    });
  });
};


// =====================================================
// UPDATE FOOD STATUS
// PATCH /api/foods/:id/status
// =====================================================

const updateFoodStatus = (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const allowedStatuses = [
    "available",
    "requested",
    "collected",
    "expired",
  ];

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid food status.",
    });
  }

  const sql = `
    UPDATE foods
    SET status = ?
    WHERE id = ?
  `;

  db.query(sql, [status, id], (err, result) => {
    if (err) {
      console.error("Update food status error:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to update food status.",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Food not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Food status updated successfully.",
    });
  });
};


// =====================================================
// DELETE FOOD
// DELETE /api/foods/:id
// =====================================================

const deleteFood = (req, res) => {
  const { id } = req.params;
  const donor_id = req.user.id;

  const sql = `
    DELETE FROM foods
    WHERE id = ? AND donor_id = ?
  `;

  db.query(sql, [id, donor_id], (err, result) => {
    if (err) {
      console.error("Delete food error:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to delete food.",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Food not found or you are not authorized to delete it.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Food deleted successfully.",
    });
  });
};


// =====================================================
// EXPORT CONTROLLERS
// =====================================================

module.exports = {
  createFood,
  getAllFoods,
  getFoodById,
  getMyFoods,
  updateFoodStatus,
  deleteFood,
};