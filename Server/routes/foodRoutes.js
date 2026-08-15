const express = require("express");

const router = express.Router();

const {
  createFood,
  getAllFoods,
  getFoodById,
  getMyFoods,
  updateFood,
  updateFoodStatus,
  deleteFood,
} = require("../controllers/foodController");

const verifyToken = require("../middleware/authMiddleware");

router.get("/", getAllFoods);

router.post("/", verifyToken, createFood);

router.get("/my-foods", verifyToken, getMyFoods);

router.put("/:id", verifyToken, updateFood);

router.patch("/:id/status", verifyToken, updateFoodStatus);

router.delete("/:id", verifyToken, deleteFood);

router.get("/:id", getFoodById);

module.exports = router;