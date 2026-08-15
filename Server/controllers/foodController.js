const db = require("../config/db");

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

  const donor_id = req.user.id;

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
    console.log("VALUES:", values);
  console.log("ERROR:", err);
  console.log("RESULT:", result);
  
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

const getAllFoods = (req, res) => {
  const search = req.query.search || "";

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
    AND (
      name LIKE ?
      OR category LIKE ?
      OR area LIKE ?
    )
    ORDER BY created_at DESC
  `;

  const keyword = `%${search}%`;

  db.query(
    sql,
    [keyword, keyword, keyword],
    (err, results) => {
      if (err) {
        console.error(err);

        return res.status(500).json({
          success: false,
          message: "Failed to retrieve foods.",
        });
      }

      res.json({
        success: true,
        foods: results,
      });
    }
  );
};

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

// ==========================================
// UPDATE FOOD
// PUT /api/foods/:id
// ==========================================

const updateFood = (req, res) => {
  const { id } = req.params;

  const donor_id = req.user.id;

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

  // Required fields
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
    UPDATE foods
    SET
      name = ?,
      category = ?,
      description = ?,
      quantity = ?,
      area = ?,
      pickup_date = ?,
      pickup_time = ?,
      pickup_address = ?,
      image = ?
    WHERE id = ?
    AND donor_id = ?
  `;

  db.query(
    sql,
    [
      name,
      category || null,
      description || null,
      quantity,
      area,
      pickup_date,
      pickup_time,
      pickup_address,
      image || null,
      id,
      donor_id,
    ],
    (err, result) => {
      if (err) {
        console.error("Update food error:", err);

        return res.status(500).json({
          success: false,
          message: "Failed to update food.",
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
        message: "Food updated successfully.",
      });
    }
  );
};

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

const deleteFood = (req, res) => {
  const foodId = req.params.id;
  const donorId = req.user.id;

  const sql = `
    DELETE FROM foods
    WHERE id = ?
    AND donor_id = ?
  `;

  db.query(sql, [foodId, donorId], (err, result) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        success: false,
        message: "Failed to delete food.",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Food not found.",
      });
    }

    res.json({
      success: true,
      message: "Food deleted successfully.",
    });
  });
};

module.exports = {
  createFood,
  getAllFoods,
  getFoodById,
  getMyFoods,
  updateFood,
  updateFoodStatus,
  deleteFood,
};