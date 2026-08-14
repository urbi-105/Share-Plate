const express = require("express");

const router = express.Router();

const {
  createFood,
  getAllFoods,
  getFoodById,
  getMyFoods,
  updateFoodStatus,
  deleteFood,
} = require("../controllers/foodController");

const verifyToken = require("../middleware/authMiddleware");

// ==========================================
// PUBLIC ROUTES
// ==========================================

// Get all available foods
router.get("/", getAllFoods);

// Get one food by ID
router.get("/:id", getFoodById);


// ==========================================
// PROTECTED ROUTES
// ==========================================

// Share food
router.post("/", verifyToken, createFood);

// Get foods shared by logged-in donor
router.get("/my-foods/list", verifyToken, getMyFoods);

// Update food status
router.patch("/:id/status", verifyToken, updateFoodStatus);

// Delete food
router.delete("/:id", verifyToken, deleteFood);


module.exports = router;